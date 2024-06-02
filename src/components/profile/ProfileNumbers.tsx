import { getAuthSession } from "@/lib/auth";
import Link from "next/link";
import React from "react";

interface ProfileNumbersProps {
  followersCount: number;
  followingCount: number;
  recievedQuestionsCount: number;
}
async function ProfileNumbers({
  followersCount,
  followingCount,
  recievedQuestionsCount,
}: ProfileNumbersProps) {
  const session = await getAuthSession();
  return (
    <div className="flex gap-4 justify-end text-center">
      <div>
        <span className="text-large font-semibold">{followersCount}</span>
        <p>Followers</p>
      </div>
      <div>
        <span className="text-large font-semibold">
          {recievedQuestionsCount}
        </span>
        <p>Answers</p>
      </div>
      <div>
        <span className="text-large font-semibold">{followingCount}</span>
        <p>Following</p>
      </div>
    </div>
  );
}

export default ProfileNumbers;
