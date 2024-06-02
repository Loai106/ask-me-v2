'use server'
import React from 'react'
import { Comment, User } from '@prisma/client'
import { db } from '@/lib/db'
import { getAuthSession } from '@/lib/auth'
import PostComments from './comments/PostComments'
import CreateComment from './CreateComment'


type ExtendedComment = Comment & {
  author : User
  repies : ReplyComment[]
}

type ReplyComment = Comment & {
  author: User
}


interface CommentsSectionProps {
  postId : string
}


export default async function CommentSection({postId}: CommentsSectionProps ) {

  const session = await getAuthSession();

  //fetching the top level comments
  const comments = await db.comment.findMany({
    where:{
      questionId : postId,
      replyToId :null,
    },
    include:{
      author: true,
      replies:{
        include: {
          author:true,
        },
      },
    },
  })
    





  return (
    <div className='flex flex-col gap-y-4 mt-4'>
      <hr className='w-full h-px my-6'/>


     {/* <CreateComment />*/}
      <div className='flex flex-col gap-y-6 mt-4'>
        {
          comments.filter((comment)=> !comment.replyToId).map((topLevelComment)=>{

            return (
              <div key={topLevelComment.id} className='flex flex-col'>
                <div className='mb-2'>
                  <PostComments comment={topLevelComment}  />
                </div>
              </div>
            )
          })
        }
      </div>


    </div>
  )
}
