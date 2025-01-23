import clsx from "clsx";
import React from "react";

interface Props {
  title: string;
  emoji: string;
  disabled: boolean;
  id: string;
  selected?: boolean;
  onSelect?: (value: string) => void;
}

const Category = ({
  title,
  emoji,
  disabled,
  id,
  selected = false,
  onSelect,
}: Props) => {
  return (
    <div
      className="w-max m-4 my-2 relative"
      onClick={!disabled ? () => onSelect?.(id) : undefined}
    >
      <p
        className={clsx(
          "p-4 bg-text-gray rounded-lg text-xl sm:text-3xl transition-all cursor-pointer",
          {
            ["p-5 bg-white"]: selected,
            ["after:bg-black after:bg-opacity-40 after:rounded-lg after:w-full after:h-full after:absolute after:top-0 after:left-0 cursor-not-allowed"]:
              disabled,
          }
        )}
      >
        {emoji}
      </p>
      <p className="text-md sm:text-xl text-center mt-1 sm:mt-2">{title}</p>
    </div>
  );
};

export default Category;
