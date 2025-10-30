"use client";

import { SetStateAction, useState } from "react";

export default function TeamPage() {
  // --- Mock Data ---
  const team = {
    name: "Team Name",
    leader: "xyz",
    members: 3,
    maxMembers: 8,
    type: "Private",
    code: "ABCDEF",
  };

  const members = [
    { id: 1, name: "Alice", phone: "9876543210", email: "alice@email.com" },
    { id: 2, name: "Bob", phone: "9123456780", email: "bob@email.com" },
    { id: 3, name: "Charlie", phone: "9988776655", email: "charlie@email.com" },
  ];

  const [teamType, setTeamType] = useState(team.type);

  // --- Handlers ---
  const handleToggle = (type: SetStateAction<string>) => {
    setTeamType(type);
    console.log(`Team type changed to: ${type}`);
  };

  const handleLeave = () => {
    console.log("Team Details:", { ...team, members });
  };

  // --- Render ---
  return (
    <main className="flex flex-col items-center min-h-screen py-6 px-6 bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gray-50 rounded-2xl p-8 w-full max-w-2xl">
        <h1 className="text-4xl font-bold text-center mb-6">{team.name}</h1>

        <div className="text-center space-y-1 mb-6">
          <p>Team Leader: {team.leader}</p>
          <p>
            Members: {team.members}/{team.maxMembers}
          </p>
          <p>Team Type: {teamType}</p>
          <p>Team Code: {team.code}</p>
        </div>

        {/* Buttons */}
        <div className="absolute top-8 shadow-2xl  right-8 flex gap-2">
          <button
            onClick={handleLeave}
            className="bg-red-700 text-white border-gray-700 font-semibold px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Leave
          </button>
        </div>

        <div className="absolute top-20 right-8 flex shadow-2xl gap-0 rounded-xl border">
          <button
            onClick={() => handleToggle("Private")}
            className={`px-4 py-2 rounded-tl-xl rounded-bl-xl  ${
              teamType === "Private"
                ? "bg-blue-300 text-gray-700 "
                : "bg-gray-100 text-gray-700"
            }`}
          >
            Private
          </button>
          <button
            onClick={() => handleToggle("Public")}
            className={`px-4 py-2 rounded-tr-xl rounded-br-xl  ${
              teamType === "Public"
                ? "bg-blue-300 text-gray-700 "
                : "bg-gray-100 text-gray-700"
            }`}
          >
            Public
          </button>
        </div>
      </section>

      {/* Placeholder for Team Members */}
      <section className="w-full max-w-2xl mt-4">
        <h2 className="text-2xl font-semibold mb-4">Team Members</h2>
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-gray-500 text-center">
          Members will be displayed here later...
        </div>
      </section>
    </main>
  );
}
