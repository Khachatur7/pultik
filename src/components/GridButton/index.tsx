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
    avito: number;
    mega: number;
    ozon: number;
    wb: number;
    yaE: number;
    ya: number;
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
  boostInitial,
  wBar,
  cust,
  h,
  returnMode,
  copy,
  setCopy,
}) => {
  const [currentPrice, setCurrentPrice] = useState(price);
  const [currentPriceFixed, setCurrentPriceFixed] = useState(price);
  const [ozonPrice, setOzonPrice] = useState(0);
  const [wbPrice, setWbPrice] = useState(0);
  const [avitoPrice, setAvitoPrice] = useState(0);
  const [yandexPrice, setYandexPrice] = useState(0);
  const [yandexEPrice, setYandexEPrice] = useState(0);
  const [mmPrice, setMmPrice] = useState(0);
  const [boost, setBoost] = useState(boostInitial);
  const [cpValue, setCpValue] = useState(0);
  const [xaltura, setXaltura] = useState(JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem(`${sku}`)))) || false)
  const [isUpdated, setIsUpdated] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [stockValue, setStockValue] = useState(stocks);
  const [fStocksValue, setFStocksValue] = useState<number | undefined>(
    fStocks || 0
  );

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

      const res = await axios.post(
        `/dbReq`,
        {
          name: tel,
          int2: firstValue,
          int1: secondValue,
          bool: boolValue,
          boost: boostValue,
        }
      );

      if (!res.data) {
        throw Error();
      }

      const resData = res.data;

      const {
        ozPrice,
        avPrice,
        wbPrice,
        yaPrice,
        info,
        yaEPrice,
        mmPrice,
        boost,
        cP,
      } = resData;

      setCurrentPrice(resData.basePriceCounted);
      setCurrentPriceFixed(resData.basePrice);
      setOzonPrice(ozPrice);
      setAvitoPrice(avPrice);
      setWbPrice(wbPrice);
      setYandexPrice(yaPrice);
      setIsUpdated(true);
      setStockValue(resData.countedStocks);
      setYandexEPrice(yaEPrice);
      setMmPrice(mmPrice);
      setFStocksValue(resData.fStocks);
      setBoost(boost);
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

    setOzonPrice(basePrices.ozon);
    setAvitoPrice(basePrices.avito);
    setWbPrice(basePrices.wb);
    setYandexPrice(basePrices.ya);
    setYandexEPrice(basePrices.yaE);
    setMmPrice(basePrices.mega);
  };

  const stockValueHandler = () => {
    if (!stockValue) {
      return "gray";
    }

    if (stockValue >= 4) {
      return "green";
    }

    switch (stockValue) {
      case 1:
        return "red";

      case 2:
        return "#cdcd44";

      case 3:
        return "blue";

      default:
        return "";
    }
  };

  useEffect(() => {
    setFStocksValue(fStocks);
  }, [fStocks]);

  useEffect(() => {
    setCpValue(cp);
  }, [cp]);

  useEffect(() => {
    setBoost(boostInitial);
  }, [boostInitial]);

  useEffect(() => {
    pricesHandler();
  }, [multi]);

  useEffect(() => {
    setCurrentPrice(price);
    setCurrentPriceFixed(price);
    setStockValue(stocks);
  }, [price, stocks]);

  return (
    <div className="btn__cont">
      <button
        className={`btn _hover ${
          stockValue === 1 && !fStocksValue ? "button-gradient" : ""
        }`}
        onClick={getPrice}
        disabled={isDisabled}
        style={{ backgroundColor: stockValueHandler() }}
      >
        <span>{`${i && h ? `{${i}. ` : i ? `${i}. ` : ""}`}</span>
        {fullName ? <span className={`underline ${xaltura?"xaltura":""}`}>{fullName}</span> : index + 1}
        <p>
          {`${!isNaN(stockValue) ? ` S ${stockValue}` : ""} |`}{" "}
          <span className="underline">{`F ${fStocksValue || 0}`}</span>{" "}
          {`${
            cpValue
              ? ` |  CP ${cpValue} ${percent ? `(${percent}) ` : ""} `
              : ""
          } | B ${boost || 0} ${h ? "%}" : "%"}`}
        </p>
        <CircleModalComponent
          ozonPrice={ozonPrice}
          wbPrice={wbPrice}
          avitoPrice={avitoPrice}
          yandexPrice={yandexPrice}
          yandexEPrice={yandexEPrice}
          mmPrice={mmPrice}
          price={currentPrice}
        />
        <CircleModalComponentLeft
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
