import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";
import type { Questions } from "@prisma/client";
export async function GET(req: Request) {
  const session = await getAuthSession();
  const userId = session?.user.id;

  try {
    const following = await db.follows.findMany({
      where: {
        followingId: userId,
      },
      select: {
        followerId: true,
      },
    });

    const followingIds = following.map((f) => f.followerId);
    followingIds.push(session?.user.id || "");

    const posts = await db.questions.findMany({
      where: {
        userId: {
          in: followingIds,
        },
        //
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: true,
        likes: true,
        author:true,
        comments:true,
      },
    });

    return new Response(JSON.stringify(posts));
  } catch (err) {
    return new Response("Could not fetch posts", { status: 500 });
  }
}
