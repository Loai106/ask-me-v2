
import { Comment , User } from '@prisma/client'
import {User as UserAvatar} from "@nextui-org/react"
import { formatTimeToNow } from '@/lib/utils'
type ExtendedComment = Comment & {
    author : User
}
interface PostCommentProps {

    comment : ExtendedComment
}


export default function PostComments({comment} : PostCommentProps) {

    

  return (
    <div className='flex flex-col'>
        <div className='flex items-center'>
            <UserAvatar 
            className='h-6 w-6'
            name={comment.author.name}
            avatarProps={{
              src: comment.author.image  || ""
            }
            }
            />
            <div className='ml-2 flex items-center gap-x-2'>
                <p className='max-h-40 truncate text-xs text-zinc-500'>
                    {formatTimeToNow(new Date(comment.createdAt))}
                </p>
            </div>

        </div>
        <p className='text-sm text-zinc-900 mt-2'>{comment.text}</p>
    </div>
)
}
