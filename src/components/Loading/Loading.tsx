import React, { useEffect, useState } from "react";
import pattern from "../../assets/pattern.svg";
import duck from "../../assets/duck-doctor.png";
import { useNavigate } from "react-router-dom";

interface Props {
  navigate?: boolean;
}

const Loading = ({ navigate = false }: Props) => {
  const [progress, setProgress] = useState(0);
  const [speed, setSpeed] = useState(1000);
  const navigateTo = useNavigate();

  useEffect(() => {
    if (navigate) {
      setTimeout(() => {
        setProgress(() => progress + 1);
        if (progress === 100) {
          navigateTo("/home");
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
