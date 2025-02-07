import { ToggleComponent } from "@/components";
import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "@/axios";
import { adminLogin } from "@/store/adminLogin";
import { transliterationMap } from "@/common";

const MainPageFexp = () => {
  const [isActive, setIsActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sum, setSum] = useState("");
  const [expence, setExpence] = useState("");
  const [number, setNumber] = useState("");

  const onlyEnglish = (
    value: string,
    setState: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const symb = value[value.length - 1];
    const transliterationKeys = Object.keys(transliterationMap);

    if (transliterationKeys.includes(symb)) {
      const resVal =
        value.slice(0, value.length - 1) + transliterationMap[symb];

      setState(resVal);
    } else {
      setState(value);
    }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (loading) {
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post("/fExp", {
        sum,
        expence,
        user: localStorage.getItem("pultik-user-login"),
      });

      if (res.status !== 200) {
        throw Error();
      }
      setSum("");
      setExpence("");
      toast.success("Данные отправлены");
    } catch (error) {
      toast.error("Не удалось отправить данные");
    } finally {
      setLoading(false);
    }
  };

  const postNumber = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post("/printLbl", {
        message: number,
        user: localStorage.getItem("pultik-user-login"),
      });

      if (res.status == 200) {
        console.log(res.data);

        alert(res.data.message);
      }
    } catch (error) {
      alert("Не удалось отправить данные");
    }
  };

  return (
    <div className="flex justify-start items-center gap-6 mt-3 main_page_fexp">
      <ToggleComponent
        onClick={() =>
          localStorage.getItem("pultik-user-login") == adminLogin
            ? setIsActive(!isActive)
            : alert("Вы не имеете доступа")
        }
        isOpened={isActive}
        className={"mt-4"}
      />
      <form className="additional_expense" onSubmit={submit}>
        <input
          type="number"
          placeholder="Сумма"
          value={sum}
          onChange={(e) => setSum(e.target.value)}
          disabled={!isActive}
          style={{ marginTop: 0, height: "auto" }}
        />
        <input
          type="text"
          placeholder="Расход"
          value={expence}
          onChange={(e) => onlyEnglish(e.target.value,setExpence)}
          disabled={!isActive}
          style={{ marginTop: 0, height: "auto" }}
        />
        <button
          type="submit"
          className="btn !w-[250px] disabled:opacity-30"
          disabled={loading || !isActive}
        >
          Доб. расход
        </button>
      </form>
      <form className="number_form" onSubmit={postNumber} >
        <input
          type="text"
          placeholder="Номер"
          value={number}
          onChange={(e) =>onlyEnglish(e.target.value,setNumber)}
        />
        <button type="submit" className="btn !w-[250px] disabled:opacity-30">
          Отгрузить
        </button>
      </form>
    </div>
  );
};

export default MainPageFexp;
