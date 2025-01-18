import { ComValueType } from "@/types/api";
import axios from "@/axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ToggleComponent from "../ToggleComponent";
import { adminLogin } from "@/store/adminLogin";
import PopupExit from "../PopupExit.tsx";
import { useNavigate } from "react-router-dom";

interface CircleModalComponentLeftProps {
  comValue?: ComValueType;
  boolValue: number;
  sku: string;
  basePrice: number;
  wBar: string;
  returnMode?: boolean;
  copy: boolean;
  ind: number;
  setCopy: React.Dispatch<React.SetStateAction<boolean>>;
  setXalturaParent: React.Dispatch<any>;
  fullName:string
}

const CircleModalComponentLeft: React.FC<CircleModalComponentLeftProps> = ({
  comValue,
  sku,
  basePrice,
  wBar,
  returnMode,
  copy,
  ind,
  setCopy,
  setXalturaParent,
  fullName
}) => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const [exitHover, setExitHover] = useState(false);
  const [price, setPrice] = useState(basePrice.toString());
  const [xaltura, setXaltura] = useState(
    JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem(`${sku}`)))) ||
      false
  );
  const [index, setIndex] = useState<number>(ind);
  const [firstRender, setFirstRender] = useState(true);
  function onMouseOver() {
    if (!exitHover) {
      setIsActive(true);
    }
  }

  if (ind > index && firstRender) {
    setIndex(ind);
  }

  function onMouseLeave() {
    setIsActive(false);
  }

  const newIndexNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    if (/^\d*$/.test(newValue)) {
      setIndex(+newValue);
      setFirstRender(false);
    }
  };


  const postNewBttnIndex = async () => {
    const post = await axios.post("/changeIndex", {
      old: ind,
      new: index,
      user: localStorage.getItem("pultik-user-login"),
    });

    if (post.status == 200) {
      setTimeout(() => {
        location.reload();
      }, 500);
    }
  };
  async function ReturnModePlus() {
    if (!returnMode) {
      return alert("Pежим возврата выключен. Активируйте режим возврата!");
    } else {
      try {
        const res = await axios.post(`/returnCom`, {
          text: sku,
          decrement: 1,
          user: localStorage.getItem("pultik-user-login"),
        });

        if (res.status !== 200 || !res.data || !res.data.complete) {
          throw Error();
        }

        alert(res.data.complete);
      } catch (error) {
        toast.error("Ошибка отправления запроса");
      }
    }
  }

  async function ReturnModeMinus() {
    if (!returnMode) {
      return alert("Pежим возврата выключен. Активируйте режим возврата!");
    } else {
      try {
        const res = await axios.post(`/returnCom`, {
          text: sku,
          decrement: -1,
          user: localStorage.getItem("pultik-user-login"),
        });

        if (res.status !== 200 || !res.data || !res.data.complete) {
          throw Error();
        }

        alert("Запрос выполнен успешно!");
      } catch (error) {
        toast.error("Ошибка отправления запроса");
      }
    }
  }

  const handleCopy = (textToCopy: string) => {
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        setCopy(!copy);
      })
      .catch((err) => {
        console.error("Ошибка при копировании текста: ", err);
      });
  };

  const Xaltura = async () => {
    if (localStorage.getItem("pultik-user-login") == adminLogin) {
      try {
        await axios.post("/xaltura", {
          xaltura: !xaltura,
          sku: sku,
          user: localStorage.getItem("pultik-user-login"),
        });
        localStorage.setItem(`${sku}`, JSON.stringify(!xaltura));
        setXaltura(!xaltura);
        setXalturaParent(!xaltura);
      } catch (error) {
        console.error(`Ошибка при отправке данных: ${error}`);
      }
    } else {
      alert("Вы не имеете доступа");
    }
  };

  const EditBttn = () => {
    localStorage.setItem("i", JSON.stringify(index));
    navigate("/create-button");
  };

  useEffect(() => {
    setPrice(basePrice.toString());
  }, [basePrice]);

  useEffect(() => {
    setIndex(ind);
  }, [ind]);

  return (
    <div
      className={`${!isActive ? "popup__circle" : "popup"} left`}
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
      onClick={(e) => e.stopPropagation()}
    >
      {isActive ? (
        <>
          <div className="modal_comp_left_i">
            <span>i:</span>
            <input
              type="text"
              value={index}
              onChange={(e) => newIndexNumber(e)}
              className="max-w-[75px] outline-none border-solid border-black border-[1px]"
            />
            <button
              className="modal_comp_left_i_bttn"
              onClick={postNewBttnIndex}
            >
              Ok
            </button>
          </div>
          <p className="popup__el">{comValue ? `com: ${comValue}` : "..."}</p>
          <p className="popup__el !flex !items-center gap-[5px]">
          Name: {fullName}
            <span onClick={() => handleCopy(fullName)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
              </svg>
            </span>
          </p>
          <p className="popup__el !flex !items-center gap-[5px]">
          Sku: {sku}
            <span onClick={() => handleCopy(sku)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
              </svg>
            </span>
          </p>
          <div className="flex gap-2">
            BP
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="max-w-[85px] outline-none border-solid border-black border-[1px]"
            />
            <button
              className="border-solid border-[1px] border-black"
              onClick={() => {
                axios
                  .post("/cPrice", {
                    price: Number(price),
                    sku,
                    user: localStorage.getItem("pultik-user-login"),
                  })
                  .then(() => {
                    toast.success("Цена изменена");
                  });
              }}
            >
              Ok
            </button>
          </div>
          <p className="popup__el !flex !items-center gap-[5px]">
            {wBar}
            <span onClick={() => handleCopy(wBar)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
              </svg>
            </span>
          </p>
          <div className="retrun_bttns">
            <button className="return_bttn" onClick={ReturnModePlus}>
              <span className="bttn_plus text-4xl"> +</span>
            </button>
            <button className="return_bttn" onClick={ReturnModeMinus}>
              <span className="bttn_minus text-4xl"> −</span>
            </button>
          </div>
          <ToggleComponent onClick={Xaltura} isOpened={xaltura} />
          <button
            onClick={EditBttn}
            style={{
              border: "1px solid #000",
              borderRadius: "5px",
              padding: "1px 0px",
              width: "95%",
            }}
          >
            <span>Edit</span>
          </button>
        </>
      ) : (
        <></>
      )}
      {isActive && (
        <PopupExit setState={setIsActive} setOnExit={setExitHover} />
      )}
    </div>
  );
};

export default CircleModalComponentLeft;
