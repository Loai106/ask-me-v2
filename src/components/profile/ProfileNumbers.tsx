import React from "react";

interface ProfileNumbersProps {
  followersCount: number;
  followingCount: number;
  recievedQuestionsCount: number;
}
function ProfileNumbers({
  followersCount,
  followingCount,
  recievedQuestionsCount,
}: ProfileNumbersProps) {
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
