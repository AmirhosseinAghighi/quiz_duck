import React, { useState } from "react";
import Category from "./Components/Category";
import SettingInput from "../SettingInput/SettingInput";
import { toast } from "react-toastify";
import axios from "axios";
import { useSelector } from "react-redux";
import { gameModeSelector } from "../../slices/room/room.selector";
import { userSelector } from "../../slices/user/user.selector";

// const Categories = {
//   ["sport"]: {
//     title: "ورزشی",
//     emoji: "⚽",
//   },
//   ["technology"]: {
//     title: "تکنولوژی",
//     emoji: "💻",
//   },
//   ["music"]: {
//     title: "موسیقی",
//     emoji: "🎵",
//   },
//   ["food"]: {
//     title: "غذا",
//     emoji: "🍔",
//   },
//   ["travel"]: {
//     title: "سفر",
//     emoji: "✈️",
//   },
//   ["health"]: {
//     title: "سلامتی",
//     emoji: "🏥",
//   },
//   ["education"]: {
//     title: "آموزش",
//     emoji: "📚",
//   },
//   ["art"]: {
//     title: "هنر",
//     emoji: "🎨",
//   },
//   ["fashion"]: {
//     title: "مد",
//     emoji: "👗",
//   },
//   ["science"]: {
//     title: "علم",
//     emoji: "🔬",
//   },
// };

const Categories = {
  ["1"]: {
    title: "ریاضی",
    emoji: "🖋️",
    disabled: false,
  },
  ["2"]: {
    title: "ادبیات",
    emoji: "📚",
    disabled: false,
  },
  ["3"]: {
    title: "عمومی",
    emoji: "🗺️",
    disabled: false,
  },
  ["food"]: {
    title: "غذا",
    emoji: "🍔",
    disabled: true,
  },
  ["travel"]: {
    title: "سفر",
    emoji: "✈️",
    disabled: true,
  },
  ["health"]: {
    title: "سلامتی",
    emoji: "🏥",
    disabled: true,
  },
  ["education"]: {
    title: "آموزش",
    emoji: "📚",
    disabled: true,
  },
  ["art"]: {
    title: "هنر",
    emoji: "🎨",
    disabled: true,
  },
  ["fashion"]: {
    title: "مد",
    emoji: "👗",
    disabled: true,
  },
  ["science"]: {
    title: "علم",
    emoji: "🔬",
    disabled: true,
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
  const gameMode = useSelector(gameModeSelector);
  const userData = useSelector(userSelector);

  const handleSubmit = () => {
    if (selectedCategories.length === 0) {
      toast.error("لطفا حداقل یک دسته بندی را انتخاب کنید");
      return;
    }

    axios
      .post("duck.farbod.tech/create-room", {
        max_players: gameMode === "2v2" ? 2 : 1000,
        creator_id: userData.id,
        duration: selectedTime,
        category: selectedCategories[0],
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch(() => {
        toast.error("خطا در اتصال به سرور");
      });
  };

  return (
    <div className="bg-main_yellow flex flex-col justify-center items-center p-4 px-4 rounded-xl">
      <h1 className="font text-md mb-2">
        لطفا دسته بندی های سوالات را انتخاب کنید
      </h1>
      <div className="flex flex-wrap justify-center">
        {categoriesArray.map((category) => (
          <Category
            title={category.title}
            emoji={category.emoji}
            disabled={category.disabled}
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

      <button
        className="bg-main_pink mt-10 w-full text-white rounded-3xl py-4 font-bold text-xl"
        onClick={handleSubmit}
      >
        شروع
      </button>
    </div>
  );
};

export default CreateGame;
