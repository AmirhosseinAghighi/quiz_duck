import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../../constants";
import { useDispatch } from "react-redux";
import { authActions } from "../../../slices/user/user.slice";
import useLogger from "../../../hooks/useLogger";
import { toast } from "react-toastify";

interface Props {
  userID: number;
}

const UserCard = ({ userID }: Props) => {
  const dispatch = useDispatch();
  const { debug } = useLogger();
  const [userAvatar, setUserAvatar] = useState<string | undefined>();
  const [userFirstName, setUserFirstName] = useState<string | undefined>();
  console.log("!@!", userID);

  useEffect(() => {
    axios
      .post<{ user: { avatarUrl: string; title: string } }>(
        `${BASE_URL}/proxy/load-user`,
        {
          id: userID,
        }
      )
      .then((res) => {
        const data = res.data.user;
        if (data.avatarUrl === "") {
          setUserAvatar(
            "https://play-lh.googleusercontent.com/KE0R9mIrxZ37mTGD6IWW0Rjplj0bQrrencXfW9-jTAP-1MvFa6qNal8I6ufwYb2MDNo=w240-h480-rw"
          );
        } else {
          setUserAvatar(data.avatarUrl);
        }
        setUserFirstName(data.title);
      })
      .catch((err) => {
        debug(err.message);
      });
  }, [userID]);

  if (!userAvatar && !userFirstName) {
    return <></>;
  }

  return (
    <div className="bg-black bg-opacity-50 text-white flex rounded-full w-full gap-2 justify-start items-center mt-1">
      <img
        src={userAvatar}
        alt="player-profile"
        className="w-[40px] h-[40px] rounded-full"
      />
      <p>{userFirstName}</p>
    </div>
  );
};

export default UserCard;
