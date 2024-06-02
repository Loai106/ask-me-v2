import React from "react";
export const ListboxWrapper = ({children}: { children: React.ReactNode }) => (
    <div className="absolute bg-white top-full inset-x-0 shadow rounded-b-md">
    {children}
  </div>
);
