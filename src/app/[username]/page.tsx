import Image from "next/image";
import { Avatar, Button } from "@nextui-org/react";

import AskQuestionForm from "@/components/profile/AskQuestionForm";
import ProfileEdit from "@/components/profile/ProfileEdit";
import ProfileNumbers from "@/components/profile/ProfileNumbers";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import type { User, Follows, Questions } from "@prisma/client";
import { notFound } from "next/navigation";
import PostList from "@/components/posts/PostList";
import Post from "@/components/posts/Post";

interface ProfilePageProps {
  params: {
    username: string;
  };
}
export type UserWithFollowingInfo = User & {
  followers: Follows[];
  following: Follows[];
  receivedQuestions: Questions[];
};

async function ProfilePage({ params }: ProfilePageProps) {
  const session = await getAuthSession();
  console.log("Url: " + params.username + " Session: " + session?.user.id);


  //fetching user's posts
  const posts = await db.questions.findMany({
    where: {
      userId: session?.user.id,
      //
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: true,
      likes: true,
      author:true,
    },
  });


  let user = await db.user.findFirst({
    where: {
      id: params.username,
    },
    include: {
      followers: true,
      following: true,
      receivedQuestions: true,
    },
  });
  // Check if user is null and handle the case
  if (!user) {
    console.log("User not found");
    return notFound();
  }
  return (
    <main className="container mx-auto flex flex-col  items-center w-full max-w-screen-md">
      <div className="bg-red-200 min-h-[150px] w-full"></div>
      <div className="p-4 w-full bg-white">
        <div className="flex justify-between w-full relative	">
          <div className="pl-2 flex flex-col justify-center">
            <Avatar
              src={user?.image || ""}
              className="absolute border-white border-2	"
              style={{
                top: -60,
                transform: "scale(1.5)",
              }}
              size="lg"
            />
            <p className="font-bold">{user?.name}</p>
          </div>
          <ProfileNumbers
            followersCount={user?.followers.length || 0}
            followingCount={user?.following.length || 0}
            recievedQuestionsCount={user?.receivedQuestions.length || 0}
          />
        </div>
        <ProfileEdit user={user} urlParam={params.username} />
        <AskQuestionForm params={params} />
        <div className="flex flex-col ">
              {
                posts.map((post)=> <Post key={post.id} question={post} user={post.user}/> )
              }
        </div>
      </div>
    </main>
  );
}

export default ProfilePage;
