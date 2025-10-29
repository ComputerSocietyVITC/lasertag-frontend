// app/components/ui/Button.tsx
"use client";
import React from "react";

type Variant = "primary" | "secondary" | "danger" | "default";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: React.ReactNode;
  variant?: Variant;
  className?: string;
}

const variantStyle = (v: Variant) => {
  switch (v) {
    case "primary":
      return { background: "var(--positive)", color: "white", borderColor: "transparent" };
    case "danger":
      return { background: "var(--negative)", color: "white", borderColor: "transparent" };
    case "secondary":
      return { background: "var(--neutral)", color: "var(--text-primary)", borderColor: "var(--border)" };
    default:
      return { background: "transparent", color: "var(--text-primary)", borderColor: "var(--border)" };
  }
};

export default function Button({ label, variant = "primary", className = "", ...rest }: ButtonProps) {
  const s = variantStyle(variant);
  return (
    <button
      {...rest}
      style={{ ...s }}
      className={
        "px-4 py-2 rounded-md text-sm font-medium shadow-sm transition hover:brightness-95 " + className
      }
    >
      {label}
    </button>
  );
}
