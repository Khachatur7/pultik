import { useEffect, useState } from "react";
import { AuthCheck, Container, ToggleComponent } from "@/components";
import { toast } from "react-toastify";
import axios from "@/axios";
import { useNavigate } from "react-router-dom";

const ButtonCreatePage = () => {
  const navigate = useNavigate();

  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  // const [fullName, setFullName] = useState("");
  const [remainder, setRemainder] = useState("1");
  const [basePrice, setBasePrice] = useState("000");
  const [sku, setSku] = useState("");
  const [aaid, setAaid] = useState("0");
  const [vart, setVart] = useState("0");
  const [wBar, setWBar] = useState("0");
  const [oName, setOName] = useState("1");
  const [type, setType] = useState<string>("tel");
  const [cust, setCust] = useState("0");
  const [loading, setLoading] = useState(false);
  const [v, setV] = useState("15");
  const [s, setS] = useState("35");
  const [g, setG] = useState("25");
  const [h, setH] = useState(false);
  const lS = "{";
  const rS = "}";
  const lT = "[";
  const rT = "]";
  const i = localStorage.getItem("i");
  const [keyField, setKeyField] = useState<string>(i ? "i" : "");
  const [nameField, setNameField] = useState<string>(i ? i : "");
  const [nameFieldType, setNameFieldType] = useState<string>("number");
  const [dataField, setDataField] = useState<string>("");
  const [dataCompare, setDataCompare] = useState<string[]>();
  const [changedData, setChangedData] = useState<string>();
  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (loading) {
      return;
    }

    if (!number.trim() || isNaN(Number(number))) {
      return toast.warning("Введите номер");
    }

    if (!name.trim()) {
      return toast.warning("Введите название");
    }

    // if (!fullName.trim()) {
    //   return toast.warning("Введите полное название кнопки");
    // }

    if (!remainder.trim()) {
      return toast.warning("Введите остаток");
    }

    if (!basePrice.trim() || isNaN(Number(basePrice))) {
      return toast.warning("Введите цену");
    }

    if (!sku.trim()) {
      return toast.warning("Введите ЯСКУ и ОСКУ");
    }

    if (!aaid.trim()) {
      return toast.warning("Введите ААЙДИ");
    }

    if (!vart.trim()) {
      return toast.warning("Введите Варт");
    }

    if (!wBar.trim()) {
      return toast.warning("Введите ВБар");
    }

    if (!oName.trim()) {
      return toast.warning("Введите ОИмя");
    }

    try {
      setLoading(true);

      //     const res = await axios.post(`/cCom/${number}/${name}/${fullName}/${remainder}/${basePrice}/${sku}/${oName}/${vart}/${wBar}/${aaid}/${type}/${bool}`, {

      const res = await axios.post(`/cCom/`, {
        number: number,
        name: name,
        // fullName: fullName,
        remainder: remainder,
        basePrice: basePrice,
        sku: sku,
        oName: oName,
        vart: vart,
        wBar: wBar,
        aaid: aaid,
        type: type,
        s: Number(s),
        v: Number(v),
        g: Number(g),
        h: h,
        cust,
        user: localStorage.getItem("pultik-user-login"),
      });

      if (res.status !== 200 || !res.data || !res.data.complete) {
        throw Error();
      }

      alert(res.data.complete);

      navigate("/");
    } catch (error) {
      toast.error("Не удалось создать кнопку");
    } finally {
      setLoading(false);
    }
  };

  const changeNameField = (text: string) => {
    if (nameFieldType == "string") {
      return setNameField(text);
    } else if (nameFieldType == "number") {
      if (/^\d*$/.test(text)) {
        return setNameField(text);
      }
    }
  };

  const postNameRequest = async () => {
    try {
      const res = await axios.post("/mongoReq", {
        user: localStorage.getItem("pultik-user-login"),
        arr: [
          keyField.trim(),
          nameFieldType == "string" ? nameField.trim() : +nameField.trim(),
        ],
      });

      if (res.status == 200) {
        setDataField(JSON.stringify(res.data.answer[0], null, 2));
        setDataCompare(JSON.stringify(res.data.answer[0]).split(","));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const sendChangedData = async () => {
    try {
      const res = await axios.post("/mongoData", {
        user: localStorage.getItem("pultik-user-login"),
        arr: [
          keyField.trim(),
          nameFieldType == "string" ? nameField.trim() : +nameField.trim(),
        ],
        dict: JSON.parse(`{${changedData}}`),
      });

      if (res.status == 200) {
        alert("Данные изменены!");
      }
    } catch (error) {
      alert("Не удалось изменить данные");
    }
  };

  const checkChangedData = () => {
    let changedFieldData = JSON.stringify(JSON.parse(dataField)).split(",");
    dataCompare?.map((el, ind) => {
      if (el != changedFieldData[ind]) {
        setDataCompare(changedFieldData);
        setChangedData(changedFieldData[ind].replace(/[{}]/g, ""));
      }
    });
  };

  const toggleNameValueType = () => {
    if (nameFieldType == "string") {
      setNameFieldType("number");
      setNameField(nameField.replace(/[^0-9]/g, ""));
    } else {
      setNameFieldType("string");
    }
  };

  useEffect(() => {
    if (changedData) {
      sendChangedData();
    }
  }, [changedData]);

  useEffect(() => {
    if (i) {
      postNameRequest();
      localStorage.removeItem("i");
    }
  }, []);
  return (
    <AuthCheck>
      <Container>
        <div className="flex flex-col w-full">
          <form
            className="input__wrapper input__login"
            onSubmit={submitHandler}
          >
            <div className="form_field">
              <span className="text-2xl">Номер кнопки</span>
              <input
                className="create_page_item"
                type="number"
                maxLength={3}
                max={999}
                value={number}
                onChange={(e) => {
                  const value = e.target.value;

                  if (value.length > 3) {
                    return;
                  }

                  setNumber(value);
                }}
                style={{ marginTop: 0 }}
              />
            </div>
            <div className="form_field">
              <span className="text-2xl">Название в БД</span>
              <input
                className="create_page_item"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ marginTop: 0 }}
              />
            </div>
            {/* <input
              className="create_page_item"
              type="text"
              placeholder="Полное название"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              style={{ marginTop: 0 }}
            /> */}
            <div className="form_field">
              <span className="text-2xl">Продав. остаток</span>
              <input
                className="create_page_item"
                type="number"
                value={remainder}
                onChange={(e) => setRemainder(e.target.value)}
                style={{ marginTop: 0 }}
              />
            </div>
            <div className="form_field">
              <span className="text-2xl">Базовая цена</span>
              <input
                className="create_page_item"
                type="number"
                value={basePrice}
                onChange={(e) => setBasePrice(e.target.value)}
                style={{ marginTop: 0 }}
              />
            </div>
            <div className="form_field">
              <span className="text-2xl">Яску, Оску, Мску</span>
              <input
                className="create_page_item"
                type="text"
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                style={{ marginTop: 0 }}
              />
            </div>
            <div className="form_field">
              <span className="text-2xl">Фактич. остаток</span>
              <input
                className="create_page_item"
                type="number"
                value={oName}
                onChange={(e) => setOName(e.target.value)}
                style={{ marginTop: 0 }}
              />
            </div>
            <div className="form_field">
              <span className="text-2xl">Варт</span>
              <input
                className="create_page_item"
                type="text"
                value={vart}
                onChange={(e) => setVart(e.target.value)}
                style={{ marginTop: 0 }}
              />
            </div>

            <div className="form_field">
              <span className="text-2xl">Вбар</span>
              <input
                className="create_page_item"
                type="text"
                value={wBar}
                onChange={(e) => setWBar(e.target.value)}
                style={{ marginTop: 0 }}
              />
            </div>
            <div className="form_field">
              <span className="text-2xl">Аайди</span>
              <input
                className="create_page_item"
                type="text"
                value={aaid}
                onChange={(e) => setAaid(e.target.value)}
                style={{ marginTop: 0 }}
              />
            </div>
            <div className="form_field">
              <span className="text-2xl">Тип</span>
              <select
                className={"h-[55px] rounded-[12px] text-2xl create_page_item"}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="tel">tel</option>
                <option value="stroy">stroy</option>
                <option value="print">print</option>
                <option value="zvuk">zvuk</option>
                <option value="fen">fen</option>
              </select>
            </div>
            <div className="form_field">
              <span className="text-2xl">Там. налог</span>
              <input
                className="create_page_item"
                type="number"
                value={cust}
                onChange={(e) => setCust(e.target.value)}
                style={{ marginTop: 0 }}
              />
            </div>
            <div className="form_field">
              <span className="text-2xl">Пустой</span>
              <select
                className={"h-[55px] rounded-[12px] text-2xl create_page_item"}
                onChange={(e) => setH(Boolean(e.target.value))}
              >
                <option value="false">false</option>
                <option value="true">true</option>
              </select>
            </div>
            <div className="form_field">
              <span className="text-2xl">ШВГ</span>
              <div className="grid grid-cols-3 gap-1">
                <input
                  className="create_page_item"
                  type="number"
                  placeholder="Ш"
                  value={s}
                  onChange={(e) => setS(e.target.value)}
                  style={{ marginTop: 0 }}
                />
                <input
                  className="create_page_item"
                  type="number"
                  placeholder="В"
                  value={v}
                  onChange={(e) => setV(e.target.value)}
                  style={{ marginTop: 0 }}
                />
                <input
                  className="create_page_item"
                  type="number"
                  placeholder="Г"
                  value={g}
                  onChange={(e) => setG(e.target.value)}
                  style={{ marginTop: 0 }}
                />
              </div>
            </div>
            <button
              type="submit"
              className="btn create_page_item form_bttn"
              disabled={loading}
            >
              Создать
            </button>
            {/* {(window.innerWidth <= 2200 && window.innerWidth >= 2140) ||
              (window.innerWidth <= 1930 && window.innerWidth >= 1795) ||
              (window.innerWidth <= 1600 && window.innerWidth >= 1520) ||
              (window.innerWidth <= 1450 && window.innerWidth >= 1260) ? (
              <>
                <button
                  type="submit"
                  className="btn create_page_item"
                  disabled={loading}
                >
                  Создать
                </button>
                <select
                  className={
                    "h-[55px] rounded-[12px] text-2xl create_page_item"
                  }
                  onChange={(e) => setH(Boolean(e.target.value))}
                >
                  <option value="false">false</option>
                  <option value="true">true</option>
                </select>
              </>
            ) : (
              <>
                <select
                  className={
                    "h-[55px] rounded-[12px] text-2xl create_page_item"
                  }
                  onChange={(e) => setH(Boolean(e.target.value))}
                >
                  <option value="false">false</option>
                  <option value="true">true</option>
                </select>
                <button
                  type="submit"
                  className="btn create_page_item"
                  disabled={loading}
                >
                  Создать
                </button>
              </>
            )} */}
          </form>

          <p className="relative text-2xl mt-[25px] warning_text">
            !!! Фактический остаток всегда более или равен продаваемому остатку
            !!! Продаваемый остаток не должен быть более двух !!!
          </p>
          <p className="relative text-4xl mt-[25px] text-right about_sku">
            !!! SKU Яндекса, Озона и ММ должны совпадать!!!
          </p>
          <div className="api_data_section">
            <div className="section_field">
              <label htmlFor="key_input">Запрос:</label>
              <div className="section_field_inputs">
                <div className="key_field">
                  <span>{lS}</span>
                  <input
                    type="text"
                    className="key_input"
                    id="key_input"
                    name="key_input"
                    value={keyField}
                    onChange={(e) => setKeyField(e.target.value)}
                  />
                </div>
                :
                <div className="name_field">
                  <input
                    type="text"
                    className="name_input"
                    id="name_input"
                    name="name_input"
                    value={nameField}
                    onChange={(e) => changeNameField(e.target.value)}
                  />
                  <span>{rS}</span>
                </div>
                <button className="send_name_bttn" onClick={postNameRequest}>
                  <span>Отправить</span>
                </button>
                <ToggleComponent
                  isOpened={nameFieldType == "number" ? true : false}
                  onClick={toggleNameValueType}
                />
              </div>
            </div>
            <div className="section_field">
              <label htmlFor="data_input">Данные:</label>
              <div className="data_field">
                <div className="lt">
                  <span>{lT}</span>
                </div>
                <textarea
                  className="data_input"
                  id="data_input"
                  name="data_input"
                  value={dataField}
                  onChange={(e) => setDataField(e.target.value)}
                />
                <div className="rt">
                  <span>{rT}</span>
                </div>
              </div>
            </div>
            <button className="change_data_bttn" onClick={checkChangedData}>
              <span>Изменить</span>
            </button>
          </div>
        </div>
      </Container>
    </AuthCheck>
  );
};

export default ButtonCreatePage;
