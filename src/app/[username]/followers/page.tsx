"use server";

import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";
import { db } from "@/lib/db";
import { User as UserAvatar } from "@nextui-org/react";
import Link from "next/link";
interface FollowersPageProps {
  params: {
    usename: string;
  };
}
async function FollowersPage({ params }: FollowersPageProps) {
  const session = await getAuthSession();
  if (!session?.user) {
    redirect("/sign-in");
  }

  const user = await db.user.findFirst({
    where: {
      id: params.usename,
    },
    include: {
      following: {
        include: {
          folllowing: true,
        },
      },
    },
  });
  return (
    <main className="my-4 flex justify-center  px-4">
      <div className="w-full max-w-screen-md">
        <h1 className="font-bold text-3xl mb-3">Followers</h1>

        <ul className="flex flex-col">
          {user?.following.map((e:any) => {
            return (
              <li
                key={e.folllowing.id}
                className="flex flex-row justify-between items-center p-3 my-1 bg-white"
              >
                <UserAvatar
                  name={e.folllowing.name}
                  avatarProps={{
                    src: e.folllowing.image || "",
                  }}
                />
                <Link
                  href={`/${e.folllowing.id}`}
                  className="font-semibold text-danger-400 text-sm"
                >
                  Ask a Question &gt;&gt;{" "}
                </Link>
              </li>
            );
          })}{" "}
        </ul>
      </div>
    </main>
  );
}

export default FollowersPage;
