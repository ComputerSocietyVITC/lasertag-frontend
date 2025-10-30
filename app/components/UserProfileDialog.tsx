"use client";

import Button from "./Button";

interface Props {
  open: boolean;
  onClose: () => void;
  name: string;
  phone?: string;
  registrationNumber?: string;
}

export default function UserProfileDialog({
  open,
  onClose,
  name,
  phone,
  registrationNumber,
}: Props) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className="z-60 w-[min(520px,90%)] rounded-lg bg-white p-6 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mb-4 text-3xl font-bold text-gray-800">User Profile</h2>
        <div className="mb-6 space-y-2 text-gray-700">
          <div>
            <strong>Name:</strong> {name}
          </div>
          {phone && (
            <div>
              <strong>Phone Number:</strong> {phone}
            </div>
          )}
          {registrationNumber && (
            <div>
              <strong>Registration Number:</strong> {registrationNumber}
            </div>
          )}
        </div>
        <div className="flex justify-end">
          <Button
            label="Close"
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
