import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { QuestionValidator } from "@/lib/validators/question";
import {z} from "zod";


export async function POST(req:Request) {

    try{
        const session = await getAuthSession();

        if(!session?.user){
            return new Response('Unauthorized',{status:401})
        }

        const body = await req.json();
        const {content,isAnonymous} = QuestionValidator.parse(body);

        const question = await db.questions.create({
            data:{
                content,
                isAnonymous,
                authorId:session.user.id,
                userId: session.user.id,
            },
        })


        return new Response(question.content);

    }catch(err){
        if(err instanceof z.ZodError){
            return new Response(err.message , {status:422});
        }

        return new Response('couldnt send the questions',{status:500})
    }
    
}