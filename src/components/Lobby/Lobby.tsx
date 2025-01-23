import React, { useEffect, useState } from "react";
import walkingDuck from "../../assets/walking-duck.gif";
import { useLatinToPersian } from "../../hooks/useLatinToPersian";
import UserCard from "./components/UserCard";
import axios from "axios";
import { BASE_URL } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import { gameDataSelector } from "../../slices/room/room.selector";
import { roomActions } from "../../slices/room/room.slice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { userSelector } from "../../slices/user/user.selector";

const Lobby = () => {
  const latinToPersian = useLatinToPersian();
  const gameData = useSelector(gameDataSelector);
  const userData = useSelector(userSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [timeRemaining, setTimeRemaining] = useState<number | undefined>(
    undefined
  );

  useEffect(() => {
    const interval = setInterval(() => {
      axios
        .get(`${BASE_URL}/room-status/${gameData?.id ?? "95922072"}`)
        .then((res) => {
          setTimeRemaining(Math.floor(res.data.time_remaining));
          if (res.data.status === "ready") {
            clearInterval(interval);
          }
        })
        .catch(() => {
          toast.error("خطا در اتصال به سرور");
        });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleStartGame = () => {
    axios
      .post<{ status: "waiting" | "ready" | "active"; start_time: number }>(
        `${BASE_URL}/start-game/${gameData?.id}`
      )
      .then((res) => {
        dispatch(roomActions.setGameStatus(res.data.status));
        dispatch(roomActions.setGameStartTime(res.data.start_time));
        //TODO: get questions after starting game
        navigate("/question");
      })
      .catch(() => {
        toast.error("خطا در اتصال به سرور");
      });
  };

  return (
    <div className="w-full h-[100dvh] bg-pattern bg-sky-blue flex justify-center items-center absolute top-0 left-0">
      <div className="flex flex-col justify-center items-center">
        <img src={walkingDuck} alt="loading-gif" />
        <h1 className="text-3xl font-bold text-white">
          {timeRemaining
            ? `${latinToPersian(String(timeRemaining))} ثانیه تا شروع بازی`
            : "در حال دریافت اطلاعات"}
        </h1>

        {/* <div className="flex flex-col justify-start items-center">
          <UserCard />
        </div> */}

        {userData.id === gameData?.host_id && (
          <button
            className="px-4 pb-2 py-1 text-xl text-white bg-main_pink absolute bottom-10 rounded-lg"
            onClick={handleStartGame}
          >
            شروع بازی
          </button>
        )}
      </div>
    </div>
  );
};

export default Lobby;
