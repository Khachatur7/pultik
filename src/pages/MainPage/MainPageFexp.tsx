import { ToggleComponent } from "@/components";
import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "@/axios";
import { adminLogin } from "@/store/adminLogin";

const MainPageFexp = () => {
  const [isActive, setIsActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sum, setSum] = useState("");
  const [expence, setExpence] = useState("");

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

  return (
    <div className="flex items-center gap-4 mt-3 main_page_fexp">
      <ToggleComponent
        onClick={() =>
          localStorage.getItem("pultik-user-login") == adminLogin
            ? setIsActive(!isActive)
            : alert("Вы не имеете доступа")
        }
        isOpened={isActive}
        className={"mt-4"}
      />
      <form className="input__wrapper flex gap-4" onSubmit={submit}>
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
          onChange={(e) => setExpence(e.target.value)}
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
    </div>
  );
};

export default MainPageFexp;
