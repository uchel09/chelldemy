"use client";

import { useAuth, UserButton } from "@clerk/nextjs";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Topbar = () => {
  const { isSignedIn } = useAuth();
  const router = useRouter();

  const [searchInput, setSearchInput] = useState("");
  const TopRoutes = [
    {
      label: "Instructor",
      path: "/instructor/courses",
    },
    {
      label: "Learning",
      path: "/learning",
    },
  ];

  const handleSearch = () => {
    if (searchInput.trim() !== "") {
      router.push(`/search?query=${searchInput}`);
    }
    setSearchInput("");
  };

  return (
    // Hero Link
    <div className="flex justify-between items-center p-4">
      <Link href="/">
        <div className="flex items-center justify-center">
          <Image
            width={60}
            height={60}
            alt="chelldemy-logo"
            src="/chell-logo.svg"
          />
          <span className="font-bold text-[30px] text-[#02badd]">
            Chelldemy
          </span>
        </div>
      </Link>

      {/* Search Link  */}
      <div className="hidden md:w-[300px] lg:w-[400px] md:rounded-full md:flex">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="flex-grow bg-[#dcf7fa] rounded-l-full  border-none outline-none text-sm pl-4 py-3"
          placeholder="Find courses.."
        />
        <button
          onClick={handleSearch}
          disabled={searchInput.trim() === ""}
          className="bg-[#02badd] rounded-r-full border-none outline-none cursor-pointer px-4 py-3 hover:bg-[#2196F3]"
        >
          <Search />
        </button>
      </div>

      {/* MenuLink  */}
      <div className="flex gap-6 items-center">
        <div className="max-sm:hidden flex gap-6">
          {TopRoutes.map((route) => (
            <Link
              key={route.path}
              href={route.path}
              className="hover:text-[#02badd] font-medium"
            >
              {route.label}
            </Link>
          ))}
        </div>
        {isSignedIn ? (
          <UserButton />
        ) : (
          <Link href="/sign-in">
            <Button>Sign In</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Topbar;
