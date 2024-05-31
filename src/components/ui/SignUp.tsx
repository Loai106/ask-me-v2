"use client";
import { Button } from '@nextui-org/react'
import { signOut } from 'next-auth/react';
import React from 'react'

export default function SignUp() {
  return (
        <Button onClick={(e)=>{
            e.preventDefault();
            signOut({
                callbackUrl:`${window.location.origin}/sign-in`,
            })
        }} color='danger'>Sign Out</Button>

)
}
