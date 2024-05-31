import React from "react";

function ProfileNumbers() {
  return (
    <div className="flex gap-4 justify-end text-center">
      <div>
        <span className="text-large font-semibold">2</span>
        <p>Followers</p>
      </div>
      <div>
        <span className="text-large font-semibold">2</span>
        <p>Answers</p>
      </div>
      <div>
        <span className="text-large font-semibold">2</span>
        <p>Following</p>
      </div>
    </div>
  );
}

export default ProfileNumbers;
