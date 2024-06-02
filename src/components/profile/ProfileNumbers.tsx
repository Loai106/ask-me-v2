import { getAuthSession } from "@/lib/auth";
import Link from "next/link";
import React from "react";

interface ProfileNumbersProps {
  followersCount: number;
  followingCount: number;
  recievedQuestionsCount: number;
  theurl: string;
}
async function ProfileNumbers({
  followersCount,
  followingCount,
  recievedQuestionsCount,
  theurl,
}: ProfileNumbersProps) {
  const session = await getAuthSession();
  return (
    <div className="flex gap-4 justify-end text-center">
      <div>
        <Link
          href={`/${theurl}/followers`}
          className="text-large font-semibold"
        >
          {followersCount}
        </Link>
        <p>Followers</p>
      </div>
      <div>
        <span className="text-large font-semibold">
          {recievedQuestionsCount}
        </span>
        <p>Answers</p>
      </div>
      <div>
        <Link
          href={`/${theurl}/following`}
          className="text-large font-semibold"
        >
          {followingCount}
        </Link>
        <p>Following</p>
      </div>
    </div>
  );
}

export default ProfileNumbers;
