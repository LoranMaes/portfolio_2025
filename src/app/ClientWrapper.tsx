'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Fragment } from 'react';

gsap.registerPlugin(useGSAP);

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
	return <Fragment>{children}</Fragment>;
}
