import { MdOutlineModeEditOutline } from "react-icons/md";
import { HiDotsHorizontal } from "react-icons/hi";
import { Button } from "@nextui-org/react";
function ProfileEdit() {
  return (
    <div className="flex gap-2 my-2">
      <Button className="flex-grow bg-red-400 text-white ">Share Page</Button>
      <Button>
        <MdOutlineModeEditOutline />
      </Button>
      <Button>
        <HiDotsHorizontal />
      </Button>
    </div>
  );
}

export default ProfileEdit;
