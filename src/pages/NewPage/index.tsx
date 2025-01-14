import { AuthCheck, Container, GridButton } from "@/components";
import { MultiType } from "@/components/GridButton/CircleModalComponent";
import { ButtonItemType, LastButtonType } from "@/types/common";
import { useEffect, useState } from "react";
import { dataFilterHandler } from "@/handlers";
import axios from "@/axios";
// import { Link, useParams } from "react-router-dom";
// import boxImage from "@/images/boxX.png";
// import addImage from "@/images/add.png";
// import chartPageImage from "@/images/chart-page-icon.png";
// import eyeImage from "@/images/eyePng.png";
// import roiImage from "@/images/roi.png";
// import problemsP from "@/images/new.jpg";
// import houseImage from "@/images/house.png";
// import { useState } from "react";
// import { nanoid } from "nanoid";

const NewPage = () => {
  //   const { id } = useParams();
  //   const [currentTab, setCurrentTab] = useState(id ? +id : 1);
  //   const [openChangingMenu, setOpenChangingMenu] = useState<boolean>(false);
  //   const tabs = [
  //     {
  //       id: nanoid(),
  //       value: 1,
  //     },
  //     {
  //       id: nanoid(),
  //       value: 2,
  //     },
  //     {
  //       id: nanoid(),
  //       value: 3,
  //     },
  //     {
  //       id: nanoid(),
  //       value: 4,
  //     },
  //     {
  //       id: nanoid(),
  //       value: 5,
  //     },
  //     {
  //       id: nanoid(),
  //       value: 6,
  //     },
  //     {
  //       id: nanoid(),
  //       value: 7,
  //     },
  //   ];
  const buttonsArray = [...Array(9)];
  const [items, setItems] = useState<ButtonItemType[] | null>(null);
  const [multiTwo, setMultiTwo] = useState<MultiType | null>(null);
  const [_, setLastButton] = useState<LastButtonType | null>(null);
  const [copy, setCopy] = useState(false);

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

      setItems(
        itemsButtons.sort((a: ButtonItemType, b: ButtonItemType) => a.i - b.i)
      );
    } catch (error) {
      setMultiTwo(null);
    }
  };

useEffect(()=>{
 loadData()
},[])

  return (
    <AuthCheck>
      {/* {openChangingMenu && (
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
      )} */}
      <Container>
        {/* {window.innerWidth < 600 && (
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
        )} */}
        <div className="btn__wrapper">
          {items && items.length ? (
            <>
              {buttonsArray.slice(0, 9).map((_, index: number) => {
                const itemIndex = index + 1 + 0 * 9;

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
                    multi={null}
                    multiTwo={multiTwo}
                    comValue={el.com}
                    firstValue={"0"}
                    secondValue={"0"}
                    boolValue={el.bool}
                    h={el.h}
                    i={el.i}
                    sku={el.sku}
                    setLastButton={setLastButton}
                    percent={el.percent}
                    lastEvent={null}
                    basePrices={{
                      avito: el.avPrice,
                      mega: el.mmPrice,
                      ozon: el.ozPrice,
                      wb: el.wbPrice,
                      yaE: el.yaEPrice,
                      ya: el.yaPrice,
                    }}
                    fStocks={el.fStocks}
                    boostValue={"0"}
                    boostInitial={el.boost}
                    wBar={el.wBar}
                    cp={el.cP}
                    cust={el.cust}
                    copy={copy}
                    setCopy={setCopy}
                    wStocks={el.wStocks}
                    hideModales={true}
                  />
                );
              })}
            </>
          ) : (
            <></>
          )}
        </div>
      </Container>
    </AuthCheck>
  );
};

export default NewPage;
