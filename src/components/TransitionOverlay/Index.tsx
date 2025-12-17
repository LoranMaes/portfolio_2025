'use client';

export default function TransitionOverlay() {
    return (
        <div
            id="route-transition"
            aria-hidden
            className="pointer-events-none fixed inset-0 z-[9999] bg-foreground"
            style={{
                transform: 'scaleY(0)',
                transformOrigin: '50% 100%',
            }}
        />
    );
}
