'use client';
import React from 'react';

export default function Hamburger({ onClick, isOpen }: { onClick?: () => void; isOpen: boolean }) {
	return (
		<button className="hamburger" onClick={onClick}>
			<div className={`wrapper ${isOpen ? '!gap-[5px] translate-y-0.5' : ''}`}>
				<span></span>
				<span></span>
			</div>
			<span className={`${isOpen ? 'opacity-100' : 'opacity-0'}`}></span>
			<div className={`wrapper ${isOpen ? '!gap-[5px] -translate-y-0.5' : ''}`}>
				<span></span>
				<span></span>
			</div>
		</button>
	);
}
