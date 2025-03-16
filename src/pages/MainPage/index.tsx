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
import searchLogo from "@/images/search_1.svg";
import problemsP from "@/images/new.jpg";
import houseImage from "@/images/house.png";
import upDownImage from "@/images/upDown.png";
import { InputTypes, ButtonItemType, LastButtonType } from "@/types/common";
import { minusButtons, plusButtons, transliterationMap } from "@/common";
import MainPageFexp from "./MainPageFexp";
import ZeroModesInfo from "./ZeroModesInfo";
import { infoBlockItems } from "@/store/useBotsStore";
import ModalSearchRes from "@/components/ModaleSearchRes";
import LineChart from "@/components/Chart";
import { addDays, isAfter, parseISO } from "date-fns";
import ArrowSVG from "@/components/SVGcomponents/ArrowSVG";
import RunnerSVG from "@/components/SVGcomponents/RunnerSVG";
import WalkingManSVG from "@/components/SVGcomponents/WalkingManSVG";
import RecyclingSVG from "@/components/SVGcomponents/RecyclingSVG";
import TrashSVG from "@/components/SVGcomponents/TrashSVG";
interface IChart {
  aS: number;
  aSp: number;
  date: string;
  dayMargin: string;
  middleDayPer?: string;
  oneStockPrice: number;
  ordersNum: number;
  roiMonth: string;
  todayMm: string;
  _id: string;
}

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
    value: "upDown",
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
  {
    id: nanoid(),
    value: 8,
  },
  {
    id: nanoid(),
    value: 9,
  },
  {
    id: nanoid(),
    value: 10,
  },
  {
    id: nanoid(),
    value: 11,
  },
  {
    id: nanoid(),
    value: 12,
  },
  {
    id: nanoid(),
    value: 13,
  },
  {
    id: nanoid(),
    value: 14,
  },
];

const itemsPerPage = 77;
const pages = 16;
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

interface IBots {
  _id: string;
  mon: string;
  online: boolean;
}

export type LastEventType = "price" | "stocks" | null;

const MainPage = () => {
  const storageData = localStorage.getItem("initial-date");
  const [bots, setBots] = useState<IBots[] | null>(null);
  const [http, setHttp] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(40);
  const [openChangingMenu, setOpenChangingMenu] = useState<boolean>(false);
  const [data, setData] = useState<ButtonItemType[] | null>(null);
  const [multi, setMulti] = useState<MultiType | null>(null);
  const [multiTwo, setMultiTwo] = useState<MultiType | null>(null);
  const [items, setItems] = useState<ButtonItemType[] | null>(null);
  const [copy, setCopy] = useState(false);
  const [xData, setXData] = useState<string[]>([]);
  const [yData, setYData] = useState<number[]>([]);
  const [ordersYData, setOrdersYData] = useState<number[]>([]);
  const [cpData, setCpData] = useState<{
    cP: string;
    eX: string;
    pL: string;
    eurRub: string;
    customs: string;
    round: string;
    marg: string | number;
    salesWb: number;
    salesYa: number;
    salesOz: number;
    salesMm: number;
    salesAv: number;
    fixedExp: number;
    quart: number;
    priceIndex: string;
    middlePercent: string;
    minPer: string;
    lS: string;
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
  const [number, setNumber] = useState("");
  const searchByWhatButtons = ["Имя", "Sku"];
  const [searchByWhat, setSearchByWhat] = useState(searchByWhatButtons[0]);
  const [bttnsIndex, setBttnsIndex] = useState<ButtonItemType[]>([]);
  const [notSearchYet, setNotSearchYet] = useState(true);
  const [openBttnModal, setOpenBttnModal] = useState(false);
  const [bottomLeftModale, setBottomLeftModale] = useState("");
  const [answers, setAnswers] = useState<string[]>([]);
  const [deleteField, setDeleteField] = useState("");
  const [agentsField, setAgentsField] = useState("");
  const [promoField, setPromoField] = useState("");
  const [otherField, setOtherField] = useState("");

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

  const getPhrases = async () => {
    try {
      const res = await axios.get("/gPhrases");

      if (!res.data) {
        throw Error();
      }

      const answersArr: string[] = [];
      const answers = res.data.answer[0];
      const keys = Object.keys(answers);
      keys.map((k) => {
        answersArr.push(answers[k]);
      });
      setAnswers(answersArr);
    } catch (error) {
      console.log(error);
    }
  };

  const loadMulti = async () => {
    try {
      const res = await axios.post("/api/getMulti");

      if (!res.data) {
        throw Error();
      }

      setMulti(res.data.multi);
      setMultiTwo(res.data.multi2);
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
  const initialLoad = async () => {
    await loadMulti();
    await loadData();
  };

  const resetInputs = () => {
    setFirstValue("0");
    setSecondValue("0");
    setBoostValue("0");
    setBttnSearcher("");
    setNotSearchYet(true);
    setNumber("");
  };

  const timerHandler = async () => {
    if (
      (!Number(firstValue) &&
        !Number(secondValue) &&
        !Number(boostValue) &&
        number.length == 0 &&
        bttnSearcher.length == 0) ||
      timeLeft < 0
    ) {
      return setTimeLeft(0);
    }

    if (timerInterval.current) {
      clearInterval(timerInterval.current);
      timerInterval.current = null;
    }

    setTimeLeft(40);

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

  const getChartData = async () => {
    try {
      const res = await axios.post<{ result: IChart[] }>("/stocksData", {
        user: localStorage.getItem("pultik-user-login"),
      });
      let x: string[] = [];
      const ordersNumY: number[] = [];
      const precentY: number[] = [];

      const storageDate = localStorage.getItem("initial-date");
      let date: Date = new Date();
      if (storageDate) {
        date = new Date(JSON.parse(storageDate));
      }
      if (res.status == 200) {
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        let countDay = 1;
        let fullDate = `${day < 10 ? `0${day}` : day}.${
          month < 10 ? `0${month}` : month
        }.${year}`;
        let newDate = date;
        res.data.result.map((el, ind) => {
          if (fullDate == el.date) {
            newDate = addDays(date, countDay);
            countDay++;
            const day = newDate.getDate();
            const month = newDate.getMonth() + 1;
            const year = newDate.getFullYear();
            fullDate = `${day < 10 ? `0${day}` : day}.${
              month < 10 ? `0${month}` : month
            }.${year}`;
            x.push(el.date);
            precentY.push(el.middleDayPer ? +el.middleDayPer : +"0");
            ordersNumY.push(el.ordersNum);
          }

          if (res.data.result.length - 1 == ind && x.length < 90) {
            Array.from({ length: 90 - x.length }, (_, i) => {
              const xDate = addDays(newDate, i);
              const day = xDate.getDate();
              const month = xDate.getMonth() + 1;
              const year = xDate.getFullYear();
              fullDate = `${day < 10 ? `0${day}` : day}.${
                month < 10 ? `0${month}` : month
              }.${year}`;
              x.push(fullDate);
            });
          }
        });

        setOrdersYData(
          ordersNumY.concat(Array(90 - ordersNumY.length).fill(0))
        );

        setYData(precentY.concat(Array(90 - precentY.length).fill(0)));
        setXData(x);
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

  const getPrices = async () => {
    try {
      const res = await axios.post<{ massage: number[] }>("/priceData", {
        user: localStorage.getItem("pultik-user-login"),
      });

      if (res.status == 200) {
        setDeleteField(res.data.massage[0].toString());
        setAgentsField(res.data.massage[1].toString());
        setPromoField(res.data.massage[2].toString());
        setOtherField(res.data.massage[3].toString());
      }
    } catch (error) {
      console.log(`Не удалось получить данные с роута "/priceData"`);
    }
  };

  const checkInitialDate = () => {
    if (storageData) {
      if (check90DaysPassed(storageData)) {
        const newDate = addDays(new Date(storageData), 1);
        sendNewInitalDate(newDate);
      } else {
        getChartData();
      }
    } else if (!storageData) {
      const initialDate = new Date("2024-12-28");
      sendNewInitalDate(initialDate);
    }
  };

  const sendNewInitalDate = (newDate?: Date) => {
    const date = newDate ? newDate : new Date();
    const initialDay = date.getDate();
    const initialDonth = date.getMonth() + 1;
    const initialDear = date.getFullYear();
    let fullDate = `${initialDear}-${
      initialDonth < 10 ? `0${initialDonth}` : initialDonth
    }-${initialDay < 10 ? `0${initialDay}` : initialDay}`;
    localStorage.setItem("initial-date", JSON.stringify(fullDate));
    getChartData();
  };

  const check90DaysPassed = (dateString: string): boolean => {
    const initialDate = parseISO(dateString);
    const ninetyDaysLater = addDays(initialDate, 90);
    const currentDate = new Date();
    return isAfter(currentDate, ninetyDaysLater);
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
  const handleCopy = (textToCopy: string) => {
    if (/^[0-9 ()\s]+$/.test(textToCopy)) {
      const resText = textToCopy.replace(/[\s()]/g, "");
      navigator.clipboard
        .writeText(resText)
        .then(() => {
          setCopy(!copy);
        })
        .catch((err) => {
          console.error("Ошибка при копировании текста: ", err);
        });
    } else {
      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          setCopy(!copy);
        })
        .catch((err) => {
          console.error("Ошибка при копировании текста: ", err);
        });
    }
  };

  const SearchBttns = () => {
    const res: ButtonItemType[] = [];
    if (searchByWhat == "Sku") {
      items?.map((bttn) => {
        if (
          bttn.sku?.toLowerCase().includes(bttnSearcher.trim().toLowerCase())
        ) {
          res.push(bttn);
        }
      });
    } else if (searchByWhat == "Имя") {
      items?.map((bttn) => {
        if (
          bttn.fullName
            ?.toLowerCase()
            .includes(bttnSearcher.trim().toLowerCase())
        ) {
          res.push(bttn);
        }
      });
    }
    setBttnsIndex(res);

    if (notSearchYet) {
      setNotSearchYet(false);
    }
  };

  const SetFieldValue = async () => {
    try {
      const res = await axios.post("/priceDataChange", {
        user: localStorage.getItem("pultik-user-login"),
        massage: [deleteField, agentsField, promoField, otherField],
      });
      if (res.status == 200) {
        console.log(res);
        alert('Данные полей обновились!')
      }
    } catch (error) {
      console.log(`Не удалось поменять данные: ${error}`);
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
    checkInitialDate();
  }, []);

  useEffect(() => {
    setInterval(() => {
      initialLoad();
      SelectMonth(localStorage.getItem("piker") || "01");
    }, 5000);
  }, []);

  useEffect(() => {
    getChartData();
  }, []);

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
  }, [bttnSearcher, searchByWhat]);

  // для одного рендеринга
  useEffect(() => {
    getPhrases();
    getPrices();
  }, []);
  useEffect(() => {
    timerHandler();
  }, [firstValue, secondValue, boostValue, bttnSearcher, number]);

  // useEffect(() => {
  //   SetFieldValue();
  // }, [deleteField, agentsField, promoField, otherField]);

  return (
    <AuthCheck>
      {openChangingMenu && (
        <>
          <div id="btn__changing_mobile">
            {tabs.map((item) =>
              item.value == "upDown" ? (
                <img src={upDownImage} alt="" style={{ width: "45px" }} />
              ) : (
                <button
                  key={item.id}
                  className={`btn btn__changing-item${
                    currentTab === item.value ? " active" : ""
                  }`}
                  onClick={() => SetStates(item)}
                >
                  {item.value == 1 || item.value == 2 ? (
                    <WalkingManSVG
                      fill={currentTab != item.value ? "#000" : "#fff"}
                      width="40px"
                    />
                  ) : item.value == 3 ||
                    item.value == 4 ||
                    item.value == 5 ||
                    item.value == 6 ||
                    item.value == 7 ||
                    item.value == 8 ||
                    item.value == 9 ||
                    item.value == 10 ||
                    item.value == 11 ||
                    item.value == 12 ||
                    item.value == 13 ? (
                    <RunnerSVG
                      fill={currentTab != item.value ? "#000" : "#fff"}
                      width="65px"
                    />
                  ) : item.value == 14 ? (
                    <RecyclingSVG
                      fill={currentTab != item.value ? "#000" : "#fff"}
                      width="45px"
                    />
                  ) : (
                    item.value
                  )}
                </button>
              )
            )}
            <button
              className={`btn btn__changing-item${
                currentTab === 15 ? " active" : ""
              }`}
              onClick={() => setCurrentTab(15)}
            >
              <TrashSVG
                strokeColor={currentTab !== 15 ? "#000" : "#fff"}
                width="37px"
              />
            </button>
            <Link
              to={"/save-sell"}
              className={`btn btn__changing-item flex items-center justify-center`}
            >
              <img src={boxImage} alt="box-image" className="w-12" />
            </Link>
            <Link
              to={"/create-button"}
              className={`btn btn__changing-item flex items-center justify-center`}
            >
              <img src={addImage} alt="box-image" className="w-12" />
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
              to={"/problems"}
              className={`btn btn__changing-item flex items-center justify-center`}
            >
              <img src={problemsP} alt="box-image" className="w-16" />
            </Link>
            <Link
              to={"/new"}
              className={`btn btn__changing-item flex items-center justify-center`}
            >
              <img src={houseImage} alt="box-image" className="w-16" />
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
      {window.innerWidth > 450 && (
        <div
          className={`bottom_left_modale ${
            bottomLeftModale == "closed"
              ? "open_bottom_modale"
              : bottomLeftModale == "opened"
              ? "close_bottom_modale"
              : ""
          }`}
        >
          <div className="content">
            <button
              className="modale_bttn"
              onClick={() =>
                setBottomLeftModale(
                  bottomLeftModale == "closed" ? "opened" : "closed"
                )
              }
            >
              <ArrowSVG fill="#000" />
            </button>
            {answers.slice(0, 9).map((a, ind) => {
              const count = Math.ceil(a.length / 35);

              return (
                <div className="answer">
                  {count > 1 ? (
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      {[...Array(count).keys()].map((c) => {
                        if (c + 1 < count) {
                          return (
                            <span>
                              {ind + 1}.{" "}
                              {ind == 8
                                ? a.substring(41 * c, 41 * (c + 1))
                                : a.substring(35 * c, 35 * (c + 1))}
                            </span>
                          );
                        } else {
                          return (
                            <span
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                gap: "7px",
                              }}
                            >
                              {ind == 8
                                ? a.substring(41 * c, 41 * (c + 1))
                                : a.substring(35 * c, 35 * (c + 1))}
                              <span onClick={() => handleCopy(a)}>
                                <svg
                                  style={{
                                    marginTop: "5px",
                                    cursor: "pointer",
                                  }}
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
                                  <rect
                                    width="14"
                                    height="14"
                                    x="8"
                                    y="8"
                                    rx="2"
                                    ry="2"
                                  />
                                  <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                                </svg>
                              </span>
                            </span>
                          );
                        }
                      })}
                    </div>
                  ) : (
                    <>
                      {ind + 1}. {a}
                      <span onClick={() => handleCopy(a)}>
                        <svg
                          style={{ marginBottom: "12px", cursor: "pointer" }}
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
                          <rect
                            width="14"
                            height="14"
                            x="8"
                            y="8"
                            rx="2"
                            ry="2"
                          />
                          <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                        </svg>
                      </span>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
      <Container>
        {window.innerWidth > 600 && (
          <>
            <div className="btn__changing flex items-center justify-center tabs">
              {tabs.map((item) =>
                item.value == "upDown" ? (
                  <img src={upDownImage} alt="" style={{ width: "35px" }} />
                ) : (
                  <Link
                    to={`/${item.value}`}
                    className={`btns-page-btn btn black_svg btn__changing-item flex items-center justify-center${
                      currentTab === item.value ? " active" : ""
                    }`}
                    key={item.id}
                    onClick={() =>
                      item.value != "upDown" ? setCurrentTab(+item.value) : ""
                    }
                  >
                    {item.value == 1 || item.value == 2 ? (
                      <WalkingManSVG
                        fill={currentTab != item.value ? "#000" : "#fff"}
                        width="45px"
                      />
                    ) : item.value == 3 ||
                      item.value == 4 ||
                      item.value == 5 ||
                      item.value == 6 ||
                      item.value == 7 ||
                      item.value == 8 ||
                      item.value == 9 ||
                      item.value == 10 ||
                      item.value == 11 ||
                      item.value == 12 ||
                      item.value == 13 ? (
                      <RunnerSVG
                        fill={currentTab != item.value ? "#000" : "#fff"}
                        width="65px"
                      />
                    ) : item.value == 14 ? (
                      <RecyclingSVG
                        fill={currentTab != item.value ? "#000" : "#fff"}
                        width="45px"
                      />
                    ) : (
                      item.value
                    )}
                    <div className="bttns-count">
                      <span> {(+item.value - 1) * itemsPerPage + 1} </span>
                      <span> {+item.value * itemsPerPage}</span>
                    </div>
                  </Link>
                )
              )}
              <Link
                to={`/${15}`}
                className={`btn black_svg_stroke btn__changing-item flex items-center justify-center${
                  currentTab === 15 ? " active" : ""
                }`}
                key={15}
                onClick={() => setCurrentTab(15)}
              >
                <TrashSVG
                  strokeColor={currentTab !== 15 ? "#000" : "#fff"}
                  width="37px"
                />
              </Link>
              <Link
                to={"/save-sell"}
                className={`btn btn__changing-item flex items-center justify-center`}
              >
                <img src={boxImage} alt="box-image" className="w-12" />
              </Link>
              <Link
                to={"/create-button"}
                className={`btn btn__changing-item flex items-center justify-center`}
              >
                <img src={addImage} alt="box-image" className="w-12" />
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
                to={"/problems"}
                className={`btn btn__changing-item flex items-center justify-center`}
              >
                <img
                  src={problemsP}
                  alt="box-image"
                  style={{ width: "80px" }}
                />
              </Link>
              <Link
                to={"/new"}
                className={`btn btn__changing-item flex items-center justify-center`}
              >
                <img src={houseImage} alt="box-image" className="w-12" />
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
                        edited={el.edited}
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
              <div className="search_by_what_bttns">
                {searchByWhatButtons.map((b) => {
                  return (
                    <div
                      className={`button ${
                        searchByWhat == b ? "active-s-button" : ""
                      }`}
                      onClick={() => setSearchByWhat(b)}
                    >
                      {" "}
                      <span>{b}</span>
                    </div>
                  );
                })}
              </div>
              {window.innerWidth > 400 && (
                <div className="input_search_bttns">
                  <input
                    type="text"
                    className="searcher_input"
                    placeholder="Search"
                    value={bttnSearcher}
                    onChange={(e) =>
                      onlyEnglish(e.target.value, setBttnSearcher)
                    }
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
                <div className="search_by_what_bttns">
                  <div className="button">
                    {" "}
                    <span>Sku</span>
                  </div>
                  <div className="button">
                    {" "}
                    <span>Имя</span>
                  </div>
                </div>
                <input
                  type="text"
                  className="searcher_input"
                  placeholder="Search"
                  value={bttnSearcher}
                  onChange={(e) => onlyEnglish(e.target.value, setBttnSearcher)}
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
            {xData.length > 0 && yData.length > 0 && (
              <div className="main_chart">
                <div className="relative w-full h-full">
                  <LineChart
                    data={{
                      labels: xData,
                      datasets: [
                        {
                          label: "hideTitle",
                          data: yData,
                          backgroundColor: "rgba(54, 162, 235, 0.2)",
                          borderColor: "rgba(54, 162, 235, 1)",
                          borderWidth: 1,
                        },
                      ],
                    }}
                  />
                  <LineChart
                    data={{
                      labels: xData,
                      datasets: [
                        {
                          label: "hideTitle",
                          data: ordersYData,
                          backgroundColor: " rgba(235, 54, 54, 0.2)",
                          borderColor: " rgba(235, 54, 54, 1)",
                          borderWidth: 1,
                        },
                      ],
                    }}
                  />
                </div>
              </div>
            )}

            <div className="inputs_column">
              <div className="field">
                <span>Del:</span>{" "}
                <input
                  type="text"
                  value={deleteField}
                  onChange={(e) =>
                    /^\d*([.,]?\d*)?$/.test(e.target.value)
                      ? setDeleteField(e.target.value)
                      : ""
                  }
                />
              <div className="bttn" onClick={SetFieldValue}>enter</div>
              </div>
              <div className="field">
                <span>Ag:</span>{" "}
                <input
                  type="text"
                  value={agentsField}
                  onChange={(e) =>
                    /^\d*([.,]?\d*)?$/.test(e.target.value)
                      ? setAgentsField(e.target.value)
                      : ""
                  }
                />
              </div>
              <div className="field">
                <span>Pr:</span>{" "}
                <input
                  type="text"
                  value={promoField}
                  onChange={(e) =>
                    /^\d*([.,]?\d*)?$/.test(e.target.value)
                      ? setPromoField(e.target.value)
                      : ""
                  }
                />
              </div>
              <div className="field">
                <span>Oth:</span>{" "}
                <input
                  type="text"
                  value={otherField}
                  onChange={(e) =>
                    /^\d*([.,]?\d*)?$/.test(e.target.value)
                      ? setOtherField(e.target.value)
                      : ""
                  }
                />
              </div>
            </div>

            <MainPageFexp number={number} setNumber={setNumber} />
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
                    Quartal: {cpData.quart} |
                    {cpData.priceIndex.split(",")[1].split("|")[1]} ,{" "}
                    {cpData.priceIndex.split(",")[2]}
                  </p>
                  <p>uS: {localStorage.getItem("pultik-user-login")}</p>
                  <p>
                    {cpData.priceIndex.split(",")[3]} | {cpData.lS}
                  </p>
                  <p>mP: {cpData.minPer}</p>
                </>
              ) : (
                <></>
              )}
            </div>
            <div
              className="w-[100vw] flex items-center justify-center gap-[10px] bots_list overflow-auto"
              style={{ marginTop: "15px" }}
            >
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
        {window.innerWidth < 450 && (
          <div className={`bottom_left_modale_mob`}>
            <div className="content"></div>
          </div>
        )}
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
          byWhat={searchByWhat}
        />
      )}
    </AuthCheck>
  );
};

export default MainPage;
