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
      followers: {
        include: {
          follower: true,
        },
      },
    },
  });
  return (
    <main className="my-4 flex justify-center  px-4">
      <div className="w-full max-w-screen-md">
        <h1 className="font-bold text-3xl mb-3">Following</h1>
        <ul className="flex flex-col">
          {user?.followers.map((e) => {
            return (
              <li
                key={e.follower.id}
                className="flex flex-row justify-between items-center p-3 my-1 bg-white"
              >
                <UserAvatar
                  name={e.follower.name}
                  avatarProps={{
                    src: e.follower.image || "",
                  }}
                />
                <Link
                  href={`/${e.follower.id}`}
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
