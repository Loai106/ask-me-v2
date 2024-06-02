import CommentSection from "@/components/CommentSection";
import React from "react";

interface PageProps {
  params: {
    postId: string;
  };
}

export default function page({ params }: PageProps) {
  return (
    <div className="my-4 flex justify-center  px-4">
      <div className="w-full max-w-screen-md">
        <div className="flex flex-col">
          <div>
            <CommentSection postId={params.postId} />
          </div>
        </div>
      </div>
    </div>
  );
}
