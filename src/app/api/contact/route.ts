import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

type ContactPayload = {
    name?: unknown;
    email?: unknown;
    message?: unknown;
    website?: unknown;
    formStartedAt?: unknown;
};

type RateLimitEntry = {
    count: number;
    resetAt: number;
};

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_IP_MAX_REQUESTS = 5;
const RATE_LIMIT_EMAIL_MAX_REQUESTS = 3;
const MAX_BODY_BYTES = 16_000;
const MIN_FORM_FILL_MS = 1500;
const MAX_FORM_AGE_MS = 6 * 60 * 60 * 1000;

const globalForRateLimit = globalThis as unknown as {
    contactRateLimitStore?: Map<string, RateLimitEntry>;
};

const rateLimitStore = globalForRateLimit.contactRateLimitStore ?? new Map<string, RateLimitEntry>();

if (!globalForRateLimit.contactRateLimitStore) {
    globalForRateLimit.contactRateLimitStore = rateLimitStore;
}

function sanitizeString(value: unknown) {
    if (typeof value !== 'string') return '';
    return value.trim();
}

function isValidEmail(value: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function escapeHtml(value: string) {
    return value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

function getClientIp(request: NextRequest) {
    const forwardedFor = request.headers.get('x-forwarded-for');
    if (forwardedFor) {
        return forwardedFor.split(',')[0].trim();
    }

    return request.headers.get('x-real-ip') ?? 'unknown';
}

function cleanupRateLimitStore(now: number) {
    for (const [key, value] of rateLimitStore.entries()) {
        if (now > value.resetAt) {
            rateLimitStore.delete(key);
        }
    }
}

function applyRateLimit(key: string, maxRequests: number) {
    const now = Date.now();
    cleanupRateLimitStore(now);

    const existing = rateLimitStore.get(key);

    if (!existing || now > existing.resetAt) {
        rateLimitStore.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
        return { allowed: true } as const;
    }

    if (existing.count >= maxRequests) {
        return { allowed: false } as const;
    }

    existing.count += 1;
    rateLimitStore.set(key, existing);
    return { allowed: true } as const;
}

function isAllowedOrigin(request: NextRequest) {
    const origin = request.headers.get('origin');
    const host = request.headers.get('host');

    // Non-browser clients can omit Origin; keep these allowed for debugging/tools.
    if (!origin) {
        return true;
    }

    const configuredOrigins = (process.env.CONTACT_ALLOWED_ORIGINS ?? '')
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean);

    if (configuredOrigins.length > 0) {
        return configuredOrigins.includes(origin);
    }

    if (!host) {
        return false;
    }

    const allowedByHost = [`https://${host}`, `http://${host}`];
    return allowedByHost.includes(origin);
}

function validatePayload(input: ContactPayload) {
    const name = sanitizeString(input.name);
    const email = sanitizeString(input.email).toLowerCase();
    const message = sanitizeString(input.message);
    const website = sanitizeString(input.website);
    const formStartedAtRaw = sanitizeString(input.formStartedAt);
    const formStartedAt = Number(formStartedAtRaw);

    if (!name || name.length < 2 || name.length > 80) {
        return { valid: false, error: 'Please enter a valid name (2-80 characters).' } as const;
    }

    if (!email || email.length > 200 || !isValidEmail(email)) {
        return { valid: false, error: 'Please enter a valid email address.' } as const;
    }

    if (!message || message.length < 10 || message.length > 5000) {
        return { valid: false, error: 'Please enter a message between 10 and 5000 characters.' } as const;
    }

    if (!Number.isFinite(formStartedAt)) {
        return { valid: false, error: 'Invalid form submission metadata.' } as const;
    }

    return {
        valid: true,
        payload: {
            name,
            email,
            message,
            website,
            formStartedAt,
        },
    } as const;
}

function hasSuspiciousMessagePatterns(message: string) {
    const urlMatches = message.match(/(https?:\/\/|www\.)/gi) ?? [];
    if (urlMatches.length > 3) {
        return true;
    }

    const repeatedCharacterRun = /(.)\1{9,}/.test(message);
    if (repeatedCharacterRun) {
        return true;
    }

    const spamWords = ['casino', 'viagra', 'crypto investment', 'buy now'];
    const lowerMessage = message.toLowerCase();
    return spamWords.some((word) => lowerMessage.includes(word));
}

function jsonNoStore(payload: unknown, status = 200) {
    return NextResponse.json(payload, {
        status,
        headers: {
            'Cache-Control': 'no-store',
        },
    });
}

export async function POST(request: NextRequest) {
    const toEmail = process.env.CONTACT_TO_EMAIL ?? 'info@loranmaes.be';
    const fromEmail = process.env.CONTACT_FROM_EMAIL;
    const resendApiKey = process.env.RESEND_API_KEY;
    const isDev = process.env.NODE_ENV !== 'production';

    if (!resendApiKey) {
        return jsonNoStore({ error: 'Contact form is not configured yet. Missing RESEND_API_KEY.' }, 500);
    }

    if (!fromEmail) {
        return jsonNoStore({ error: 'Contact form is not configured yet. Missing CONTACT_FROM_EMAIL.' }, 500);
    }

    if (!isAllowedOrigin(request)) {
        return jsonNoStore({ error: 'Invalid request origin.' }, 403);
    }

    const contentType = request.headers.get('content-type') ?? '';
    if (!contentType.toLowerCase().startsWith('application/json')) {
        return jsonNoStore({ error: 'Unsupported content type.' }, 415);
    }

    let rawBody = '';
    try {
        rawBody = await request.text();
    } catch {
        return jsonNoStore({ error: 'Invalid request body.' }, 400);
    }

    if (!rawBody || rawBody.length > MAX_BODY_BYTES) {
        return jsonNoStore({ error: 'Request body is too large or empty.' }, 400);
    }

    let body: ContactPayload;
    try {
        body = JSON.parse(rawBody) as ContactPayload;
    } catch {
        return jsonNoStore({ error: 'Invalid request body.' }, 400);
    }

    const validated = validatePayload(body);
    if (!validated.valid) {
        return jsonNoStore({ error: validated.error }, 400);
    }

    // Honeypot: silently accept and drop likely bot submissions.
    if (validated.payload.website) {
        return jsonNoStore({ ok: true }, 200);
    }

    const now = Date.now();
    const formAge = now - validated.payload.formStartedAt;
    if (formAge < MIN_FORM_FILL_MS || formAge > MAX_FORM_AGE_MS) {
        return jsonNoStore({ error: 'Invalid form submission timing.' }, 400);
    }

    if (hasSuspiciousMessagePatterns(validated.payload.message)) {
        return jsonNoStore({ ok: true }, 200);
    }

    const clientIp = getClientIp(request);
    const ipRateLimit = applyRateLimit(`ip:${clientIp}`, RATE_LIMIT_IP_MAX_REQUESTS);
    const emailRateLimit = applyRateLimit(`email:${validated.payload.email}`, RATE_LIMIT_EMAIL_MAX_REQUESTS);

    if (!ipRateLimit.allowed || !emailRateLimit.allowed) {
        return jsonNoStore({ error: 'Too many requests. Please try again in a few minutes.' }, 429);
    }

    const safeName = escapeHtml(validated.payload.name);
    const safeEmail = escapeHtml(validated.payload.email);
    const safeMessage = escapeHtml(validated.payload.message).replace(/\n/g, '<br/>');

    const subject = `New contact form message from ${validated.payload.name}`;
    const textBody = [
        `Name: ${validated.payload.name}`,
        `Email: ${validated.payload.email}`,
        '',
        'Message:',
        validated.payload.message,
    ].join('\n');

    const htmlBody = `
        <h2>New Portfolio Contact Form Message</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Message:</strong><br/>${safeMessage}</p>
    `;

    const resendResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            from: fromEmail,
            to: [toEmail],
            reply_to: validated.payload.email,
            subject,
            text: textBody,
            html: htmlBody,
        }),
    });

    if (!resendResponse.ok) {
        const resendErrorText = await resendResponse.text();

        console.error('Resend API error', {
            status: resendResponse.status,
            statusText: resendResponse.statusText,
            body: resendErrorText,
        });

        if (isDev) {
            let resendErrorMessage = 'Unable to send your message right now. Please try again later.';
            try {
                const parsed = JSON.parse(resendErrorText) as { message?: string; error?: string };
                resendErrorMessage = parsed.message ?? parsed.error ?? resendErrorMessage;
            } catch {
                if (resendErrorText.trim()) {
                    resendErrorMessage = resendErrorText;
                }
            }

            return jsonNoStore({ error: resendErrorMessage, resendStatus: resendResponse.status }, 502);
        }

        return jsonNoStore({ error: 'Unable to send your message right now. Please try again later.' }, 502);
    }

    return jsonNoStore({ ok: true }, 200);
}
