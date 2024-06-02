import PostList from "@/components/posts/PostList";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { Button, User, Link, Divider } from "@nextui-org/react";
import { redirect } from "next/navigation";
import React from "react";
import {
  AiOutlineHeart,
  AiOutlineComment,
  AiOutlineShareAlt,
} from "react-icons/ai";
export default async function page() {
  const session = await getAuthSession();
  if (!session?.user) {
    redirect("/sign-in");
  }
  const receivedQuestions = await db.questions.findMany({
    where: {
      userId: session?.user.id,
    },
  });

  const answeredQuestions = receivedQuestions.filter((question) => {
    return question.answer;
  });

  return (
    <div className="my-4 flex justify-center  px-4">
      <div className="w-full max-w-screen-md">
        <div className="flex flex-col">
          <PostList questions={answeredQuestions} user={session?.user} />
        </div>
      </div>
    </div>
  );
}
