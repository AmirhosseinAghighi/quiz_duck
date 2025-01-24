import React, { useEffect, useState } from "react";
import sadDuck from "../../assets/sadDuck.gif";
import axios from "axios";
import { gameData } from "../../slices/room/room.slice";
import { BASE_URL } from "../../constants";
import { useSelector } from "react-redux";
import { userSelector } from "../../slices/user/user.selector";
import { gameDataSelector } from "../../slices/room/room.selector";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import UserCard from "../Lobby/components/UserCard";

type userScore = { user_id: number; score: number };

const Winner = () => {
  const gameData = useSelector(gameDataSelector);
  const userData = useSelector(userSelector);
  const navigate = useNavigate();
  const [isGameFinished, setIsGameFinished] = useState<boolean>(false);
  const [scores, setScores] = useState<userScore[] | undefined>();

  useEffect(() => {
    let failureCounter = 0;
    const interval = setInterval(() => {
      axios
        .get<{
          player_list: number[];
          time_remaining: number;
          status: gameData["status"];
        }>(`${BASE_URL}/room-status/${gameData?.id ?? "4904d30f"}`)
        .then(({ data }) => {
          if (data.status === "completed") {
          } else if (data.status !== "active") {
            clearInterval(interval);
            toast.error("خطا در سرور");
            navigate("/home");
          }
        })
        .catch(() => {
          failureCounter++;
          if (failureCounter >= 3) {
            toast.error("خطا در اتصال به سرور");
            clearInterval(interval);
            navigate("/home");
          }
        });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (isGameFinished && gameData) {
      axios
        .get<userScore[]>(`${BASE_URL}/room-leaderboard/${gameData.id}`)
        .then(({ data }) => {
          setScores(data.sort((a, b) => a.score - b.score));
        })
        .catch(() => {
          toast.error("خطا در اتصال به سرور");
          navigate("/home");
        });
    }
  }, [isGameFinished]);

  return (
    <div className="w-full h-[100dvh] bg-pattern bg-sky-blue flex flex-col justify-center items-center absolute top-0 left-0">
      {scores && scores.length > 0 ? (
        <>
          {scores.map((data) => (
            <UserCard userID={data.user_id} score={data.score} />
          ))}

          <button
            className="px-4 pb-2 py-1 text-xl text-white bg-main_pink absolute bottom-10 rounded-lg"
            onClick={() => navigate("/home")}
          >
            برگشت به خانه
          </button>
        </>
      ) : (
        <>
          <h1 className="text-white font-bold text-2xl">
            خیلی زود جواب دادی !
          </h1>
          <h2 className="text-white font-bold text-lg">
            صبر کن تا دوستاتم جواب بدن
          </h2>
          <img src={sadDuck} className="w-1/2" />
        </>
      )}
    </div>
  );
};

export default Winner;
