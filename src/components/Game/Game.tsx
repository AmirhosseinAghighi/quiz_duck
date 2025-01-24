import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import {
  gameDataSelector,
  gameQuestionDuration,
  gameQuestionsSelector,
} from "../../slices/room/room.selector";
import { Question } from "../../slices/room/room.slice";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import clsx from "clsx";
import axios from "axios";
import { BASE_URL } from "../../constants";
import { userSelector } from "../../slices/user/user.selector";

const Game = () => {
  const gameData = useSelector(gameDataSelector);
  const userData = useSelector(userSelector);
  const questions = useSelector(gameQuestionsSelector);
  const questionDuration = useSelector(gameQuestionDuration);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [startedTime, setStartedTime] = useState(new Date().getTime());
  const [timeLeft, setTimeLeft] = useState(100);
  const [disable, setDisable] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<"A" | "B" | "C" | "D">();
  const [correctAnswer, setCorrectAnswer] = useState<"A" | "B" | "C" | "D">();
  const navigate = useNavigate();

  if (!questions) {
    toast.error("خطا در دریافت سوالات");
    return <Navigate to={"/home"} />;
  }

  const question = useMemo(() => {
    return questions[currentQuestionIndex];
  }, [currentQuestionIndex]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const currentTime = new Date().getTime();
      const diff = currentTime - startedTime;
      if (diff >= (questionDuration ?? 10) * 1000) {
        console.log("next", diff, currentTime, startedTime);
        nextQuestion();
      } else {
        setTimeLeft(100 - diff / (10 * (questionDuration ?? 10)));
      }
    }, 10);

    return () => clearTimeout(timeout);
  }, [timeLeft]);

  const nextQuestion = () => {
    if (!questions) return;
    if (currentQuestionIndex + 1 < questions.length) {
      setDisable(true);
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setStartedTime(new Date().getTime());
        setTimeLeft(100);
        setDisable(false);
        setCorrectAnswer(undefined);
        setSelectedAnswer(undefined);
      }, 1000);
    } else {
      setTimeout(() => {
        navigate("/winner");
      }, 1000);
    }
  };

  const submitQuestion = (answer: "A" | "B" | "C" | "D") => {
    if (!disable) {
      setDisable(true);
      setSelectedAnswer(answer);
      const questionIndex = currentQuestionIndex;
      axios
        .post<{ is_correct: boolean; correct_answer: "A" | "B" | "C" | "D" }>(
          `${BASE_URL}/submit-answer/${gameData?.id}/${userData.id}`,
          {
            question_id: question.id,
            selected_option: answer,
          }
        )
        .then((res) => {
          console.log("!@!", res.data.correct_answer);
          setCorrectAnswer(res.data.correct_answer);
          if (questionIndex === currentQuestionIndex) {
            nextQuestion();
          }
        })
        .catch(() => {});
    }
  };

  return (
    <div className="flex flex-col items-center">
      <p className="w-full max-h-1/2 bg-dark-sky-blue text-center text-white font-bold text-xl p-2 rounded-xl">
        {question?.question_text}
      </p>

      <div className="w-full bg-gray-300 bg-opacity-50 mt-2 rounded-full flex-row-reverse">
        <div
          className={clsx("h-2 rounded-full", {
            ["bg-blue"]: timeLeft >= 50,
            ["bg-main_yellow"]: timeLeft >= 25 && timeLeft < 50,
            ["bg-dark_orange"]: timeLeft < 25,
          })}
          style={{ width: `${timeLeft}%` }}
        ></div>
      </div>

      <div className="flex flex-col justify-start items-center w-full text-center text-white  text-xl mt-5">
        <p
          className={clsx(
            "w-full bg-dark-sky-blue p-2 rounded-lg m-4 cursor-pointer",
            {
              ["bg-gray-700 bg-opacity-45"]: disable,
              ["bg-main_green text-black !bg-opacity-100"]:
                correctAnswer === "A",
              ["bg-main_red !bg-opacity-100"]:
                correctAnswer &&
                selectedAnswer === "A" &&
                selectedAnswer !== correctAnswer,
            }
          )}
          onClick={() => submitQuestion("A")}
        >
          {question.option_a}
        </p>
        <p
          className={clsx(
            "w-full bg-dark-sky-blue p-2 rounded-lg m-4 cursor-pointer",
            {
              ["bg-gray-700 bg-opacity-45"]: disable,
              ["bg-main_green text-black !bg-opacity-100"]:
                correctAnswer === "B",
              ["bg-main_red !bg-opacity-100"]:
                correctAnswer &&
                selectedAnswer === "B" &&
                selectedAnswer !== correctAnswer,
            }
          )}
          onClick={() => submitQuestion("B")}
        >
          {question.option_b}
        </p>
        <p
          className={clsx(
            "w-full bg-dark-sky-blue p-2 rounded-lg m-4 cursor-pointer",
            {
              ["bg-gray-700 bg-opacity-45"]: disable,
              ["bg-main_green text-black !bg-opacity-100"]:
                correctAnswer === "C",
              ["bg-main_red !bg-opacity-100"]:
                correctAnswer &&
                selectedAnswer === "C" &&
                selectedAnswer !== correctAnswer,
            }
          )}
          onClick={() => submitQuestion("C")}
        >
          {question.option_c}
        </p>
        {question.option_d && (
          <p
            className={clsx(
              "w-full bg-dark-sky-blue p-2 rounded-lg m-4 cursor-pointer",
              {
                ["bg-gray-700 bg-opacity-45"]: disable,
                ["bg-main_green text-black !bg-opacity-100"]:
                  correctAnswer === "D",
                ["bg-main_red !bg-opacity-100"]:
                  correctAnswer &&
                  selectedAnswer === "D" &&
                  selectedAnswer !== correctAnswer,
              }
            )}
            onClick={() => submitQuestion("D")}
          >
            {question.option_d}
          </p>
        )}
      </div>
    </div>
  );
};

export default Game;
