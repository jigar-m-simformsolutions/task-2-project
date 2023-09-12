import { useRouter } from "next/router";
import React from "react";
import ProfilePopup from "../ProfilePopup/ProfilePopup";

export default function RightNavbar({
  isAuthenticate,
}: {
  isAuthenticate: boolean;
}) {
  const router = useRouter();

  if (isAuthenticate) {
    return <ProfilePopup />;
  } else {
    return (
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => router.push("/signup")}
          className="px-4 py-1 border-none"
        >
          Sign Up
        </button>
        <button
          type="button"
          onClick={() => router.push("/login")}
          className="px-4 py-1 rounded-md border-solid border-2 border-inherit"
        >
          Log In
        </button>
      </div>
    );
  }
}
