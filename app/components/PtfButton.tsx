import React from "react";
import { motion } from "framer-motion";

export enum PtfButtonType {
  Primary,
  Secondary,
}

export default function PtfButton({
  children,
  type,
}: Readonly<{ children: string; type: PtfButtonType }>) {
  return (
    <motion.button
      className={`${
        type == PtfButtonType.Primary
          ? "bg-[var(--background)] text-[var(--foreground)]"
          : "bg-[var(--foreground)] text-[var(--background)]"
      } w-fit border-[#FAFAFA] border-2 py-2 px-4`}
      whileHover={{
        scale: 1.1,
        transition: { duration: 0.1 },
      }}
    >
      {children}
    </motion.button>
  );
}
