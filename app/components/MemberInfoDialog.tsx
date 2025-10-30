"use client";

import Button from "./Button";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function MemberInfoDialog({ open, onClose }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="z-60 w-[min(520px,90%)] rounded-md bg-white p-6 text-gray-800 shadow-md">
        <h3 className="mb-3 text-xl font-semibold">Action Not Allowed</h3>
        <p className="mb-5">
          Only the designated team leader is allowed to book or manage time
          slots.
        </p>
        <div className="flex justify-end">
          <Button label="OK" variant="secondary" onClick={onClose} />
        </div>
      </div>
    </div>
  );
}
