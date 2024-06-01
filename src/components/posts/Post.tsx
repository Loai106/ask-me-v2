import { User, Divider } from "@nextui-org/react";
import React from "react";
import {
  AiOutlineHeart,
  AiOutlineComment,
  AiOutlineShareAlt,
} from "react-icons/ai";

import type { Likes, Questions } from "@prisma/client";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
export default function Post({ question, user }: any) {
  const { mutate: handleLike, isPending } = useMutation({
    mutationFn: async () => {
      const payload = {
        questionId: question.id,

        userId: user.id,
      };
      const { data } = await axios.post("/api/likes", payload);

      return data as string;
    },
  });
  return (
    <div key={question.id} className=" bg-white p-4 flex flex-col gap-2 my-4">
      <div className="font-bold">{question.content}</div>
      <div className="details">
        <div className="text-sm text-red-400 ">
          {question.isAnonymous ? "Anonymous" : question.authorId}
        </div>
        <User
          name={user.name}
          description="4 days ago"
          avatarProps={{
            src: user.image,
          }}
        />
      </div>
      <div className="answer text-sm">{question.answer}</div>
      <Divider className="my-1" />
      <div className="footer flex gap-4 ">
        <div>
          <AiOutlineHeart size="30" />
        </div>
        <div>
          <AiOutlineComment size="30" />
        </div>
        <div onClick={() => handleLike()}>
          <AiOutlineShareAlt size="30" />
        </div>
      </div>
    </div>
  );
}
