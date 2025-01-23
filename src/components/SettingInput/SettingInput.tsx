import clsx from "clsx";
import React from "react";
import { useLatinToPersian } from "../../hooks/useLatinToPersian";

interface Option {
  label: string;
  value: string | number;
}

interface Props {
  title: string;
  options: Option[];
  onChange: (value: string | number) => void;
  selected: string | number;
}

const SettingInput = ({ title, options, onChange, selected }: Props) => {
  const latinToPersian = useLatinToPersian();

  return (
    <div className="mt-4 flex justify-between w-full select-none">
      <p className="text-xl">{title}</p>
      <div className="bg-black bg-opacity-50 rounded-full flex flex-row-reverse shadow-md">
        {options.map((option) => (
          <p
            onClick={() => onChange(option.value)}
            className={clsx("px-4 py-1 text-white transition-all", {
              ["bg-white text-black first:rounded-l-full last:rounded-r-full"]:
                selected === option.value,
            })}
          >
            {latinToPersian(String(option.value))}
          </p>
        ))}
      </div>
    </div>
  );
};

export default SettingInput;
