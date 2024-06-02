"use server";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { HiDotsHorizontal } from "react-icons/hi";
import { Button } from "@nextui-org/react";
import { getAuthSession } from "@/lib/auth";
import type { UserWithFollowingInfo } from "@/app/[username]/page";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import FollowButton from "./FollowButton";
import { revalidatePath } from "next/cache";

interface ProfileEditProps {
  user: UserWithFollowingInfo;
  urlParam: string;
}
async function ProfileEdit({ user, urlParam }: ProfileEditProps) {
  const session = await getAuthSession();
  const isLoggedinUser = session?.user.id === urlParam;
  const isFollowing = !!user.followers.find((e) => {
    return session?.user.id === e.followingId;
  });
  if (!session?.user || !urlParam) {
    notFound();
  }
  //follow and unfollow functionality
  async function followFun() {
    "use server";

    // if (!session?.user) {
    //   return;
    // }
    //follow Logic
    if (!isFollowing) {
      await db.follows.create({
        data: {
          followerId: user.id || "",
          followingId: session?.user.id || "",
        },
      });
    }

    //unfollowLogic
    if (isFollowing) {
      await db.follows.delete({
        include: {
          follower: true,
        },
        where: {
          followerId_followingId: {
            followerId: user.id || "",
            followingId: session?.user.id || "",
          },
        },
      });
    }
    revalidatePath(`/${session?.user.id || ""}/following`);
    revalidatePath(`/${urlParam}/followers`);
    revalidatePath(`/${urlParam}`);
  }

  return (
    <div className="flex gap-2 my-2">
      <form className="flex-grow" action={followFun}>
        <FollowButton
          isFollowing={isFollowing}
          isLoggedinUser={isLoggedinUser}
        />
      </form>

      {isLoggedinUser && (
        <Button>
          <MdOutlineModeEditOutline />
        </Button>
      )}
      <Button>
        <HiDotsHorizontal />
      </Button>
    </div>
  );
}
export default ProfileEdit;
