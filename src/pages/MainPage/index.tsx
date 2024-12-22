/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect, useRef } from "react";
import {
  Container,
  LabelText,
  Button,
  GridButton,
  AuthCheck,
  InfoBlockParser,
} from "@/components";
import { nanoid } from "nanoid";
import axios from "@/axios";
import { MultiType } from "@/components/GridButton/CircleModalComponent";
import { dataFilterHandler } from "@/handlers";
import { Link, useParams } from "react-router-dom";
import boxImage from "@/images/boxX.png";
import addImage from "@/images/add.png";
import chartPageImage from "@/images/chart-page-icon.png";
import eyeImage from "@/images/eyePng.png";
import roiImage from "@/images/roi.png";
import recycling from "@/images/recycling.svg";
import searchLogo from "@/images/search_1.svg";
import newP from "@/images/new.jpg";
import { InputTypes, ButtonItemType, LastButtonType } from "@/types/common";
import { minusButtons, plusButtons } from "@/common";
import MainPageFexp from "./MainPageFexp";
import ZeroModesInfo from "./ZeroModesInfo";
import { infoBlockItems } from "@/store/useBotsStore";
import ModalSearchRes from "@/components/ModaleSearchRes";
// import ChartComponent from "../ChartsPage/ChartComponent";

const tabs = [
  {
    id: nanoid(),
    value: 1,
  },
  {
    id: nanoid(),
    value: 2,
  },
  {
    id: nanoid(),
    value: 3,
  },
  {
    id: nanoid(),
    value: 4,
  },
  {
    id: nanoid(),
    value: 5,
  },
  {
    id: nanoid(),
    value: 6,
  },
  {
    id: nanoid(),
    value: 7,
  },
];

const itemsPerPage = 72;
const pages = 9;

const totalButtons = itemsPerPage * pages;

const buttonsArray = [...Array(totalButtons)];

interface ButtonsInfo {
  total: number;
  grey: number;
  red: number;
  yellow: number;
  blue: number;
  green: number;
  telNumber: number;
  stroyNumber: number;
  telAvailable: number;
  stroyAvailable: number;
}

// interface TomorrowShipType {
//     mm: string;
//     oz: string;
//     wb: string;
//     ya: string;
// }

interface IBots {
  _id: string;
  mon: string;
  online: boolean;
}

export type LastEventType = "price" | "stocks" | null;

const MainPage = () => {
  // const bots = useBotsStore((state) => state.bots);
  const [bots, setBots] = useState<IBots[] | null>(null);
  const [http, setHttp] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(24);
  const [openChangingMenu, setOpenChangingMenu] = useState<boolean>(false);
  const [data, setData] = useState<ButtonItemType[] | null>(null);
  const [multi, setMulti] = useState<MultiType | null>(null);
  const [multiTwo, setMultiTwo] = useState<MultiType | null>(null);
  const [items, setItems] = useState<ButtonItemType[] | null>(null);
  const [copy, setCopy] = useState(false);
  // const [tomorrowShip, setTomorrowShip] = useState<TomorrowShipType | null>(
  //     null
  // );
  // const [cp, setCp] = useState<MultiType | null>(null);
  const [cpData, setCpData] = useState<{
    cP: string;
    eX: string;
    pL: string;
    eurRub: string;
    customs: string;
    round: string;
    marg: string;
    salesWb: number;
    salesYa: number;
    salesOz: number;
    salesMm: number;
    salesAv: number;
    fixedExp: number;
    quart: number;
    priceIndex: string;
    middlePercent: string;
  } | null>(null);
  const [returnMode, setReturnMode] = useState(false);
  const [buttonsInfo, setButtonsInfo] = useState<ButtonsInfo>({
    total: 0,
    grey: 0,
    red: 0,
    yellow: 0,
    blue: 0,
    green: 0,
    telNumber: 0,
    stroyNumber: 0,
    telAvailable: 0,
    stroyAvailable: 0,
  });
  const [lastButton, setLastButton] = useState<LastButtonType | null>(null);
  const [firstValue, setFirstValue] = useState("0");
  const [secondValue, setSecondValue] = useState("0");
  const [boostValue, setBoostValue] = useState("0");
  const { id } = useParams();
  const [currentTab, setCurrentTab] = useState(id ? +id : 1);
  const timerInterval = useRef<null | number | any>(null);
  const [lastEvent, setLastEvent] = useState<LastEventType>(null);
  const [monitoring, setMonitoring] = useState(false);
  const [piker, setPiker] = useState<string>(
    localStorage.getItem("piker") || "01"
  );
  const [selectOpened, setSelectOpened] = useState(false);
  const months = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];
  const [bttnSearcher, setBttnSearcher] = useState("");
  const [bttnsIndex, setBttnsIndex] = useState<ButtonItemType[]>([]);
  const [notSearchYet, setNotSearchYet] = useState(true);
  const [openBttnModal, setOpenBttnModal] = useState(false);
  const plusHandler = (value: number, input?: InputTypes) => {
    if (input === 1) {
      setSecondValue((prev) => (Number(prev) + value).toString());
      return;
    }

    if (input === 2) {
      return setSecondValue((prev) => (Number(prev) + value).toString());
    }

    if (input === 3) {
      return setBoostValue((prev) => (Number(prev) + value).toString());
    }

    setFirstValue((prev) => (Number(prev) + value).toString());
  };

  const minusHandler = (value: number, input?: InputTypes) => {
    if (input === 1) {
      setSecondValue((prev) => (Number(prev) - value).toString());
      return;
    }

    if (input === 2) {
      return setSecondValue((prev) => (Number(prev) - value).toString());
    }

    if (input === 3) {
      return setBoostValue((prev) => (Number(prev) - value).toString());
    }

    setFirstValue((prev) => (Number(prev) - value).toString());
  };

  const loadMulti = async () => {
    try {
      const res = await axios.post("/api/getMulti");

      if (!res.data) {
        throw Error();
      }

      setMulti(res.data.multi);
      setMultiTwo(res.data.multi2);
      // setCp(res.data.multi3);
    } catch (error) {
      setMulti(null);
    }
  };

  const allPrices = async () => {
    try {
      const res = await axios.post("/allPrices", {
        user: localStorage.getItem("pultik-user-login"),
        priceChange: firstValue,
      });

      if (res.status == 200) {
        alert(res.data.text);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const changeTab = () => {
    setCurrentTab(
      +location.pathname.substring(1, location.pathname.length) || 1
    );
  };

  useEffect(() => {
    window.addEventListener("popstate", changeTab);

    return () => {
      window.removeEventListener("popstate", changeTab);
    };
  }, []);

  // const allPricesMinus = async () => {

  //   try {
  //     const res = await axios.post("/allPrices", {
  //       user: localStorage.getItem("pultik-user-login"),
  //       priceChange:
  //         +`${firstValue.replace("-", "")}` === 0
  //           ? "0"
  //           : `-${firstValue.replace("-", "")}`,
  //     });

  //     if (res.status == 200) {
  //       console.log(555);

  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const SelectMonth = async (numb: string) => {
    try {
      const res = await axios.post("/getCpData", {
        month: numb,
        user: localStorage.getItem("pultik-user-login"),
      });

      if (res.status !== 200) {
        throw Error();
      }
      localStorage.setItem("piker", numb);
      setCpData(res.data);
      setPiker(numb);
      setSelectOpened(false);
    } catch (error) {
      console.log(error);
    }
  };
  const loadData = async () => {
    try {
      const res = await axios.post("/api/getData", {
        user: localStorage.getItem("pultik-user-login"),
      });

      if (!res.data) {
        throw Error();
      }

      const resData = res.data.countedStocks;

      const itemsButtons = resData.filter(
        (el: ButtonItemType) => !dataFilterHandler(el._id) && !isNaN(el.i)
      );

      let greyButtons: number = 0;
      let redButtons: number = 0;
      let yellowButtons: number = 0;
      let blueButtons: number = 0;
      let greenButtons: number = 0;
      let telNumber: number = 0;
      let stroyNumber: number = 0;
      let telAvailable: number = 0;
      let stroyAvailable: number = 0;

      for (let i = 0; i < itemsButtons.length; i++) {
        const button = itemsButtons[i];

        if (button.com === "tel") {
          telNumber += 1;

          if (button.stocks > 0) {
            telAvailable += 1;
          }
        } else if (button.com === "stroy") {
          stroyNumber += 1;

          if (button.stocks > 0) {
            stroyAvailable += 1;
          }
        }

        if (!button.stocks) {
          greyButtons += 1;
          continue;
        }

        if (button.stocks === 1) {
          redButtons += 1;
          continue;
        }

        if (button.stocks === 2) {
          yellowButtons += 1;
          continue;
        }

        if (button.stocks === 3) {
          blueButtons += 1;
          continue;
        }

        if (button.stocks >= 4) {
          greenButtons += 1;
          continue;
        }
      }

      setData(resData);
      setItems(
        itemsButtons.sort((a: ButtonItemType, b: ButtonItemType) => a.i - b.i)
      );
      console.log(res.data);
      setButtonsInfo({
        total: itemsButtons.length,
        grey: greyButtons,
        red: redButtons,
        yellow: yellowButtons,
        blue: blueButtons,
        green: greenButtons,
        telNumber,
        stroyNumber,
        telAvailable,
        stroyAvailable,
      });
    } catch (error) {
      setData(null);
      setMultiTwo(null);
    }
  };

  // const loadCom = async () => {
  //     try {
  //         const res = await axios.post<TomorrowShipType>("/tomorrowShip");

  //         if (res.status !== 200) {
  //             throw Error();
  //         }

  //         // setTomorrowShip(res.data);
  //     } catch (error) {
  //         // setTomorrowShip(null);
  //     }
  // };

  // const loadCp = async () => {
  //   console.log(555);

  //   try {
  //     const res = await axios.get("/getCpData");

  //    console.log(res.data);

  //     if (res.status !== 200) {
  //       throw Error();
  //     }

  //     setCpData(res.data);
  //   } catch (error) {
  //     setCpData(null);
  //   }
  // };

  const initialLoad = async () => {
    await loadMulti();
    await loadData();
    // await loadCom();
    // await loadCp();
  };

  const resetInputs = () => {
    setFirstValue("0");
    setSecondValue("0");
    setBoostValue("0");
    setBttnSearcher("");
    setNotSearchYet(true);
  };

  const timerHandler = async () => {
    if (
      (!Number(firstValue) && !Number(secondValue) && !Number(boostValue)) ||
      timeLeft < 0
    ) {
      return setTimeLeft(0);
    }

    if (timerInterval.current) {
      clearInterval(timerInterval.current);
      timerInterval.current = null;
    }

    setTimeLeft(24);

    timerInterval.current = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
  };

  const buttonTextHandler = (inputType: InputTypes | undefined) => {
    if (inputType === 2) {
      return "S";
    }

    if (inputType === 3) {
      return "B";
    }

    return "%";
  };

  const SetStates = (item: any) => {
    setOpenChangingMenu(!openChangingMenu);
    setCurrentTab(item.value);
  };

  const getBots = async () => {
    try {
      const res = await axios.post("/pultikMon", {
        user: localStorage.getItem("pultik-user-login"),
      });

      if (res.data) {
        setBots(res.data.answer);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getHttp = async () => {
    try {
      const res = await axios.get("/test");

      if (res.data) {
        setHttp(res.data.text);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const selectHandle = (e: MouseEvent) => {
    if (
      !(e.target as Element).classList.contains("select_month") &&
      !(e.target as Element).classList.contains("selected_month")
    ) {
      setSelectOpened(false);
      window.removeEventListener("click", selectHandle);
    }
  };

  const SearchBttns = () => {
    const res: ButtonItemType[] = [];
    items?.map((bttn) => {
      console.log(items);

      if (
        bttn.fullName?.toLowerCase().includes(bttnSearcher.trim().toLowerCase())
      ) {
        res.push(bttn);
      }
    });
    setBttnsIndex(res);

    if (notSearchYet) {
      setNotSearchYet(false);
    }
  };

  useEffect(() => {
    initialLoad();
    SelectMonth(localStorage.getItem("piker") || "01");

    const updateHandler = async () => {
      while (document.location.pathname === "/") {
        await new Promise((res) =>
          setTimeout(() => {
            res(true);
          }, 5000)
        );

        await initialLoad();
      }
    };

    updateHandler();
    console.log(data, lastButton);
  }, []);

  useEffect(() => {
    setInterval(() => {
      initialLoad();
      SelectMonth(piker);
    }, 5000);
  }, []);

  useEffect(() => {
    timerHandler();
  }, [firstValue, secondValue, boostValue]);

  useEffect(() => {
    if (timeLeft < 0) {
      setTimeLeft(0);

      if (timerInterval.current) {
        clearInterval(timerInterval.current);
        timerInterval.current = null;
      }
    }

    if (timeLeft <= 0) {
      resetInputs();
    }
  }, [timeLeft]);

  useEffect(() => {
    setTimeout(() => {
      setMonitoring(!monitoring);
    }, 5000);
  }, []);

  useEffect(() => {
    getHttp();
    getBots();
  }, [monitoring]);

  useEffect(() => {
    if (selectOpened) {
      return window.addEventListener("click", selectHandle);
    }
  }, [selectOpened]);

  useEffect(() => {
    if (!(bttnSearcher == "")) {
      SearchBttns();
    }
  }, [bttnSearcher]);

  return (
    <AuthCheck>
      {openChangingMenu && (
        <>
          <div id="btn__changing_mobile">
            {tabs.map((item) => (
              <button
                key={item.id}
                className={`btn btn__changing-item${
                  currentTab === item.value ? " active" : ""
                }`}
                onClick={() => SetStates(item)}
              >
                {item.value}
              </button>
            ))}
            <button
              className={`btn btn__changing-item${
                currentTab === 8 ? " active" : ""
              }`}
              onClick={() => setCurrentTab(8)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="36"
                height="36"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 6h18" />
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                <line x1="10" x2="10" y1="11" y2="17" />
                <line x1="14" x2="14" y1="11" y2="17" />
              </svg>
            </button>
            <Link
              to={"/save-sell"}
              className={`btn btn__changing-item flex items-center justify-center`}
            >
              <img src={addImage} alt="box-image" className="w-12" />
            </Link>
            <Link
              to={"/create-button"}
              className={`btn btn__changing-item flex items-center justify-center`}
            >
              <img src={boxImage} alt="box-image" className="w-12" />
            </Link>
            <Link
              to={"/charts"}
              className={`btn btn__changing-item flex items-center justify-center`}
            >
              <img src={chartPageImage} alt="box-image" className="w-12" />
            </Link>
            <Link
              to={"/charts2"}
              className={`btn btn__changing-item flex items-center justify-center`}
            >
              <img src={roiImage} alt="roi-image" className="w-12" />
            </Link>
            <Link
              to={"/watch"}
              className={`btn btn__changing-item flex items-center justify-center`}
            >
              <img src={eyeImage} alt="box-image" className="w-16" />
            </Link>
            <Link
              to={"/new"}
              className={`btn btn__changing-item flex items-center justify-center`}
            >
              <img src={newP} alt="box-image" className="w-16" />
            </Link>
          </div>
        </>
      )}
      {selectOpened && window.innerWidth < 410 && (
        <ul className="mob_select_month">
          {months.map((month, ind) => {
            return (
              <li key={month + ind} onClick={() => SelectMonth(month)}>
                {ind + 1}
              </li>
            );
          })}
        </ul>
      )}
      <Container>
        {window.innerWidth > 600 && (
          <>
            <div className="btn__changing flex items-center justify-center">
              {tabs.map((item) => (
                <Link
                  to={`/${item.value}`}
                  className={`btn btn__changing-item flex items-center justify-center${
                    currentTab === item.value ? " active" : ""
                  }`}
                  key={item.id}
                  onClick={() => setCurrentTab(item.value)}
                >
                  {item.value == 5 ? (
                    <img src={recycling} alt="" style={{ width: "45px" }} />
                  ) : (
                    item.value
                  )}
                </Link>
              ))}
              <Link
                to={`/${8}`}
                className={`btn btn__changing-item flex items-center justify-center${
                  currentTab === 8 ? " active" : ""
                }`}
                key={8}
                onClick={() => setCurrentTab(8)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 6h18" />
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                  <line x1="10" x2="10" y1="11" y2="17" />
                  <line x1="14" x2="14" y1="11" y2="17" />
                </svg>
              </Link>
              <Link
                to={"/save-sell"}
                className={`btn btn__changing-item flex items-center justify-center`}
              >
                <img src={addImage} alt="box-image" className="w-12" />
              </Link>
              <Link
                to={"/create-button"}
                className={`btn btn__changing-item flex items-center justify-center`}
              >
                <img src={boxImage} alt="box-image" className="w-12" />
              </Link>
              <Link
                to={"/charts"}
                className={`btn btn__changing-item flex items-center justify-center`}
              >
                <img src={chartPageImage} alt="box-image" className="w-12" />
              </Link>
              <Link
                to={"/charts2"}
                className={`btn btn__changing-item flex items-center justify-center`}
              >
                <img src={roiImage} alt="roi-image" className="w-12" />
              </Link>
              <Link
                to={"/watch"}
                className={`btn btn__changing-item flex items-center justify-center`}
              >
                <img src={eyeImage} alt="box-image" className="w-16" />
              </Link>
              <Link
                to={"/new"}
                className={`btn btn__changing-item flex items-center justify-center`}
              >
                <img src={newP} alt="box-image" style={{ width: "80px" }} />
              </Link>
            </div>
          </>
        )}

        {window.innerWidth < 600 && (
          <>
            <div
              className="open_btn_changing"
              onClick={() => setOpenChangingMenu(!openChangingMenu)}
            >
              <svg
                width="30px"
                height="30px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 18L20 18"
                  stroke="#0F0F0F"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M4 12L20 12"
                  stroke="#0F0F0F"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M4 6L20 6"
                  stroke="#0F0F0F"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </>
        )}
        <div className="wrapper">
          <div
            className="handlecopy_information"
            id={copy ? "show_copy_bttn" : "close_copy_bttn"}
          >
            <div className="cope_info_bttn">
              <span>Скопировано</span>
            </div>
          </div>

          <div className="btn__wrapper">
            {items && items.length ? (
              <>
                {buttonsArray
                  .slice(
                    (currentTab - 1) * itemsPerPage,
                    currentTab * itemsPerPage
                  )
                  .map((_, index: number) => {
                    const itemIndex =
                      index + 1 + (currentTab - 1) * itemsPerPage;

                    const elements = items.filter(
                      (el: ButtonItemType) => el.i === itemIndex
                    );

                    if (!elements.length) {
                      return (
                        <div className="btn__cont" key={index}>
                          <button className="btn _hover">{itemIndex}</button>
                        </div>
                      );
                    }

                    const el = elements[0];
                    return (
                      <GridButton
                        key={index}
                        tel={el.tel}
                        fullName={el.fullName}
                        stocks={el.stocks}
                        index={index}
                        price={el.basePrice}
                        multi={multi}
                        multiTwo={multiTwo}
                        comValue={el.com}
                        firstValue={firstValue}
                        secondValue={secondValue}
                        boolValue={el.bool}
                        h={el.h}
                        i={el.i}
                        sku={el.sku}
                        setLastButton={setLastButton}
                        percent={el.percent}
                        lastEvent={lastEvent}
                        basePrices={{
                          avito: el.avPrice,
                          mega: el.mmPrice,
                          ozon: el.ozPrice,
                          wb: el.wbPrice,
                          yaE: el.yaEPrice,
                          ya: el.yaPrice,
                        }}
                        fStocks={el.fStocks}
                        boostValue={boostValue}
                        boostInitial={el.boost}
                        wBar={el.wBar}
                        cp={el.cP}
                        cust={el.cust}
                        returnMode={returnMode}
                        copy={copy}
                        setCopy={setCopy}
                        wStocks={el.wStocks}
                      />
                    );
                  })}
              </>
            ) : (
              <></>
            )}
          </div>
          <div className="mat__container">
            <div className="input__wrapper">
              <input
                type="text"
                placeholder="Изменение цены"
                value={`${firstValue} %`}
                onChange={(e) => {
                  const value = e.target.value
                    .split(" ")
                    .join("")
                    .replace("%", "");
                  setFirstValue(value ? Number(value).toString() : "");
                  setLastEvent("price");
                }}
              />
              {window.innerWidth > 400 && (
                <div className="input_search_bttns">
                  <input
                    type="text"
                    className="searcher_input"
                    placeholder="Search"
                    value={bttnSearcher}
                    onChange={(e) => setBttnSearcher(e.target.value)}
                  />
                  <div
                    className="search_logo"
                    onClick={() => setOpenBttnModal(true)}
                  >
                    <img src={searchLogo} alt="search_logo" />
                  </div>
                  <span className="bttns_search_res">
                    {!notSearchYet &&
                      bttnsIndex.length > 0 &&
                      bttnsIndex.length}
                    {!notSearchYet && bttnsIndex.length == 0 && "Not found"}
                  </span>
                </div>
              )}
              {/*  <input
                type="text"
                placeholder="Изменение остатка"
                value={`${secondValue} S`}
                onChange={(e) => {
                  const value = e.target.value
                    .split(" ")
                    .join("")
                    .replace("S", "");
                  setSecondValue(value ? Number(value).toString() : "");
                  setLastEvent("stocks");
                }}
              />
              <input
                type="text"
                placeholder="Изменение boost"
                value={`${boostValue} B`}
                onChange={(e) => {
                  const value = e.target.value
                    .split(" ")
                    .join("")
                    .replace("B", "");
                  setBoostValue(value);
                }}
              /> */}
              <Button onClick={resetInputs} text="Reset" />
            </div>
            <div className="mat__wrapper">
              {plusButtons.map((button) =>
                button.value == 1 && button.input == 2 ? (
                  <Button key={button.id} onClick={allPrices}>
                    <span>{cpData?.middlePercent || 0}</span>
                  </Button>
                ) : (
                  <Button
                    key={button.id}
                    onClick={() => plusHandler(button.value, button?.input)}
                  >
                    {`+${button.value} ${buttonTextHandler(button.input)}`}
                  </Button>
                )
              )}
              {/* <ChartComponent
                label=""
                labels={null}
                data={null}
                totalPages={0}
                isMedian={undefined}
              /> */}
            </div>
            <div className="mat__wrapper">
              {minusButtons.map(
                (button) =>
                  button.input != 2 && (
                    <Button
                      key={button.id}
                      onClick={() => minusHandler(button.value, button?.input)}
                    >
                      <div className="bttn_arrow">
                        {`-${button.value} ${buttonTextHandler(button.input)}`}
                      </div>
                    </Button>
                  )
              )}
            </div>
            {window.innerWidth <= 400 && (
              <div className="input_search_bttns">
                <input
                  type="text"
                  className="searcher_input"
                  placeholder="Search"
                  value={bttnSearcher}
                  onChange={(e) => setBttnSearcher(e.target.value)}
                />
                <div
                  className="search_logo"
                  onClick={() => setOpenBttnModal(true)}
                >
                  <img src={searchLogo} alt="search_logo" />
                </div>
                <span className="bttns_search_res">
                  {!notSearchYet && bttnsIndex.length > 0 && bttnsIndex.length}
                  {!notSearchYet && bttnsIndex.length == 0 && "Not found"}
                </span>
              </div>
            )}
            <MainPageFexp />
            <div className="relative text_cp">
              {cpData ? (
                <>
                  <p>cP: {cpData.cP}</p>
                  <p>eX: {cpData.eX}</p>
                  <p>pL: {cpData.pL}</p>
                  <p>rO: {cpData.round}</p>
                  <p>mG: {cpData.marg}</p>

                  <p>
                    Wb: {cpData.salesWb} | Oz: {cpData.salesOz} | Ya:{" "}
                    {cpData.salesYa} | Av: {cpData.salesAv} | Mm:{" "}
                    {cpData.salesMm}
                  </p>
                  <p>fE/m: {cpData.fixedExp} Rub</p>
                  <p>
                    Quartal: {cpData.quart} | Price index: {cpData.priceIndex}
                  </p>
                  <p>user: {localStorage.getItem("pultik-user-login")}</p>
                </>
              ) : (
                <></>
              )}
            </div>

            <div className="w-[100vw] flex items-center justify-center gap-[10px] bots_list overflow-auto">
              {/* Если данные получены */}
              {http &&
                infoBlockItems
                  ?.filter((item) => item.text === "Https server")
                  .map((item) => (
                    <InfoBlockParser
                      key={item.text}
                      bot={{
                        _id: item.text,
                        mon: "",
                        online: http == "Success!" ? true : false,
                      }}
                      text={item.text}
                    />
                  ))}
              {bots &&
                infoBlockItems
                  ?.filter(
                    (item) =>
                      item.page == "main" && item.text !== "Https server"
                  )
                  .map((item, index) => {
                    if (index < 9) {
                      return (
                        <InfoBlockParser
                          key={item.text}
                          bot={bots[index]}
                          text={item.text}
                          isLast={!(index < 9)}
                        />
                      );
                    }
                  })}

              {/* Если данные не получены */}
              {!http &&
                infoBlockItems
                  ?.filter((item) => item.text === "Https server")
                  .map((item) => (
                    <InfoBlockParser
                      key={item.text}
                      bot={{
                        _id: item.text,
                        mon: "",
                        online: false,
                      }}
                      text={item.text}
                    />
                  ))}
              {!bots &&
                infoBlockItems.map((item, index) => {
                  if (item.page == "main" && item.text !== "Https server") {
                    return (
                      <InfoBlockParser
                        key={item.text + index}
                        bot={{ _id: "und" + index, mon: "", online: false }}
                        text={item.text}
                        isLast
                      />
                    );
                  }
                })}
            </div>
            <div className="w-[100vw] flex items-center justify-center gap-[10px] bots_list overflow-auto">
              {/* Если данные получены */}
              {bots &&
                infoBlockItems
                  ?.filter(
                    (item) =>
                      item.page == "main" && item.text !== "Https server"
                  )
                  .map((item, index, arr) => {
                    if (index >= 9) {
                      return (
                        <InfoBlockParser
                          key={item.text}
                          bot={bots[index]}
                          text={item.text}
                          isLast={index + 1 === arr.length}
                        />
                      );
                    }
                  })}

              {/* Если данные не получены */}
              {!bots &&
                infoBlockItems.map((item, index) => {
                  if (item.page == "main" && item.text !== "Https server") {
                    return (
                      <InfoBlockParser
                        key={item.text + index}
                        bot={{ _id: "und" + index, mon: "", online: false }}
                        text={item.text}
                        isLast
                      />
                    );
                  }
                })}
            </div>
          </div>
        </div>
        <LabelText />
        <div className="absolute top-[40px] right-[10px] flex items-center justify-center flex-col p_list">
          <p className="w-[60px] h-[60px] flex justify-center items-center mb-[20px] text-2xl border-black border-[1px] border-solid rounded-md">
            {buttonsInfo.total}
          </p>
          <p className="w-[60px] h-[60px] flex justify-center items-center mb-[20px] bg-slate-400 rounded-md text-2xl text-white">
            {buttonsInfo.grey}
          </p>
          <p className="w-[60px] h-[60px] flex justify-center items-center mb-[20px] rounded-md text-2xl bg-[red] text-white">
            {buttonsInfo.red}
          </p>
          <p className="w-[60px] h-[60px] flex justify-center items-center mb-[20px] rounded-md text-2xl bg-[#cdcd44] text-white">
            {buttonsInfo.yellow}
          </p>
          <p className="w-[60px] h-[60px] flex justify-center items-center mb-[20px] rounded-md text-2xl bg-[blue] text-white">
            {buttonsInfo.blue}
          </p>
          <p className="w-[60px] h-[60px] flex justify-center items-center mb-[20px] rounded-md text-2xl bg-[green] text-white">
            {buttonsInfo.green}
          </p>
          <p className="white_p w-[70px] h-[70px] flex justify-center items-center mb-[20px] rounded-md text-xl bg-slate-100">
            tel: {buttonsInfo.telNumber}
          </p>
          <p className="white_p w-[70px] h-[70px] flex justify-center items-center mb-[20px] rounded-md text-xl bg-slate-100">
            stroy: {buttonsInfo.stroyNumber}
          </p>
          <p className="white_p w-[70px] h-[70px] flex justify-center text-center items-center mb-[20px] rounded-md text-xl bg-slate-100">
            sTel: {buttonsInfo.telAvailable}
          </p>
          <p className="white_p w-[70px] h-[70px] flex justify-center items-center text-center mb-[20px] rounded-md text-xl bg-slate-100">
            sStroy: {buttonsInfo.stroyAvailable}
          </p>
          <ZeroModesInfo
            returnMode={returnMode}
            setReturnMode={setReturnMode}
          />
          <div className="piker">
            <div
              className="selected_month"
              onClick={() => setSelectOpened(!selectOpened)}
            >
              <span
                onClick={() => setSelectOpened(!selectOpened)}
                className={
                  +piker <= 3
                    ? "red"
                    : +piker <= 6
                    ? "blue"
                    : +piker <= 9
                    ? "orange"
                    : +piker <= 12
                    ? "green"
                    : ""
                }
              >
                {+piker}
              </span>
            </div>
            {selectOpened && window.innerWidth > 410 && (
              <ul className="select_month">
                {months.map((month, ind) => {
                  return (
                    <li key={month + ind} onClick={() => SelectMonth(month)}>
                      {ind + 1}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
        {timeLeft > 0 ? (
          <p className="time-left">Autoreset: {timeLeft} s.</p>
        ) : (
          <></>
        )}
      </Container>
      {openBttnModal && (
        <ModalSearchRes
          bttns={bttnsIndex}
          closeModule={setOpenBttnModal}
          setTub={setCurrentTab}
        />
      )}
    </AuthCheck>
  );
};

export default MainPage;
