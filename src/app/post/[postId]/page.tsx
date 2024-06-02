import CommentSection from '@/components/CommentSection'
import Post from '@/components/posts/Post'
import { db } from '@/lib/db'
import { Questions } from '@prisma/client'
import React from 'react'

interface PageProps{
    params :{
        postId : string
    }
}



export default async function page({params}:PageProps) {

  //fetching question
  const question  = await db.questions.findFirst({
    where:{
      id:params.postId
    },
    include:{
      user:true,
      likes:true,
      author:true,
    }
  })

  return (
    <div className="my-4 flex justify-center  px-4">
    <div className="w-full max-w-screen-md">
      <div className="flex flex-col">
        <div>
          <Post question={question} user={question?.user}/>
        </div>
        <div >
              <CommentSection postId={params.postId}/>
        </div>
       </div>
      </div>
    </div>
     
  )
}
