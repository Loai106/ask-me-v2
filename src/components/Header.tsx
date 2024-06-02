import React from "react";
import Link from "next/link";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Input,
} from "@nextui-org/react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoMailOpenOutline } from "react-icons/io5";
import { IoPersonOutline } from "react-icons/io5";
import { IoHomeOutline } from "react-icons/io5";

import { SearchIcon } from "./icons/SearchIcon";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import SignUp from "./ui/SignUp";
import SearchBar from "./SearchBar";
async function Header() {
  const session = await getAuthSession();
  let count;
  if (session?.user) {
    const numberOfRecords = await db.questions.count({
      where: {
        answer: null,
        userId: session.user.id,
      },
    });
    count = numberOfRecords;
  }
  return (
    <div className="flex justify-center bg-white px-4">
      <div className="w-full max-w-screen-md">
        <div className="flex flex-col">
          <Navbar className="container flex  justify-between items-center">
            <NavbarBrand>
              <Link href="/" className="font-extrabold text-3xl italic">
                Ask<span className="text-danger-500">Me</span>
              </Link>
            </NavbarBrand>
            <NavbarContent>
              <SearchBar/>
            </NavbarContent>
            <NavbarContent justify="end" className="flex space-x-4">
              <NavbarItem>
                <Link href="/">
                  <IoHomeOutline size="30" className="text-xl" />
                </Link>
              </NavbarItem>
              <NavbarItem>
                <Link href={`/${session?.user.id}`}>
                  <IoPersonOutline size="30" className="text-xl" />
                </Link>
              </NavbarItem>
              <NavbarItem>
                <Link href="/inbox" className="relative inline-block">
                  <IoMailOpenOutline size="30" className="text-xl" />
                  <span className="absolute -top-1 -left-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center">
                    {count || 0}
                  </span>
                </Link>
              </NavbarItem>
            
              <NavbarItem>
                {session ? <SignUp /> : <Link href="/sign-in">Sign in</Link>}
              </NavbarItem>
            </NavbarContent>
          </Navbar>
        </div>
      </div>
    </div>
  );
}

export default Header;
