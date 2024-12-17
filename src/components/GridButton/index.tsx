import { useState, useEffect } from "react";
import CircleModalComponent, { MultiType } from "./CircleModalComponent";
import CircleModalComponentLeft from "./CircleModalComponentLeft";

import axios from "@/axios";
import { toast } from "react-toastify";
import { ComValueType } from "@/types/api";
import { LastButtonType } from "@/types/common";
import { LastEventType } from "@/pages/MainPage";
import CircleModalComponentBottomLeft from "./CircleModalComponentBottomLeft";

interface Props {
  tel: string;
  index: number;
  price: number;
  stocks: number;
  multi: MultiType | null;
  multiTwo: MultiType | null;
  firstValue: string;
  secondValue: string;
  boolValue: number;
  h: boolean | undefined;
  comValue?: ComValueType;
  fullName: string;
  i: number;
  sku: string;
  percent: number;
  setLastButton: (value: LastButtonType | null) => void;
  lastEvent: LastEventType;
  basePrices: {
    avito: string;
    mega: string;
    ozon: string;
    wb: string;
    yaE: string;
    ya: string;
  };
  fStocks?: number;
  boostValue: string;
  boostInitial?: number;
  wBar: string;
  cp: number;
  cust?: number;
  returnMode?: boolean;
  copy: boolean;
  setCopy: React.Dispatch<React.SetStateAction<boolean>>;
  wStocks?: number;
}

const GridButton: React.FC<Props> = ({
  tel,
  index,
  price,
  stocks,
  multi,
  fStocks,
  firstValue,
  secondValue,
  boolValue,
  fullName,
  comValue,
  i,
  sku,
  percent,
  cp,
  setLastButton,
  basePrices,
  boostValue,
  // lastEvent,
  wBar,
  cust,
  h,
  returnMode,
  copy,
  setCopy,
  wStocks,
}) => {
  const [currentPrice, setCurrentPrice] = useState(price);
  const [currentPriceFixed, setCurrentPriceFixed] = useState(price);
  // const [boost, setBoost] = useState(boostInitial);
  const cameFromModale = localStorage.getItem("bttn-from-modale");
  const [cpValue, setCpValue] = useState(0);
  const [xaltura, setXaltura] = useState(
    JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem(`${sku}`)))) ||
      false
  );
  const [isUpdated, setIsUpdated] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [stockValue, setStockValue] = useState(stocks);
  const [fStocksValue, setFStocksValue] = useState<number | undefined>(
    fStocks || 0
  );
  const [fStocksValueChanged, setFStocksValueChanged] = useState(false);

  const getPrice = async () => {
    if (isDisabled) {
      console.log(isUpdated);
      return;
    }

    if (stockValue === 1 && !fStocksValue) {
      return toast.error("Данный товар находится на консервации!");
    }

    if (!firstValue && !secondValue) {
      return toast.warning("Введите хотя бы одно число");
    }

    if ((fStocksValue || 0) < stockValue + Number(secondValue)) {
      return toast.error(
        "Продаваемые остатки не могут быть больше фактических!"
      );
    }

    try {
      setIsDisabled(true);

      const res = await axios.post(`/dbReq`, {
        name: tel,
        int2: firstValue,
        int1: secondValue,
        bool: boolValue,
        boost: boostValue,
        user: localStorage.getItem("pultik-user-login"),
      });

      if (!res.data) {
        throw Error();
      }

      const resData = res.data;

      const { info, cP } = resData;

      setCurrentPrice(resData.basePriceCounted);
      setCurrentPriceFixed(resData.basePrice);
      setIsUpdated(true);
      setStockValue(resData.countedStocks);
      setFStocksValue(resData.fStocks);
      // setBoost(boost);
      setCpValue(cP);

      const getTime = () => {
        const date = new Date(); // Replace this with your date object

        const options = {
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          hour12: false,
        };
        // @ts-ignore
        const dateFormatter = new Intl.DateTimeFormat("ru", options);
        const formattedDate = dateFormatter.format(date);
        return formattedDate;
      };

      setLastButton({
        time: getTime(),
        dbName: tel,
        sku,
        yandex: {
          price: info.yaPrice,
          stock: info.yaStock,
        },
        avito: {
          price: info.avPrice,
          stock: info.avStock,
        },
        ozon: {
          price: info.ozPrice,
          stock: info.ozStock,
        },
        wb: {
          price: info.wbStock,
          stock: info.wbStock,
        },
        megamarket: {
          price: info.mmPrice,
          stock: info.mmStock,
        },
        yaE: {
          price: info.ya2Price,
          stock: info.ya2Stock,
        },
      });
    } catch (error) {
      toast.error("Не удалось получить данные для кнопки");
    } finally {
      setIsDisabled(false);
    }
  };

  const pricesHandler = () => {
    if (!multi) {
      return;
    }
  };

  const stockValueHandler = () => {
    if (!fStocks) {
      return "button-gradient";
    }

    if (fStocks >= 4) {
      return "grid_bttn_green";
    } else if (fStocks < 0) {
      return "grid_bttn_black";
    }

    switch (fStocks) {
      case 1:
        return "grid_bttn_red";

      case 2:
        return "grid_bttn_yellow";

      case 3:
        return "grid_bttn_blue";

      default:
        return "";
    }
  };

  useEffect(() => {
    if (fStocks != fStocksValue) {
      setFStocksValueChanged(true);
      setFStocksValue(fStocks);
    }
    setTimeout(() => {
      setFStocksValueChanged(false);
    }, 500);
  }, [fStocks]);

  // useEffect(() => {
  //   if (fStocksValueChanged) {
  //     setTimeout(() => {
  //       setFStocksValueChanged(false)
  //     }, 500);
  //   }

  // }, [fStocksValueChanged]);

  useEffect(() => {
    setCpValue(cp);
  }, [cp]);

  // useEffect(() => {
  //   setBoost(boostInitial);
  // }, [boostInitial]);

  useEffect(() => {
    pricesHandler();
  }, [multi]);

  useEffect(() => {
    setCurrentPrice(price);
    setCurrentPriceFixed(price);
    setStockValue(stocks);
  }, [price, stocks]);

  useEffect(() => {
    if (cameFromModale) {
      localStorage.removeItem("bttn-from-modale");
    }
  }, []);
  return (
    <div className="btn__cont">
      <button
        className={`btn _hover ${stockValueHandler()} ${
          fStocksValueChanged && "white_flash"
        }`}
        onClick={getPrice}
        disabled={isDisabled}
      >
        {cameFromModale && +cameFromModale == i && (
          <div className="came_from_modale"></div>
        )}
        {wStocks && wStocks > 0 ? (
          <div className="w_sign">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="34"
              height="34"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                d="M10.293 4.793c.78-1.277 2.634-1.277 3.414 0l7.433 12.164C21.955 18.29 20.996 20 19.434 20H4.566c-1.562 0-2.52-1.71-1.706-3.043z"
              />
            </svg>
          </div>
        ) : (
          ""
        )}
        <span>{`${i && h ? `{${i}. ` : i ? `${i}. ` : ""}`}</span>
        {fullName ? (
          <span className={`underline ${xaltura ? "xaltura" : ""}`}>
            {fullName}
          </span>
        ) : (
          index + 1
        )}
        <p>
          {`${!isNaN(stockValue) ? ` S ${stockValue}` : ""} ||`}{" "}
          <span>{`w ${wStocks || 0} | `}</span>
          <span className="underline">{`F ${fStocksValue || 0}`}</span>{" "}
          {`${
            cpValue
              ? ` |  CP ${cpValue} ${percent ? `(${percent}) ` : ""} `
              : ""
          }`}
        </p>
        <CircleModalComponent
          ozonPrice={basePrices.ozon}
          wbPrice={basePrices.wb}
          avitoPrice={basePrices.avito}
          yandexPrice={basePrices.ya}
          yandexEPrice={basePrices.yaE}
          mmPrice={basePrices.mega}
          price={currentPrice}
        />
        <CircleModalComponentLeft
          ind={i}
          comValue={comValue}
          boolValue={boolValue}
          sku={sku}
          basePrice={currentPriceFixed}
          wBar={wBar}
          returnMode={returnMode}
          copy={copy}
          setCopy={setCopy}
          setXalturaParent={setXaltura}
        />
        <CircleModalComponentBottomLeft cust={cust} />
      </button>
    </div>
  );
};

export default GridButton;
