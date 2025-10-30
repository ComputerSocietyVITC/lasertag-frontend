"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import Button from "./Button";

export default function Navbar() {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const pathname = usePathname();

  if (isLoading || !isAuthenticated || pathname === "/login") {
    return null;
  }

  const getLinkClassName = (path: string) => {
    return pathname === path
      ? "font-semibold text-blue-600"
      : "text-gray-600 hover:text-blue-600 transition-colors";
  };

  return (
    <nav className="z-40 w-full border-b border-gray-200 bg-white/80 shadow-sm backdrop-blur-md">
      <div className="container mx-auto flex items-center px-4 py-3">
        <div className="flex-1 text-lg font-bold text-gray-800">
          <Link href={user?.team ? "/team" : "/dashboard"}>
            <span className="hidden sm:inline">IEEE Computer Society / </span>
            Laser Tag
          </Link>
        </div>

        <div className="flex items-center gap-6">
          {user?.team ? (
            <Link href="/team" className={getLinkClassName("/team")}>
              Team
            </Link>
          ) : (
            <Link href="/dashboard" className={getLinkClassName("/dashboard")}>
              Dashboard
            </Link>
          )}

          {user?.team && (
            <Link href="/bookslot" className={getLinkClassName("/bookslot")}>
              Game Slots
            </Link>
          )}
        </div>

        <div className="flex flex-1 justify-end">
          <Button label="Logout" variant="danger" onClick={logout} />
        </div>
      </div>
    </nav>
  );
}
