"use client";

import { useState, useEffect, FormEvent } from "react";
import { AxiosError } from "axios";
import { useAuth } from "../context/AuthContext";
import {
  getOpenTeams,
  joinTeamWithCode,
  createNewTeam,
} from "../services/teamService";
import { Team } from "../types";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const { user, isLoading: isAuthLoading, refreshUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthLoading && user?.team) {
      router.push("/team");
    }
  }, [user, isAuthLoading, router]);

  const [isFetchingTeams, setIsFetchingTeams] = useState(true);
  const [teams, setTeams] = useState<Team[]>([]);
  const [error, setError] = useState<string>("");

  const [isJoinDialogOpen, setJoinDialogOpen] = useState(false);
  const [isCreateDialogOpen, setCreateDialogOpen] = useState(false);
  const [inviteCode, setInviteCode] = useState("");
  const [teamName, setTeamName] = useState("");

  useEffect(() => {
    const fetchTeams = async () => {
      setIsFetchingTeams(true);
      try {
        const openTeams = await getOpenTeams();
        setTeams(openTeams);
      } catch (err) {
        console.error("Failed to fetch teams:", err);
        setError("Could not load available teams.");
      } finally {
        setIsFetchingTeams(false);
      }
    };
    fetchTeams();
  }, []);

  const handleJoinSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await joinTeamWithCode(inviteCode);
      alert(`Successfully joined team!`);
      await refreshUser();
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      alert(
        `Error: ${error.response?.data?.message || "Failed to join team."}`
      );
    }
  };

  const handleCreateSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await createNewTeam(teamName);
      alert(`Successfully created team "${teamName}"!`);
      await refreshUser();
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      alert(
        `Error: ${error.response?.data?.message || "Failed to create team."}`
      );
    }
  };

  if (isAuthLoading || user?.team) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  return (
    <>
      <div className="flex flex-grow flex-col items-center p-4">
        <section className="mb-10 text-center">
          <h1 className="mb-2 text-4xl font-bold md:text-5xl">
            Laser Tag Dashboard
          </h1>
          <p className="text-gray-600">
            Welcome, {user?.username || "Player"}!
          </p>
        </section>

        <section className="mb-10 flex flex-wrap justify-center gap-4">
          <button
            onClick={() => setJoinDialogOpen(true)}
            className="cursor-pointer rounded-md bg-green-600 px-6 py-2 font-semibold text-white transition hover:opacity-90"
          >
            Join with Invite Code
          </button>
          <button
            onClick={() => setCreateDialogOpen(true)}
            className="cursor-pointer rounded-md bg-blue-600 px-6 py-2 font-semibold text-white transition hover:opacity-90"
          >
            Create a New Team
          </button>
        </section>

        <section className="w-full max-w-2xl rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-center text-xl font-semibold">
            Teams Open to Join
          </h2>
          {isFetchingTeams ? (
            <p className="text-center text-gray-500">Loading teams...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : teams.length === 0 ? (
            <p className="text-center text-gray-500">
              No public teams available to join.
            </p>
          ) : (
            <ul className="space-y-3">
              {teams.map((team) => (
                <li
                  key={team.id}
                  className="flex items-center justify-between rounded-md border border-gray-200 bg-gray-50 px-4 py-3"
                >
                  <span className="font-medium">{team.name}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      {isJoinDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-xl">
            <h3 className="mb-4 text-lg font-semibold">
              Join with Invite Code
            </h3>
            <form onSubmit={handleJoinSubmit}>
              <input
                type="text"
                value={inviteCode}
                onChange={(e) => setInviteCode(e.target.value)}
                placeholder="Enter invite code"
                className="w-full rounded-md border border-gray-300 px-3 py-2"
                required
              />
              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setJoinDialogOpen(false)}
                  className="rounded-md px-4 py-2 font-semibold text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isCreateDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-xl">
            <h3 className="mb-4 text-lg font-semibold">Create a New Team</h3>
            <form onSubmit={handleCreateSubmit}>
              <input
                type="text"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                placeholder="Enter new team name"
                className="w-full rounded-md border border-gray-300 px-3 py-2"
                required
              />
              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setCreateDialogOpen(false)}
                  className="rounded-md px-4 py-2 font-semibold text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
