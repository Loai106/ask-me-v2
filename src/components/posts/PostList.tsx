'use client';
import React from 'react'

import { AiOutlineHeart ,AiOutlineComment,AiOutlineShareAlt } from 'react-icons/ai'
import { Button ,User ,Link ,Divider} from '@nextui-org/react'




function PostList() {

    const renderedPosts = Array.from({length:5}).map((_,i)=>(
        <div key={i} className=' bg-white p-4 flex flex-col gap-2 my-4'>
        <div className='font-bold'>Is everything ok?</div>
        <div className='details'>
          <div className='text-sm text-red-400 '>Anonymous</div>
          <User   
              name="Junior Garcia"
              description="4 days ago"
              avatarProps={{
                src: "https://avatars.githubusercontent.com/u/30373425?v=4"
              }}
            />           
          </div>
        <div className='answer text-sm'>I am good</div>
        <Divider className='my-1'/>
        <div className='footer flex gap-4 '>
          <div><AiOutlineHeart size="30"/></div>
          <div><AiOutlineComment size="30"/></div>
          <div><AiOutlineShareAlt size="30"/></div>

        </div>
      </div>

      ))

  return <div>{renderedPosts}</div>;
}

export default PostList