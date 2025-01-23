import React from "react";
import { useSelector } from "react-redux";
import { avatarSelector } from "../../../slices/user.selector";

interface Props {
  className?: string;
}

const Profile = ({ className }: Props) => {
  const avatarUrl = useSelector(avatarSelector);

  return (
    <div className={"h-100 bg-main_pink rounded-2xl " + className}>
      <div className="flex items-center p-4">
        <img src={avatarUrl} className="rounded-full w-[50px]" alt="profile" />
        <div className="text-white mr-2">
          <p className="font-bold text-md">Farbod bj</p>
          <p>تازه کار </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
