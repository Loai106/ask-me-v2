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
import SignUp from "./ui/SignUp";
async function Header() {
  const session = await getAuthSession();
  console.log("Header:  " + session?.user.username);
  return (
    <div className="flex justify-center bg-white px-4">
      <div className="w-full max-w-screen-md">
        <div className="flex flex-col">
          <Navbar className="container flex  justify-between items-center">
            <NavbarBrand>
              <Link href="/" className="font-bold">
                AskMe
              </Link>
            </NavbarBrand>
            <NavbarContent>
              <Input
                placeholder="Search Username"
                size="sm"
                type="email"
                startContent={
                  <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
                }
              />
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
                <Link href="/inbox">
                  <IoMailOpenOutline size="30" className="text-xl" />
                </Link>
              </NavbarItem>
              <NavbarItem>
                <Link href="/notifications">
                  <IoMdNotificationsOutline size="30" className="text-xl" />
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
