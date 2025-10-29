
"use client";
import React from "react";
import Button from "./Button";

interface Props {
  open: boolean;
  targetName: string;
  onClose: () => void;
  onConfirm: () => void;
}

export default function KickConfirmationDialog({ open, targetName, onClose, onConfirm }: Props) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0" onClick={onClose} style={{ background: "rgba(0,0,0,0.35)" }} />
      <div
        role="dialog"
        aria-modal="true"
        className="z-60 p-6 rounded-md w-[min(520px,90%)] shadow-md"
        style={{ background: "var(--neutral)", color: "var(--text-primary)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-xl font-semibold mb-3">Confirm removal</h3>
        <p className="mb-5">Are you sure you want to remove <strong>{targetName}</strong> from the team?</p>
        <div className="flex justify-center gap-4">
          <Button label="Cancel" variant="default" onClick={onClose} />
          <Button
            label="Confirm Kick"
            variant="danger"
            onClick={() => {
              console.log({ name: targetName, action: "kick" });
              onConfirm();
            }}
          />
        </div>
      </div>
    </div>
  );
}
