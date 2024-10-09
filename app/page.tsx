"use client";
import React from "react";
import PtfButton, { PtfButtonType } from "./components/PtfButton";
import { motion } from "framer-motion";

export default function Home({}) {
  return (
    <motion.div
      whileInView={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      className="flex flex-1 flex-col gap-4"
    >
      <PtfButton type={PtfButtonType.Primary}>My Portfolio</PtfButton>
      <PtfButton type={PtfButtonType.Secondary}>Contact me</PtfButton>
    </motion.div>
  );
}
