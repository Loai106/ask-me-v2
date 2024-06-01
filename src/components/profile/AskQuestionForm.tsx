'use client';
import { Button, Textarea, Switch } from "@nextui-org/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {useMutation} from '@tanstack/react-query';
import { QuestionCreationRequest } from "@/lib/validators/question";
import axios, { AxiosError } from 'axios';
import { toast } from '@/hooks/use-toast'


function AskQuestionForm() {

  const [input,setInput] = useState<string>('');
  const [isAnon, setIsAnon] = useState<boolean>(false);
  const router = useRouter();

  const {mutate: createQuestion , isPending} = useMutation({
    mutationFn: async ()=>{
      const payload : QuestionCreationRequest = {
        content:input,
        isAnonymous:isAnon,
      }

    

      const {data} = await axios.post('/api/questions',payload);
      return data as string;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 409) {
          return toast({
            title: 'Subreddit already exists.',
            description: 'Please choose a different name.',
            variant: 'destructive',
          })
        }

        if (err.response?.status === 422) {
          return toast({
            title: 'Invalid subreddit name.',
            description: 'Please choose a name between 3 and 21 letters.',
            variant: 'destructive',
          })
        }

        // if (err.response?.status === 401) {
        //   return loginToast()
        // }
      }

      toast({
        title: 'There was an error.',
        description: 'Could not create subreddit.',
        variant: 'destructive',
      })
    },
    
   
  })


  return (
    <form action={()=> createQuestion()}>
      <Textarea value={input} name="question" placeholder="Ask a Question!" onChange={(e)=> setInput(e.target.value)} />
      <div className="my-2 flex justify-between">
        <Button  type="submit" isDisabled={input.length===0}  isLoading={isPending} className="bg-red-400 text-white">Ask anonymously</Button>
        <Switch isSelected={isAnon} onValueChange={setIsAnon} color="danger"></Switch>
      </div>
    </form>
  );
}

export default AskQuestionForm;
function userRouter() {
  throw new Error("Function not implemented.");
}

