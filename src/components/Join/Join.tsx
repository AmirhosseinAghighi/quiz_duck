import React, { useEffect, useState } from "react";
import walkingDuck from "../../assets/walking-duck.gif";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { BASE_URL } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../../slices/user/user.selector";
import { roomActions } from "../../slices/room/room.slice";

const Join = () => {
  const [params] = useSearchParams();
  const code = params.get("code");
  const [gameNotFound, setGameNotFound] = useState(false);
  const userData = useSelector(userSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!code) setGameNotFound(true);
    axios
      .post(`${BASE_URL}/join-room`, {
        username: userData.username,
        room_id: code,
      })
      .then((res) => {
        if (!code) {
          setGameNotFound(true);
          return;
        }
        dispatch(roomActions.setGameID(code));
        setGameNotFound(false);
        navigate("/lobby");
      })
      .catch(() => {
        setGameNotFound(true);
      });
  }, [code, userData]);

  if (!gameNotFound) {
    toast.error("بازی پیدا نشد");
    return <Navigate to={"/home"} />;
  }

  return (
    <div className="w-full h-[100dvh] bg-pattern bg-sky-blue flex justify-center items-center absolute top-0 left-0">
      <div className="flex flex-col justify-center items-center">
        <img src={walkingDuck} alt="loading-gif" />
        <h1 className="text-3xl font-bold text-white">
          در حال دریافت اطلاعات بازی
        </h1>
      </div>
    </div>
  );
};

export default Join;
