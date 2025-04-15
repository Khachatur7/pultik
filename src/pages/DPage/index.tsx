import { transliterationMap } from "@/common";
import { AuthCheck } from "@/components";
import { useState } from "react";

const DPage = () => {
  const [price, setPrice] = useState("");
  const [decr, setDecr] = useState("");
  const [avitoId, setAvitoId] = useState("");

  const OnlyNumberChange = (
    text: string,
    setState: React.Dispatch<React.SetStateAction<string>>
  ) => {
    if (/^\d*$/.test(text)) {
      setState(text);
    }
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
  return (
    <AuthCheck>
      <div className="d_page">
        <div className="first_container">
          <span className="index">1.</span>
          <div className="btns_one">
            <button className="bttn">
              <svg
                width="40px"
                height="40px"
                viewBox="-1 0 12 12"
                version="1.1"
              >
                <g
                  id="Page-1"
                  stroke="none"
                  stroke-width="1"
                  fill="none"
                  fill-rule="evenodd"
                >
                  <g
                    id="Dribbble-Light-Preview"
                    transform="translate(-65.000000, -3803.000000)"
                    fill="#000000"
                  >
                    <g id="icons" transform="translate(56.000000, 160.000000)">
                      <path
                        d="M18.074,3650.7335 L12.308,3654.6315 C10.903,3655.5815 9,3654.5835 9,3652.8985 L9,3645.1015 C9,3643.4155 10.903,3642.4185 12.308,3643.3685 L18.074,3647.2665 C19.306,3648.0995 19.306,3649.9005 18.074,3650.7335"
                        id="play-[#1000]"
                      ></path>
                    </g>
                  </g>
                </g>
              </svg>
            </button>
            <button className="bttn">
              <svg width="40px" height="40px" viewBox="0 0 28 28" version="1.1">
                <g
                  id="Page-1"
                  stroke="none"
                  stroke-width="1"
                  fill="none"
                  fill-rule="evenodd"
                >
                  <g
                    id="Icon-Set-Filled"
                    transform="translate(-520.000000, -571.000000)"
                    fill="#000000"
                  >
                    <path
                      d="M546,571 L522,571 C520.896,571 520,571.896 520,573 L520,597 C520,598.104 520.896,599 522,599 L546,599 C547.104,599 548,598.104 548,597 L548,573 C548,571.896 547.104,571 546,571"
                      id="stop"
                    ></path>
                  </g>
                </g>
              </svg>
            </button>
          </div>
          <div className="fields">
            <label>Label</label>
            <input
              type="text"
              className="inpt frst"
              placeholder="AvitoId"
              value={avitoId}
              onChange={(e) => onlyEnglish(e.target.value, setAvitoId)}
            />
            <input
              type="text"
              className="inpt"
              placeholder="Price"
              value={price}
              onChange={(e) => OnlyNumberChange(e.target.value, setPrice)}
            />
            <input
              type="text"
              className="inpt"
              placeholder="Decr"
              value={decr}
              onChange={(e) => OnlyNumberChange(e.target.value, setDecr)}
            />
          </div>
          <div className="bttns_list">
            {[
              9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
            ].map((num) => {
              return <button className="bttn">{num}</button>;
            })}
          </div>
          <div className="p_m_bttns">
            <button className="bttn">+</button>
            <button className="bttn">-</button>
          </div>
        </div>
      </div>
    </AuthCheck>
  );
};

export default DPage;
