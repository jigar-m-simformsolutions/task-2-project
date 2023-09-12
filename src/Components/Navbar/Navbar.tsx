import React, { useMemo } from "react";
import ProfilePopup from "./ProfilePopup/ProfilePopup";
import RightNavbar from "./RightNavabr/RightNavbar";
import { useSession } from "next-auth/react";

export default function Navbar() {
  const { status } = useSession();

  const isAuthenticate = useMemo(() => status === "authenticated", [status]);

  return (
    <nav className="px-6 py-4 shadow-lg font-medium bg-slate-700 text-white text-lg mb-4">
      <div className="flex items-center justify-between ">
        <h1 className="m-0 p-0">Brand</h1>
        <RightNavbar isAuthenticate={isAuthenticate} />
      </div>
    </nav>
  );
}
