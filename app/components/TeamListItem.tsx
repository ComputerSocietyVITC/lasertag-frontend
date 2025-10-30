"use client";
import React from "react";
import type { User } from "./types";
import Button from "./Button";
import UserProfileDialog from "./UserProfileDialog";
import KickConfirmationDialog from "./KickDialog";
import { UserIcon } from "./UserIcon";

interface Props {
  user: User;
  isViewerLeader?: boolean;
  showLeaderTag?: boolean;
  onKick?: (user: User) => void;
}

export default function TeamListItem({
  user,
  isViewerLeader = false,
  showLeaderTag = false,
  onKick,
}: Props) {
  const [profileOpen, setProfileOpen] = React.useState(false);
  const [kickOpen, setKickOpen] = React.useState(false);

  const showKick = isViewerLeader && !user.isLeader;

  function handleConfirmKick() {
    setKickOpen(false);
    if (onKick) onKick(user);
  }

  const itemStyle = user.isLeader
    ? {
        background: "var(--accent-light)",
        border: "2px solid var(--accent)",
        color: "var(--text-primary)",
      }
    : {
        background: "var(--neutral)",
        border: "1px solid var(--border)",
        color: "var(--text-primary)",
      };

  return (
    <>
      <div
        role="button"
        tabIndex={0}
        onClick={() => setProfileOpen(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter") setProfileOpen(true);
        }}
        className="flex items-center justify-between p-3 rounded-md mb-3 cursor-pointer transition-all"
        style={itemStyle}
      >
        <div className="flex items-center gap-3">
          <div
            style={{
              background: "var(--accent)",
              color: "var(--text-primary)",
            }}
            className="w-10 h-10 rounded-full flex items-center justify-center"
          >
            <UserIcon size={18} />
          </div>

          <div>
            <div className="font-semibold">{user.name}</div>
            {showLeaderTag && user.isLeader && (
              <div className="text-sm" style={{ color: "var(--text-muted)" }}>
                Team Leader
              </div>
            )}
          </div>
        </div>

        <div onClick={(e) => e.stopPropagation()}>
          {showKick && (
            <Button
              label="Kick"
              variant="danger"
              onClick={() => setKickOpen(true)}
            />
          )}
        </div>
      </div>

      <UserProfileDialog
        open={profileOpen}
        onClose={() => setProfileOpen(false)}
        name={user.name}
        phone={user.phoneNumber}
        registrationNumber={user.registrationNumber}
      />

      <KickConfirmationDialog
        open={kickOpen}
        targetName={user.name}
        onClose={() => setKickOpen(false)}
        onConfirm={() => handleConfirmKick()}
      />
    </>
  );
}
