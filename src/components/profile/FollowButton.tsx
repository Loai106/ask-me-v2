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

  function copyLink() {
    console.log("Link Copied...");
  }
  const theButton = !isLoggedinUser ? (
    <Button
      className=" w-full bg-red-400 text-white "
      type="submit"
      onClick={handleFollow}
    >
      {!isFollowed ? "Follow" : "Unfollow"}
    </Button>
  ) : (
    <Button
      className=" w-full bg-red-400 text-white "
      onClick={(e) => {
        e.preventDefault();
        copyLink();
        console.log("clicked");
      }}
    >
      {"Share Page"}
    </Button>
  );

  return theButton;
}

export default FollowButton;
