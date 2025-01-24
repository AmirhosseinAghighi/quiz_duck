import React, { useEffect, useState } from "react";
import walkingDuck from "../../assets/walking-duck.gif";
import { useLatinToPersian } from "../../hooks/useLatinToPersian";
import UserCard from "./components/UserCard";
import axios from "axios";
import { BASE_URL } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import { gameDataSelector } from "../../slices/room/room.selector";
import { gameData, roomActions } from "../../slices/room/room.slice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { userSelector } from "../../slices/user/user.selector";
import { FaCopy } from "react-icons/fa";

const Lobby = () => {
  const latinToPersian = useLatinToPersian();
  const gameData = useSelector(gameDataSelector);
  const userData = useSelector(userSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [timeRemaining, setTimeRemaining] = useState<number | undefined>(
    undefined
  );
  const [playersList, setPlayersList] = useState<number[]>([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    let failureCounter = 0;
    const interval = setInterval(() => {
      axios
        .get<{
          player_list: number[];
          time_remaining: number;
          status: gameData["status"];
        }>(`${BASE_URL}/room-status/${gameData?.id ?? "313a897d"}`)
        .then((res) => {
          setTimeRemaining(Math.floor(res.data.time_remaining));
          setPlayersList(res.data.player_list);
          setStatus(res.data.status);
          if (res.data.status === "ready") {
            setTimeRemaining(0);
            clearInterval(interval);
          }
        })
        .catch(() => {
          failureCounter++;
          if (failureCounter >= 3) {
            toast.error("خطا در اتصال به سرور");
            clearInterval(interval);
            // navigate("/home");
          }
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

  const handleCopyCode = () => {
    if (!gameData) return;
    navigator.clipboard.writeText(gameData?.id);
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

        {gameData && status === "waiting" && (
          <div
            className="bg-black bg-opacity-50 p-2 rounded-md flex flex-row-reverse justify-center items-center gap-2 mt-4 cursor-copy"
            onClick={handleCopyCode}
          >
            <p className="bg-white bg-opacity-50 px-4 rounded-md">
              {gameData?.id}
            </p>
            <FaCopy className="text-white" />
          </div>
        )}

        {playersList.map((userID) => (
          <div className="flex flex-col justify-start items-center">
            <UserCard userID={userID} />
          </div>
        ))}

        {userData.id === gameData?.host_id && status === "ready" && (
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
