'use client'
import { Comment , User } from '@prisma/client'
import {Button, Textarea, User as UserAvatar} from "@nextui-org/react"
import { formatTimeToNow } from '@/lib/utils'
import { MessageSquare } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useRef, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { CommentRequest } from '@/lib/validators/comment'
import axios from 'axios'
type ExtendedComment = Comment & {
    author : User
}
interface PostCommentProps {

    comment : ExtendedComment
    postId : string
}


export default function PostComments({comment , postId} : PostCommentProps) {
    const commentRef = useRef<HTMLDivElement>(null)
  const router = useRouter();   
  const {data : session} = useSession();
  const [isReplying , setIsReplying] = useState<boolean>(false);
  const [input , setInput] = useState<string>('');


  const {mutate : postReply ,isPending} = useMutation({
    mutationFn: async ({postId,text,replyToId}:CommentRequest)=>{

        const payload : CommentRequest = {
            postId,
            text,
            replyToId
        }

        const {data} = await axios.patch('/api/questions/comment',payload)
        return data ; 

    },
    onSuccess : ()=>{
        router.refresh();
        setIsReplying(false);
        setInput('');
    }
  })

  return (
    <div ref={commentRef} className='bg-white p-4 flex flex-col '>
        <div className='flex items-center border-solid'>
            <UserAvatar 
          
            name={comment.author.name}
            avatarProps={{
              src: comment.author.image  || ""
            }
            }
            />
            <div className='ml-2 flex items-center gap-x-2'>
                <p className='max-h-40 truncate text-xs text-zinc-500'>
                    {formatTimeToNow(new Date(comment.createdAt))}
                </p>
            </div>

        </div>
        <p className='text-sm text-zinc-900 mt-2 '>{comment.text}</p>
        <div className='flex flex-wrap gap-2 items-center'>
        <Button 
        onClick={()=>{
            if(!session) return router.push('/sign-in');
            setIsReplying(!isReplying);
        }}
        variant='ghost'
         size='sm'>
            <MessageSquare className='h-4 w-4 mr-1.5 '/>
            Reply
        </Button>
        {isReplying?(
            <div className='grid w-full gap-1.5'>
        
            <div className='mt-2'>
                <Textarea
                    color='danger'
                    label="Your Reply" 
                    placeholder='write a reply ' 
                    id='comment' 
                    value={input} 
                    rows={1}
                    onChange={(e)=>setInput(e.target.value)}
                    />
            </div>
            <div className='mt-2 flex justify-end'>
                <Button isLoading={isPending} disabled={input.length === 0} color='danger' onClick={()=>postReply({postId,text:input , replyToId: comment.replyToId ?? comment.id})}>Reply</Button>
            </div>
        </div>
        ):null}
        </div>
    </div>
)
}
