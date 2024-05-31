import PostList from "@/components/posts/PostList";
import { Button, User, Link, Divider } from "@nextui-org/react";
import React from "react";
import {
  AiOutlineHeart,
  AiOutlineComment,
  AiOutlineShareAlt,
} from "react-icons/ai";
export default function page() {
  return (
    <div className="my-4 flex justify-center  px-4">
      <div className="w-full max-w-screen-md">
        <div className="flex flex-col">
          <PostList />
        </div>
      </div>
    </div>
  );
}
