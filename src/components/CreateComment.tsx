"use client";
import { CommentRequest } from "@/lib/validators/comment";
import { Textarea, Button } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface CreateCommentProps {
  postId: string;
  replyToId?: string;
  isSession: boolean;
}

export default function CreateComment({
  postId,
  replyToId,
  isSession,
}: CreateCommentProps) {
  const [input, setInput] = useState<string>("");
  const router = useRouter();
  const { mutate: createComment, isPending } = useMutation({
    mutationFn: async ({ postId, text, replyToId }: CommentRequest) => {
      if (!isSession) {
        return;
      }
      const payload: CommentRequest = {
        postId,
        text,
        replyToId,
      };

      const { data } = await axios.patch("/api/questions/comment", payload);
      return data;
    },
    onSuccess: () => {
      router.refresh();
      setInput("");
    },
  });

  return (
    <div className="grid w-full gap-1.5">
      <div className="mt-2">
        <Textarea
          color="danger"
          label="Your Comment"
          placeholder="write a comment "
          id="comment"
          value={input}
          rows={1}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
      <div className="mt-2 flex justify-end">
        <Button
          isLoading={isPending}
          disabled={input.length === 0}
          color="danger"
          onClick={(e) => createComment({ postId, text: input, replyToId })}
        >
          Comment
        </Button>
      </div>
    </div>
  );
}
