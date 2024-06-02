"use client";
import { User as UserAvatar, Divider } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import {
  AiOutlineHeart,
  AiOutlineComment,
  AiOutlineShareAlt,
} from "react-icons/ai";
import { IconContext } from "react-icons";
import type { Likes, Questions, User } from "@prisma/client";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import HeartIcon from "@/components/icons/HeartIcon";
import Link from "next/link";
import { formatTimeToNow } from "@/lib/utils";
import { useRouter } from 'next/navigation'

export default function Post({ question, user }: any) {
  const [numLikes , setNumLikes] = useState<number>(question.likes.length)
  const { data: session } = useSession();
  const router = useRouter()
  const [isLiked, setIsLiked] = useState<boolean>(false);
  useEffect(() => {
    checkLike();
  }, []);
  const { mutate: handleLike, isPending } = useMutation({
    mutationFn: async () => {
      if (!session?.user) {
        return;
      }
      const payload = {
        questionId: question.id,
        userId: session?.user.id,
      };
      checkLike();
      if (!isLiked) {
        const { data } = await axios.post("/api/likes", payload);
        setIsLiked(true);
        setNumLikes(()=>numLikes+1)
        return data as string;
      }
      if (isLiked) {
        const { data } = await axios.delete("/api/likes", {
          data: payload,
        });
        setNumLikes(()=>numLikes-1)

        setIsLiked(false);

        return data as string;
      }
    },
    onSuccess : ()=>{
      router.refresh();
    }
  });
  function checkLike() {
    for (let i = 0; i < question.likes.length; i++) {
      if (question.likes[i].userId === session?.user.id) {
        setIsLiked(true);
        return;
      }
    }
  }
  async function copyLink() {
    const link = question.id
      ? `http://localhost:3000/post/${question.id}`
      : "http://localhost:3000";

    await navigator.clipboard.writeText(link);
  }
  if (!question.answer) return;
  return (
    <div key={question.id} className=" bg-white p-4 flex flex-col gap-2 my-2">
      <div className="font-bold">{question.content}</div>
      <div className="details">
        <div className="text-sm text-red-400 ">
          {question.isAnonymous ? "Anonymous" : question.author.name}
        </div>
        <Link href={`/${user.id}`}>
        <UserAvatar
          name={user.name}
          description={formatTimeToNow(new Date(question.createdAt))}
          avatarProps={{
            src: user.image,
          }}
        />
        </Link>
      </div>
      <div className="answer text-sm">{question.answer}</div>
      <Divider className="my-1" />
      <div className="footer flex gap-4  ">
        <IconContext.Provider
          value={{ color: "red", className: "bg-red-500 w-fit" }}
        >
          <div onClick={() => handleLike()} className="flex gap-1">
            <HeartIcon isLiked={isLiked} />
            <span>{numLikes>0 ?numLikes: null}</span>
          </div>
        </IconContext.Provider>
        <div>
          <Link className="flex gap-1" href={`/post/${question.id}`}>
            <AiOutlineComment size="30" />
            <span>{/*question.comments.length>0 ?question.comments.length : null */}</span>
          </Link>
        </div>
        <div onClick={copyLink} className="cursor-pointer">
          <AiOutlineShareAlt size="30" />
        </div>
      </div>
    </div>
  );
}
