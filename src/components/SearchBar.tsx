'use client';
import { Input } from '@nextui-org/react'
import { Prisma, User } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { SearchIcon } from 'lucide-react'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import {Listbox, ListboxItem, Chip, ScrollShadow, Avatar} from "@nextui-org/react";
import { ListboxWrapper } from './ui/ListboxWrapper';
import debounce from 'lodash.debounce'
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useOnClickOutside } from '@/hooks/use-on-click-outside';


interface SearchBarProps {}

export default function SearchBar({}:SearchBarProps) {


const commandRef = useRef<HTMLDivElement>(null)
const pathname = usePathname()
const router = useRouter()

 const [input ,setInput] = useState<string>('');    

 const {
    isFetching,
    data: queryResults,
    refetch,
    isFetched,
  } = useQuery({
    queryFn: async ()=>{
        if(!input) return [];
        const {data} = await axios.get(`/api/search?q=${input}`);

        return data as (User & {
            _count : Prisma.UserCountOutputType
          })[]

    },
    queryKey: ['search-query'],
    enabled:false,

 })

 useOnClickOutside(commandRef, () => {
  setInput('')
})

useEffect(() => {
  setInput('')
}, [pathname])


 const request = debounce(()=>{
    refetch()
 },300);

 const debounceRequest = useCallback(()=>{
    request()
},[]);



 


  return (
    <div     ref={commandRef}
    ><Input
    value={input}
    onChange={(e)=>{
        setInput(e.target.value);
        debounceRequest();

    }}
    placeholder="Search"
    size="sm"
    type="email"
    startContent={
      <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
    }
  />
  {
    input.length  > 0 && (
        <ListboxWrapper >
        <Listbox >
                    {queryResults  ?
                    (
                        queryResults?.map((user)=> <ListboxItem key={user.id}><Link href={`/${user.id}`}><Avatar src={user.image||""}/><p>{user.name}</p></Link></ListboxItem>)
                    ) : 
                    <ListboxItem key="not">Not</ListboxItem>

                    }
                    
            </Listbox>
        </ListboxWrapper>
    ) 
  }
  </div>
  )
}
