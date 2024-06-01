import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { AnswerValidator } from "@/lib/validators/answer";
import {z} from "zod";


export async function POST(req:Request) {

    try{
        const session = await getAuthSession();

        if(!session?.user){
            return new Response('Unauthorized',{status:401})
        }

        const body = await req.json();
        const {answer,questionId} = AnswerValidator.parse(body);

        const updateQuestion = await db.questions.update({
            where : {
                id: questionId
            },
            data: {
                answer:answer
            }
        })


        return new Response(updateQuestion.id);

    }catch(err){
        if(err instanceof z.ZodError){
            return new Response(err.message , {status:422});
        }

        return new Response('couldnt send the questions',{status:500})
    }
    
}