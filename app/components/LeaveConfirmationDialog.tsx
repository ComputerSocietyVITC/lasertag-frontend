"use client";

import Button from "./Button";

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function LeaveConfirmationDialog({
  open,
  onClose,
  onConfirm,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className="z-60 w-[min(520px,90%)] rounded-md bg-white p-6 text-gray-800 shadow-md"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="mb-3 text-xl font-semibold">Confirm Leave</h3>
        <p className="mb-5">
          Are you sure you want to leave this team? This action cannot be
          undone.
        </p>
        <div className="flex justify-end gap-4">
          <Button label="Cancel" variant="default" onClick={onClose} />
          <Button label="Confirm Leave" variant="danger" onClick={onConfirm} />
        </div>
      </div>
    </div>
  );
}
