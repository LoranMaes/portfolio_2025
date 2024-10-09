import React from "react";

export default function PtfHeader() {
  return (
    <header className="flex py-4 px-8 justify-between items-center">
      <h1 className="text-2xl font-bold font-[family-name:var(--font-geist-mono)]">
        Loran
      </h1>

      <nav className="flex">
        <ul className="flex gap-4 items-center">
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#projects">Projects</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
