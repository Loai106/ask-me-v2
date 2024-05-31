'use client';


import { Button, Input } from '@nextui-org/react';
import React from 'react'
import UserAuthForm from './UserAuthForm';

export default function SignIn() {
  return (

<div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
  <div className="w-full max-w-screen-md">
    <div className="flex flex-col gap-10 justify-center items-center h-full mt-[-30%]">
      <h1 className="text-5xl font-bold text-center">AskMe</h1>
        <UserAuthForm/>

    </div>
  </div>
</div>
)
}
