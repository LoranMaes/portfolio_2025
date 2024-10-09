import React from "react";

export default function PtfFooter() {
  return (
    <footer className="flex py-4 px-8 justify-center items-center">
      <p className="text-sm">&copy; {new Date().getFullYear()} | Loran Maes</p>
    </footer>
  );
}
