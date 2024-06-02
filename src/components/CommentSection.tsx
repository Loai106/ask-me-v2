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
    <div className='flex flex-col  mt-4'>

     <CreateComment postId={postId} />
      <div className='flex flex-col'>
        {
          comments.filter((comment)=> !comment.replyToId).map((topLevelComment)=>{

            return (
              <div key={topLevelComment.id} className='flex flex-col'>
                <div className='mb-2 mt-2 gap-2 m'>
                  <PostComments comment={topLevelComment} postId={postId} />

                  {
                  topLevelComment.replies.map((reply)=>{
                    return (
                      <div key={reply.id} className='ml-2 mt-2 py-2 pl-4 border-l-2 border-zinc-200'>
                       <PostComments comment={reply} postId={postId} />
                      </div>
                    )
                  })
                }
                </div>

                

              </div>
            )
          })
        }
      </div>

     


    </div>
  )
}
