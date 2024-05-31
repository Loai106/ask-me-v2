import Image from "next/image";
import { Avatar, Button } from "@nextui-org/react";

import AskQuestionForm from "@/components/profile/AskQuestionForm";
import ProfileEdit from "@/components/profile/ProfileEdit";
import ProfileNumbers from "@/components/profile/ProfileNumbers";

function ProfilePage() {
  return (
    <main className="container mx-auto flex flex-col  items-center w-full max-w-screen-md">
      <div className="bg-red-200 min-h-[150px] w-full"></div>
      <div className="p-4 w-full bg-white">
        <div className="flex justify-between w-full relative	">
          <div className="pl-2 flex flex-col justify-center">
            <Avatar
              className="absolute border-white border-2	"
              style={{
                top: -60,
                transform: "scale(1.5)",
              }}
              size="lg"
            />
            <p className="font-bold">ahmedfares_sh</p>
          </div>
          <ProfileNumbers />
        </div>
        <ProfileEdit />
        <AskQuestionForm />
      </div>
    </main>
  );
}

export default ProfilePage;
