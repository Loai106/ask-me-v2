'use client';
import { CommentRequest } from '@/lib/validators/comment';
import { Textarea , Button } from '@nextui-org/react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react'

interface CreateCommentProps {}

export default function CreateComment({}: CreateCommentProps) {
  const [input,setInput] = useState<string>("");

  const {} = useMutation({
    mutationFn: async({postId , text , replyToId}: CommentRequest)=>{
        const payload : CommentRequest = {
            postId,
            text,
            replyToId,

        }

        const {data} = await axios.patch('/api/questions/comment',payload);
        return data;
    },
  
    
  })

  return (
    <div className='grid w-full gap-1.5'>
        
        <div className='mt-2'>
            <Textarea
                label="Your Comment" 
                placeholder='write a comment ' 
                id='comment' 
                value={input} 
                rows={1}
                onChange={(e)=>setInput(e.target.value)}
                />
        </div>
        <div className='mt-2 flex justify-end'>
            <Button>Post</Button>
        </div>
    </div>
  )
}
