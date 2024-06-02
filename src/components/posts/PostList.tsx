"use client";
import React, { useEffect } from "react";
import { FC } from "react";
import { Questions, User } from "@prisma/client";
import {
  AiOutlineHeart,
  AiOutlineComment,
  AiOutlineShareAlt,
} from "react-icons/ai";
import { Button, Link, Divider } from "@nextui-org/react";
import {
  UseInfiniteQueryOptions,
  useInfiniteQuery,
  useMutation,
} from "@tanstack/react-query";

import axios from "axios";
import Post from "./Post";

interface PostListProps {
  questions: Questions[];
  user: User;
}

const PostList: FC<any> = () => {
  const {
    mutate: getPosts,
    data,
    error,
    isPending,
  } = useMutation({
    mutationFn: async () => {
      const { data } = await axios.get("/api/posts");

      return data;
    },
  });

  useEffect(() => {
    getPosts();
    console.log("deb");
    console.log(data);
  }, [getPosts]);

  const renderedPosts =
    data && Array.isArray(data) ? (
      data.map((post: any) => (
        <Post key={post.id} question={post} user={post.user} />
      ))
    ) : (
      <div>No data</div>
    );

  if (!data) return <div>no data</div>;
  return <div>{renderedPosts}</div>;
};

export default PostList;
