'use client';
import React, { useEffect } from 'react'

import { AiOutlineHeart ,AiOutlineComment,AiOutlineShareAlt } from 'react-icons/ai'
import { Button ,User ,Link ,Divider} from '@nextui-org/react'
import { UseInfiniteQueryOptions, useInfiniteQuery, useMutation } from '@tanstack/react-query';

import axios from 'axios'



  function PostList({questions , user}:any) {

    
    const {mutate: getPosts , data, error,isPending} = useMutation({
      mutationFn: async ()=>{
        const {data} = await axios.get('/api/posts');

      
  
        return data ;
      },
})

useEffect(()=>{
  getPosts();
 
},[getPosts])


// const renderedPosts = data.map((post)=>{
//   return <div key={post.id}></div>
// })




    // const renderedQuestions = questions.map((question:any)=>{
    //   return (
    //     <div key={question.id} className=' bg-white p-4 flex flex-col gap-2 my-4'>
    //     <div className='font-bold'>{question.content}</div>
    //     <div className='details'>
    //       <div className='text-sm text-red-400 '>{question.isAnonymous?"Anonymous":question.authorId}</div>
    //       <User   
    //           name={user.name}
    //           description="4 days ago"
    //           avatarProps={{
    //             src: user.image
    //           }}
    //         />           
    //       </div>
    //     <div className='answer text-sm'>{question.answer}</div>
    //     <Divider className='my-1'/>
    //     <div className='footer flex gap-4 '>
    //       <div><AiOutlineHeart size="30"/></div>
    //       <div><AiOutlineComment size="30"/></div>
    //       <div><AiOutlineShareAlt size="30"/></div>

    //     </div>
    //   </div>
    //   )

    // })

    // const renderedPosts = Array.from({length:5}).map((_,i)=>(
    //     <div key={i} className=' bg-white p-4 flex flex-col gap-2 my-4'>
    //     <div className='font-bold'>Is everything ok?</div>
    //     <div className='details'>
    //       <div className='text-sm text-red-400 '>Anonymous</div>
    //       <User   
    //           name="Junior Garcia"
    //           description="4 days ago"
    //           avatarProps={{
    //             src: "https://avatars.githubusercontent.com/u/30373425?v=4"
    //           }}
    //         />           
    //       </div>
    //     <div className='answer text-sm'>I am good</div>
    //     <Divider className='my-1'/>
    //     <div className='footer flex gap-4 '>
    //       <div><AiOutlineHeart size="30"/></div>
    //       <div><AiOutlineComment size="30"/></div>
    //       <div><AiOutlineShareAlt size="30"/></div>

    //     </div>
    //   </div>

    //   ))

   if(data) return <div>{JSON.stringify(data)}</div>;

   return <div>no posts</div>
}

export default PostList