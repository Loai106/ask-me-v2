import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";
import type { Questions } from "@prisma/client";
export async function GET(req: Request) {
  const session = await getAuthSession();
  const userId = session?.user.id;

  try {
   


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

    return new Response(JSON.stringify(posts));
  } catch (err) {
    return new Response("Could not fetch posts", { status: 500 });
  }
}
