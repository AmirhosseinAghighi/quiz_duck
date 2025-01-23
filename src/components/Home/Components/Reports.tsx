import React from "react";
import { useLatinToPersian } from "../../../hooks/useLatinToPersian";

interface Props {
  className: string;
}

const Reports = ({ className }: Props) => {
  const latinToPersian = useLatinToPersian();
  const temp = [
    {
      title: "تعداد بازی ها",
      value: latinToPersian("2"),
    },
    {
      title: "تعداد برد ها",
      value: latinToPersian("2"),
    },
    {
      title: "تعداد باخت ها",
      value: latinToPersian("2"),
    },
    {
      title: "رتبه کل",
      value: latinToPersian("2"),
    },
  ];

  return (
    <div
      className={
        "flex flex-col justify-center items-center bg-main_blue rounded-lg text-white font-bold " +
        className
      }
    >
      <h1 className="text-2xl mt-2 mb-4">گزارش</h1>
      {temp.map((data) => (
        <div className="flex justify-between w-full px-2 text-md my-2">
          <p>{data.title}</p>
          <p>{data.value}</p>
        </div>
      ))}
    </div>
  );
};

export default Reports;
