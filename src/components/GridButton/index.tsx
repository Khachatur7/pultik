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
  const cameFromModale = localStorage.getItem("bttn-from-modale") || "0";
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
  // const [fStocksValueChanged, setFStocksValueChanged] = useState(false);

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
      const res = await axios.post(`/dbReq`, {
        sku: sku,
        persent: firstValue,
        bool: boolValue,
        boost: boostValue,
        user: localStorage.getItem("pultik-user-login"),
      });

      if (!res.data) {
        throw Error();
      }
      console.log(res.data);
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

  // useEffect(() => {
  //   if (fStocks != fStocksValue) {
  //     setFStocksValueChanged(true);
  //     setFStocksValue(fStocks);
  //   }
  //   setTimeout(() => {
  //     setFStocksValueChanged(false);
  //   }, 500);
  // }, [fStocks]);

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

  useEffect(() => {
    setFStocksValue(fStocks);
  }, [fStocks]);
  return (
    <div className="btn__cont">
      <button
        className={`btn _hover ${stockValueHandler()}`}
        onClick={getPrice}
        disabled={isDisabled}
      >
        {+cameFromModale == i && <div className="came_from_modale"></div>}
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
         
            <span
              className={`underline ${xaltura ? "xaltura" : ""} ${fullName.length>20?"fullname":""}`}
            >
              {fullName}
            </span>
        ) : (
          index + 1
        )}
        <p
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
          }}
        >
          {`${!isNaN(stockValue) ? ` S ${stockValue}` : ""} ||`}{" "}
          {/* <span>{`w ${wStocks || 0} | `}</span> */}
          <span className="underline">{`F ${fStocksValue || 0}`}</span>{" "}
          {cpValue ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "start",
                gap: "8px",
              }}
            >
              <span> | cP: </span>
              <span className="cp_loading">
                {cpValue.toString().includes("?") ? (
                  <>
                    <div>
                      <svg
                        width="20px"
                        height="20px"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill="#fff"
                          fill-rule="evenodd"
                          d="M11,16 C12.1045695,16 13,16.8954305 13,18 C13,19.1045695 12.1045695,20 11,20 C9.8954305,20 9,19.1045695 9,18 C9,16.8954305 9.8954305,16 11,16 Z M4.74123945,13 C6.12195133,13 7.24123945,14.1192881 7.24123945,15.5 C7.24123945,16.8807119 6.12195133,18 4.74123945,18 C3.36052758,18 2.24123945,16.8807119 2.24123945,15.5 C2.24123945,14.1192881 3.36052758,13 4.74123945,13 Z M16.3193286,13.5 C17.4238981,13.5 18.3193286,14.3954305 18.3193286,15.5 C18.3193286,16.6045695 17.4238981,17.5 16.3193286,17.5 C15.2147591,17.5 14.3193286,16.6045695 14.3193286,15.5 C14.3193286,14.3954305 15.2147591,13.5 16.3193286,13.5 Z M18.5,9.31854099 C19.3284271,9.31854099 20,9.99011387 20,10.818541 C20,11.6469681 19.3284271,12.318541 18.5,12.318541 C17.6715729,12.318541 17,11.6469681 17,10.818541 C17,9.99011387 17.6715729,9.31854099 18.5,9.31854099 Z M2.5,6 C3.88071187,6 5,7.11928813 5,8.5 C5,9.88071187 3.88071187,11 2.5,11 C1.11928813,11 0,9.88071187 0,8.5 C0,7.11928813 1.11928813,6 2.5,6 Z M17.7857894,5.20724734 C18.3380741,5.20724734 18.7857894,5.65496259 18.7857894,6.20724734 C18.7857894,6.75953209 18.3380741,7.20724734 17.7857894,7.20724734 C17.2335046,7.20724734 16.7857894,6.75953209 16.7857894,6.20724734 C16.7857894,5.65496259 17.2335046,5.20724734 17.7857894,5.20724734 Z M8,0 C9.65685425,0 11,1.34314575 11,3 C11,4.65685425 9.65685425,6 8,6 C6.34314575,6 5,4.65685425 5,3 C5,1.34314575 6.34314575,0 8,0 Z M15.5,3 C15.7761424,3 16,3.22385763 16,3.5 C16,3.77614237 15.7761424,4 15.5,4 C15.2238576,4 15,3.77614237 15,3.5 C15,3.22385763 15.2238576,3 15.5,3 Z"
                        />
                      </svg>
                    </div>
                  </>
                ) : (
                  cpValue
                )}{" "}
              </span>
              <span>{percent ? `(${percent})` : ""}</span>
            </div>
          ) : (
            ""
          )}
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
