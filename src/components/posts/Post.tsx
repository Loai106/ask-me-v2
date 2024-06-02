'use client'
import { User as UserAvatar, Divider } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import {
  AiOutlineHeart,
  AiOutlineComment,
  AiOutlineShareAlt,
} from "react-icons/ai";
import { IconContext } from "react-icons";
import type { Likes, Questions ,User } from "@prisma/client";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import HeartIcon from "@/components/icons/HeartIcon";
import Link from "next/link";
import { formatTimeToNow } from "@/lib/utils";

interface PostProps {
    question : Questions
    user : User
}




export default function Post({ question, user }: any) {
    
  const { data: session } = useSession();
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
        return data as string;
      }
      if (isLiked) {
        const { data } = await axios.delete("/api/likes", {
          data: payload,
        });
        setIsLiked(false);
        return data as string;
      }
    },
  });
  function checkLike() {
    for (let i = 0; i < question.likes.length; i++) {
      if (question.likes[i].userId === session?.user.id) {
        setIsLiked(true);
        return;
      }
    }
  }

  if(!question.answer) return ;
  return (
    <div key={question.id} className=" bg-white p-4 flex flex-col gap-2 my-4">
      <div className="font-bold">{question.content}</div>
      <div className="details">
        <div className="text-sm text-red-400 ">
          {question.isAnonymous ? "Anonymous" : question.author.name }
        </div>
        <UserAvatar
          name={user.name}
          description={formatTimeToNow(new Date(question.createdAt))}
          avatarProps={{
            src: user.image,
          }}
        />
      </div>
      <div className="answer text-sm">{question.answer}</div>
      <Divider className="my-1" />
      <div className="footer flex gap-4 ">
        <IconContext.Provider
          value={{ color: "red", className: "bg-red-500 w-fit" }}
        >
          <div onClick={() => handleLike()}>
            <HeartIcon isLiked={isLiked} />
          </div>
        </IconContext.Provider>
        <div>
          <Link href={`/post/${question.id}`}><AiOutlineComment size="30" /></Link>
        </div>
        <div>
          <AiOutlineShareAlt size="30" />
        </div>
      </div>
    </div>
  );
}
