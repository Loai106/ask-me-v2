"use client";
import { Button } from "@nextui-org/react";
import { useState } from "react";
interface FollowButtonProps {
  isLoggedinUser: boolean;
  isFollowing: boolean;
}

function FollowButton({ isLoggedinUser, isFollowing }: FollowButtonProps) {
  const [isFollowed, setIsFollowed] = useState(isFollowing);
  function handleFollow() {
    setIsFollowed(!isFollowed);
  }
  return (
    <Button
      className=" w-full bg-red-400 text-white "
      type="submit"
      onClick={isLoggedinUser ? handleFollow : undefined}
    >
      {isLoggedinUser ? "Share Page" : !isFollowed ? "Follow" : "Unfollow"}
    </Button>
  );
}

export default FollowButton;
