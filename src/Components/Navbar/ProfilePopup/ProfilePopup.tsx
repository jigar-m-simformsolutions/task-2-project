import React, { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";

export default function ProfilePopup() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <div className="relative">
      {/* Profile button */}
      <div className="text-white flex gap-3 items-center">
        <Image
          src={session?.user?.image as string}
          alt="user-image"
          width={30}
          height={30}
          className="rounded-full"
        />
        <p>{session?.user?.name}</p>

        {/* <i class="fas fa-chevron-up"></i> */}
        <i
          className={`fas ${
            isPopupOpen ? "fa-chevron-up" : "fa-chevron-down"
          } cursor-pointer text-xs`}
          onClick={togglePopup}
        ></i>
      </div>

      {/* Profile Popup */}
      <div
        className={`absolute ${
          isPopupOpen ? "block" : "hidden"
        } top-full right-0 mt-4 w-48 border font-medium bg-slate-700 text-white text-lg border-gray-300 shadow-lg rounded-lg`}
      >
        <ul className="py-2">
          <li className="block px-4 py-2 cursor-pointer">Profile</li>
          <li className="block px-4 py-2 cursor-pointer">Settings</li>
          <li
            onClick={() => {
              signOut({ callbackUrl: "/login" });
            }}
            className="block px-4 py-2 cursor-pointer"
          >
            Logout
          </li>
        </ul>
      </div>
    </div>
  );
}
