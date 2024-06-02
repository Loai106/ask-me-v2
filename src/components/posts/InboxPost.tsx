'use client';
import React, { useState } from 'react'
import {Divider,User, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Textarea } from '@nextui-org/react';
import { db } from '@/lib/db';
import { useRouter } from "next/navigation";
import {useMutation} from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { AnswerCreationRequest } from '@/lib/validators/answer';
import { formatTimeToNow } from '@/lib/utils';




export default  function InboxPost({questionId,question,image,isAnonymous,authorName,createdAt}:any) {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [input,setInput] = useState<string>('');

    const {mutate: createAnswer , isPending} = useMutation({
        mutationFn: async ()=>{
          const payload : AnswerCreationRequest = {
            answer:input,
            questionId,
          }
    
        
    
          const {data} = await axios.post('/api/answer',payload);
          return data as string;
        },
})
  

  return (

    <form  className=' bg-white p-4 flex flex-col gap-2 my-4'>
        <div className='details'>
          <User   
              name={isAnonymous ? "Anonymous" : authorName}
              description={formatTimeToNow(new Date(createdAt))}
              avatarProps={{
                src: isAnonymous ? "" : image
              }}
            />  
            <div className=''>{question}</div>
         
          </div>
        <Divider className='my-1'/>
            <div>
                <Button  onPress={onOpen}>Reply</Button>
                <Modal isOpen={isOpen} onOpenChange={onOpenChange} className='h-screen max-w-screen-md'>
                    <ModalContent>
                            {(onClose) => (
                                        <>
                                <ModalHeader className="flex flex-col gap-1 ">{question}</ModalHeader>
                                <ModalBody>
                                    <Textarea className='h-full' value={input} name="answer" placeholder="Type reply" onChange={(e)=> setInput(e.target.value)} />
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                    </Button>
                                    <Button  onClick={()=>createAnswer()} color="danger" onPress={onClose}>
                                    Post
                                    </Button>
                                </ModalFooter>
                                </>
                            )}
                        </ModalContent>
               </Modal>
            </div>
   
    </form>

  )

}


// <div key={i} className=' bg-white p-4 flex flex-col gap-2 my-4'>
//         <div className='font-bold'>Is everything ok?</div>
//         <div className='details'>
//           <div className='text-sm text-red-400 '>Anonymous</div>
//           <User   
//               name="Junior Garcia"
//               description="4 days ago"
//               avatarProps={{
//                 src: "https://avatars.githubusercontent.com/u/30373425?v=4"
//               }}
//             />           
//           </div>
//         <div className='answer text-sm'>I am good</div>
// v        <div className='footer flex gap-4 '>
//           <div><AiOutlineHeart size="30"/></div>
//           <div><AiOutlineComment size="30"/></div>
//           <div><AiOutlineShareAlt size="30"/></div>

//         </div>
//       </div>