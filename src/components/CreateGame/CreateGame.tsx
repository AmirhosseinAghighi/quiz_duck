import React, { useState } from "react";
import Category from "./Components/Category";
import SettingInput from "../SettingInput/SettingInput";

const Categories = {
  ["sport"]: {
    title: "ورزشی",
    emoji: "⚽",
  },
  ["technology"]: {
    title: "تکنولوژی",
    emoji: "💻",
  },
  ["music"]: {
    title: "موسیقی",
    emoji: "🎵",
  },
  ["food"]: {
    title: "غذا",
    emoji: "🍔",
  },
  ["travel"]: {
    title: "سفر",
    emoji: "✈️",
  },
  ["health"]: {
    title: "سلامتی",
    emoji: "🏥",
  },
  ["education"]: {
    title: "آموزش",
    emoji: "📚",
  },
  ["art"]: {
    title: "هنر",
    emoji: "🎨",
  },
  ["fashion"]: {
    title: "مد",
    emoji: "👗",
  },
  ["science"]: {
    title: "علم",
    emoji: "🔬",
  },
};

const categoriesArray = Object.entries(Categories).map(([key, value]) => ({
  id: key,
  ...value,
}));

const settings = {
  ["time"]: {
    title: "مهلت پاسخ هر سوال",
    options: [
      {
        label: "10",
        value: 10,
      },
      {
        label: "15",
        value: 15,
      },
      {
        label: "20",
        value: 20,
      },
    ],
  },
  ["count"]: {
    title: "تعداد سوالات",
    options: [
      {
        label: "5",
        value: 5,
      },
      {
        label: "10",
        value: 10,
      },
      {
        label: "15",
        value: 15,
      },
    ],
  },
};

const CreateGame = () => {
  const [selectedTime, setSelectedTime] = useState<number | string>(10);
  const [selectedCount, setSelectedCount] = useState<number | string>(5);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  return (
    <div className="bg-main_yellow flex flex-col justify-center items-center p-4 px-4 rounded-xl">
      <div className="flex flex-wrap justify-center">
        {categoriesArray.map((category) => (
          <Category 
            title={category.title}
            emoji={category.emoji}
            id={category.id}
            selected={selectedCategories.includes(category.id)}
            onSelect={() =>
              setSelectedCategories((categories) => {
                if (categories.includes(category.id)) {
                  return categories.filter((id) => id !== category.id);
                } else {
                  return [...categories, category.id];
                }
              })
            }
          />
        ))}
      </div>

      <div className="w-full flex flex-col justify-center items-center">
        <SettingInput
          {...settings["time"]}
          onChange={(value) => setSelectedTime(value)}
          selected={selectedTime}
        />
        <SettingInput
          {...settings["count"]}
          onChange={(value) => setSelectedCount(value)}
          selected={selectedCount}
        />
      </div>

      <button className="bg-main_pink mt-20 w-full text-white rounded-full py-4 font-bold text-xl">
        شروع
      </button>
    </div>
  );
};

export default CreateGame;
