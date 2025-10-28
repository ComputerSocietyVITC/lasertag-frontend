"use client";

import React from "react";

export default function DashboardPage() {
  const teams = [
    { id: 1, name: "Team Alpha" },
    { id: 2, name: "Team Beta" },
    { id: 3, name: "Team Gamma" },
    { id: 4, name: "Team Delta" },
  ];

  const handleJoin = (teamId: number, teamName: string) => {
    console.log(`Joined Team → ID: ${teamId}, Name: ${teamName}`);
  };

  return (
    <main className="flex flex-col items-center justify-start min-h-screen bg-[var(--background)] py-26 px-4">
      <section className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Laser Tag Dashboard
        </h1>
        <div className="flex flex-wrap justify-center gap-4">
          <button className="px-6 py-2 rounded-md bg-[var(--positive)] text-white font-semibold hover:opacity-90 transition">
            Join a Team
          </button>
          <button className="px-6 py-2 rounded-md bg-blue-600 text-white font-semibold hover:opacity-90 transition">
            Create a Team
          </button>
        </div>
      </section>

      <section className="w-full max-w-xl bg-[var(--neutral)] border border-[var(--border)] rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Open to Join
        </h2>
        <ul className="space-y-3">
          {teams.map((team) => (
            <li
              key={team.id}
              className="flex items-center justify-between bg-[var(--accent)] px-4 py-3 rounded-md border border-[var(--border)]"
            >
              <span className="font-medium">{team.name}</span>
              <button
                onClick={() => handleJoin(team.id, team.name)}
                className="px-4 py-1 bg-[var(--positive)] text-white rounded-md font-medium hover:opacity-90 transition"
              >
                Join
              </button>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
