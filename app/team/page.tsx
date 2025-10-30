"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { AxiosError } from "axios";
import { Team, User } from "../types";
import { leaveTeam, makeTeamPublic, kickMember } from "../services/teamService";

import KickConfirmationDialog from "../components/KickDialog";
import UserProfileDialog from "../components/UserProfileDialog";
import PrivacyConfirmationDialog from "../components/PrivacyConfirmationDialog";
import LeaveConfirmationDialog from "../components/LeaveConfirmationDialog";
import Button from "../components/Button";

export default function TeamPage() {
  const router = useRouter();
  const {
    user: currentUser,
    isLoading: authIsLoading,
    refreshUser,
  } = useAuth();
  const [team, setTeam] = useState<Team | null>(null);

  const [kickTarget, setKickTarget] = useState<User | null>(null);
  const [profileTarget, setProfileTarget] = useState<User | null>(null);
  const [isPrivacyDialogOpen, setPrivacyDialogOpen] = useState(false);
  const [isLeaveDialogOpen, setLeaveDialogOpen] = useState(false);

  useEffect(() => {
    if (!authIsLoading) {
      if (!currentUser || !currentUser.team) {
        router.push("/dashboard");
      } else {
        setTeam(currentUser.team);
      }
    }
  }, [currentUser, authIsLoading, router]);

  const handleConfirmLeave = async () => {
    try {
      await leaveTeam();
      alert("You have left the team.");
      await refreshUser();
      router.push("/dashboard");
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      alert(
        `Error: ${error.response?.data?.message || "Could not leave team."}`
      );
    } finally {
      setLeaveDialogOpen(false);
    }
  };

  const handleConfirmPrivacyChange = async () => {
    if (!team) return;
    try {
      await makeTeamPublic();
      setTeam({ ...team, is_public: true });
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      alert(
        `Error: ${error.response?.data?.message || "Could not update privacy."}`
      );
    } finally {
      setPrivacyDialogOpen(false);
    }
  };

  const handleConfirmKick = async () => {
    if (!team || !kickTarget) return;
    try {
      await kickMember(kickTarget.id);
      const updatedMembers =
        team.members?.filter((m) => m.id !== kickTarget.id) || [];
      setTeam({ ...team, members: updatedMembers });
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      alert(
        `Error: ${error.response?.data?.message || "Could not kick member."}`
      );
    } finally {
      setKickTarget(null);
    }
  };

  if (authIsLoading || !team || !currentUser) {
    return (
      <main className="flex items-center justify-center">
        Loading team data...
      </main>
    );
  }

  const isLeader = currentUser.is_leader;
  const teamLeader = team.members?.find((m) => m.is_leader);

  return (
    <>
      <main className="flex flex-col flex-grow items-center p-4 pt-10 md:p-6 md:pt-12">
        <section className="w-full max-w-4xl rounded-xl border border-gray-200 bg-white p-6 shadow-md">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row md:items-start">
            <div className="text-center md:text-left">
              <h1 className="mb-2 text-4xl font-bold">{team.name}</h1>
              <div className="grid grid-cols-2 gap-x-6 text-gray-600">
                <p>
                  <strong>Leader:</strong> {teamLeader?.username || "N/A"}
                </p>
                <p>
                  <strong>Members:</strong> {team.members?.length || 0}/8
                </p>
                <p>
                  <strong>Type:</strong> {team.is_public ? "Public" : "Private"}
                </p>
                <p>
                  <strong>Code:</strong> {team.invite_code}
                </p>
              </div>
            </div>

            <div className="flex shrink-0 flex-col items-center gap-3 md:items-end">
              <Button
                label="Leave Team"
                variant="danger"
                onClick={() => setLeaveDialogOpen(true)}
              />
              {isLeader &&
                (!team.is_public ? (
                  <Button
                    label="Make Public"
                    variant="secondary"
                    onClick={() => setPrivacyDialogOpen(true)}
                  />
                ) : (
                  <div className="rounded-md border bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-600">
                    Status: Public
                  </div>
                ))}
            </div>
          </div>
        </section>

        <section className="mt-8 w-full max-w-4xl">
          <h2 className="mb-4 text-center text-2xl font-semibold">
            Team Members
          </h2>
          <div className="space-y-3">
            {team.members?.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
              >
                <div>
                  <p className="text-lg font-semibold">
                    {member.username} {member.is_leader && "👑"}
                  </p>
                  <p className="text-sm text-gray-500">{member.email}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    label="View"
                    variant="default"
                    onClick={() => setProfileTarget(member)}
                  />
                  {isLeader && !member.is_leader && !team.is_public && (
                    <Button
                      label="Kick"
                      variant="danger"
                      onClick={() => setKickTarget(member)}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <UserProfileDialog
        open={!!profileTarget}
        onClose={() => setProfileTarget(null)}
        name={profileTarget?.username || ""}
        phone={profileTarget?.phone_no}
      />
      <KickConfirmationDialog
        open={!!kickTarget}
        onClose={() => setKickTarget(null)}
        targetName={kickTarget?.username || ""}
        onConfirm={handleConfirmKick}
      />
      <PrivacyConfirmationDialog
        open={isPrivacyDialogOpen}
        onClose={() => setPrivacyDialogOpen(false)}
        targetPrivacy="Public"
        onConfirm={handleConfirmPrivacyChange}
      />
      <LeaveConfirmationDialog
        open={isLeaveDialogOpen}
        onClose={() => setLeaveDialogOpen(false)}
        onConfirm={handleConfirmLeave}
      />
    </>
  );
}
