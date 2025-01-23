import axios from "axios";
import React, { useEffect } from "react";
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

  useEffect(() => {
    axios
      .post<{ user: { avatarUrl: string } }>(`${BASE_URL}/proxy/load-user`, {
        id: userID,
      })
      .then((res) => {
        const data = res.data.user;
        if (data.avatarUrl === "") {
          dispatch(
            authActions.setAvatarUrl(
              "https://play-lh.googleusercontent.com/KE0R9mIrxZ37mTGD6IWW0Rjplj0bQrrencXfW9-jTAP-1MvFa6qNal8I6ufwYb2MDNo=w240-h480-rw"
            )
          );
        } else {
          dispatch(authActions.setAvatarUrl(data.avatarUrl));
        }
      })
      .catch((err) => {
        debug(err.message);
        toast.error("خطا در اتصال به سرور");
      });
  }, []);

  return <div>UserCard</div>;
};

export default UserCard;
