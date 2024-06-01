import InboxPost from '@/components/posts/InboxPost';
import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db';
import React from 'react'

export default async function page() {

  const session = await getAuthSession();
  const receivedQuestions = await db.questions.findMany({
    where :{
      userId: session?.user.id
    },
  });

  const renderedQuestions =receivedQuestions.map(async (question)=>{

    if(question.answer){
      return ;
    }
        
    if(question.isAnonymous) return <InboxPost key={question.id} questionId={question.id || ""} question={question.content} isAnonymous={question.isAnonymous} />

    const user = await db.user.findFirst({
      where : {
          id : question.authorId || ""
      }
  });

  return <InboxPost key={question.id} questionId={question.id || ""} question={question.content} isAnonymous={question.isAnonymous} image={user?.image || ""} authorName={user?.name ||""}  />
  }  );




  return (
<div className="my-4 flex justify-center  px-4">
      <div className="w-full max-w-screen-md">
        <div className="flex flex-col">
          {renderedQuestions}
        </div>
      </div>        
  </div>
  )
}
