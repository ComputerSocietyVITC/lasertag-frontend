// app/components/ui/UserProfileDialog.tsx
"use client";
import React from "react";
import Button from "./Button";

interface Props {
  open: boolean;
  onClose: () => void;
  name: string;
  phone?: string;
  registrationNumber?: string;
}

export default function UserProfileDialog({ open, onClose, name, phone, registrationNumber }: Props) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0" onClick={onClose} style={{ background: "rgba(0,0,0,0.35)" }} />
      <div
        role="dialog"
        aria-modal="true"
        className="z-60 p-6 rounded-lg w-[min(720px,90%)] shadow-lg"
        style={{ background: "var(--neutral)", color: "var(--text-primary)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-3xl font-bold mb-4">User Profile</h2>
        <div className="space-y-2 mb-6">
          <div><strong>Name:</strong> {name}</div>
          {phone && <div><strong>Phone Number:</strong> {phone}</div>}
          {registrationNumber && <div><strong>Registration Number:</strong> {registrationNumber}</div>}
        </div>
        <div className="flex justify-center">
          <Button
            label="Close Dialog"
            variant="secondary"
            onClick={() => {
              console.log(`Dialog closed for ${name}`);
              onClose();
            }}
          />
        </div>
      </div>
    </div>
  );
}
