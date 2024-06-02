'use client';

import { Button } from '@nextui-org/react'
import React, { useState } from 'react'

import { signIn } from 'next-auth/react';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLAreaElement>{}

export default function UserAuthForm({className,...props}:UserAuthFormProps) {

    const [isLoading,setIsLoading] = useState<boolean>(false);

    async function loginWithGoogle(){
        setIsLoading(true);

        try{
            await signIn('google');

        }
        catch(error){

            console.log(error);

        }

    }

  return (
    <div >
         
         <Button onClick={loginWithGoogle} color="danger" type='submit' className='w-full'><h1 className='text-3xl'>G</h1>Sign In With Google</Button>

    </div>
  )
}
