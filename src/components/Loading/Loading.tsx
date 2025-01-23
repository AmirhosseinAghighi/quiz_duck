import React, { useEffect, useState } from "react";
import pattern from "../../assets/pattern.svg";
import duck from "../../assets/duck-doctor.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../../slices/user.selector";
import axios from "axios";
import { authActions } from "../../slices/user.slice";
import useLogger from "../../hooks/useLogger";

interface Props {
  navigate?: boolean;
}

const Loading = ({ navigate = false }: Props) => {
  const [progress, setProgress] = useState(0);
  const [speed, setSpeed] = useState(1000);
  const navigateTo = useNavigate();
  const userData = useSelector(userSelector);
  const dispatch = useDispatch();
  const { debug } = useLogger();

  useEffect(() => {
    console.log("!@!", userData);
    if (navigate) {
      setTimeout(() => {
        setProgress(() => progress + 1);
        if (progress === 100) {
          if (userData.photo) {
            navigateTo("/home");
          } else {
            //@ts-ignore
            window.WebApp.close();
          }
        } else if (progress === 2) {
          setSpeed(50);
        } else if (progress === 50) {
          setSpeed(20);
        } else if (progress === 90) {
          setSpeed(250);
        }
      }, speed);
    }
  }, [progress]);

  useEffect(() => {
    axios
      .post<{ avatarUrl: string }>(
        "https://88e7-23-157-40-95.ngrok-free.app/proxy/load-user",
        {
          id: userData.id,
        }
      )
      .then((res) => {
        const data = res.data;
        console.log("!@! 2", res, data, res.data, data.avatarUrl);
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
        //@ts-ignore
        window.WebApp.close();
      });
  }, []);

  return (
    <div className="w-full h-[100dvh] bg-pattern bg-sky-blue flex justify-center items-center absolute top-0 left-0">
      <div className="flex flex-col justify-center items-center">
        <img src={duck} className="w-1/2 ml-12" />
        <h1 className="text-white font-bold text-3xl mt-2">درحال بارگزاری</h1>
        <h2 className="text-right w-1/2 font-bold mt-4 text-text-gray text-xl">
          آیا میدانستید؟
        </h2>
        <p className="text-right w-1/2 font-bold text-text-gray text-md">
          لورم ایپسوم، بله این یک متن من در آوردی است !
        </p>
        {navigate && (
          <div className="w-3/4 rounded-full h-2 bg-text-gray mt-4 flex flex-row-reverse">
            <div
              className={`h-2 rounded-full h-2 bg-white`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Loading;
