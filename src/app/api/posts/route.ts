import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";

export  async function GET(req:Request) {

    const session = await getAuthSession();
    const userId = session?.user.id;

    try{
        const following = await db.follows.findMany({
            where:{
                followerId:userId
            },
            select:{
                followingId:true
            }
        });

        const followingIds = following.map(f =>f.followingId);

        const posts = await db.questions.findMany({
            where: {
                userId :{
                    in: followingIds
                },
                // 
            },
            orderBy: {
                createdAt: 'desc',
              },
            include : {
                user : true
            }
        });

        return new Response(JSON.stringify(posts));

    }
    catch(err){
        return new Response('Could not fetch posts', { status: 500 })

    }
  
}
