import { User as UserA ,Divider} from '@nextui-org/react'
import React from 'react'
import { AiOutlineHeart ,AiOutlineComment,AiOutlineShareAlt } from 'react-icons/ai'
//import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import CommentSection from '../CommentSection';
import { Questions, User } from '@prisma/client';
import { formatTimeToNow } from '@/lib/utils';

interface PostProps {
    question : Questions
    user : User
}



export default  function Post({question,user}: PostProps) {
   // const {isOpen, onOpen, onOpenChange} = useDisclosure();

    if(!question.answer) return ;

    

    return (
            <div key={question.id} className=' bg-white p-4 flex flex-col gap-2 my-4'>
            <div className='font-bold'>{question.content}</div>
            <div className='details'>
              <div className='text-sm text-red-400 '>{question.isAnonymous?"Anonymous":question.authorId}</div>
              <UserA   
                  name={user.name}
                  description={formatTimeToNow(new Date(question.createdAt))}
                  avatarProps={{
                    src: user.image || " "
                  }}
                />           
              </div>
            <div className='answer text-sm'>{question.answer}</div>
            <Divider className='my-1'/>
            <div className='footer flex gap-4 '>
              <div><AiOutlineHeart size="30"/></div>


              <div><AiOutlineShareAlt size="30"/></div>
    
            </div>
          </div>
          )
}
