import clsx from "clsx";
import React from "react";

interface Props {
  title: string;
  emoji: string;
  id: string;
  selected?: boolean;
  onSelect?: (value: string) => void;
}

const Category = ({ title, emoji, id, selected = false, onSelect }: Props) => {
  return (
    <div className="w-max m-4 my-2" onClick={() => onSelect?.(id)}>
      <p
        className={clsx(
          "p-4 bg-text-gray rounded-lg text-3xl transition-all cursor-pointer",
          {
            ["p-5 !bg-white"]: selected,
          }
        )}
      >
        {emoji}
      </p>
      <p className="text-xl text-center mt-2">{title}</p>
    </div>
  );
};

export default Category;
