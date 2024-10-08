import { useState } from "react";
import { AuthCheck, Container } from "@/components";
import { toast } from "react-toastify";
import axios from "@/axios";
import { useNavigate } from "react-router-dom";

const ButtonCreatePage = () => {
  const navigate = useNavigate();

  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [fullName, setFullName] = useState("");
  const [remainder, setRemainder] = useState("");
  const [basePrice, setBasePrice] = useState("");
  const [sku, setSku] = useState("");
  const [aaid, setAaid] = useState("");
  const [vart, setVart] = useState("");
  const [wBar, setWBar] = useState("");
  const [oName, setOName] = useState("");
  const [type, setType] = useState<string>("tel");
  const [cust, setCust] = useState("");
  const [loading, setLoading] = useState(false);
  const [v, setV] = useState("");
  const [s, setS] = useState("");
  const [g, setG] = useState("");
  const [h, setH] = useState(false);

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

    if (!fullName.trim()) {
      return toast.warning("Введите полное название кнопки");
    }

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
        fullName: fullName,
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

  return (
    <AuthCheck>
      <Container>
        <div className="flex flex-col w-full">
          <form
            className="input__wrapper input__login"
            onSubmit={submitHandler}
          >
            <input
              className="create_page_item"
              type="number"
              placeholder="Номер кнопки"
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
            <input
              className="create_page_item"
              type="text"
              placeholder="Название в БД"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ marginTop: 0 }}
            />
            <input
              className="create_page_item"
              type="text"
              placeholder="Полное название"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              style={{ marginTop: 0 }}
            />
            <input
              className="create_page_item"
              type="number"
              placeholder="Продаваемый остаток"
              value={remainder}
              onChange={(e) => setRemainder(e.target.value)}
              style={{ marginTop: 0 }}
            />
            <input
              className="create_page_item"
              type="number"
              placeholder="Базовая цена"
              value={basePrice}
              onChange={(e) => setBasePrice(e.target.value)}
              style={{ marginTop: 0 }}
            />
            <input
              className="create_page_item"
              type="text"
              placeholder="Яску, Оску, Мску"
              value={sku}
              onChange={(e) => setSku(e.target.value)}
              style={{ marginTop: 0 }}
            />
            <input
              className="create_page_item"
              type="number"
              placeholder="Фактический остаток"
              value={oName}
              onChange={(e) => setOName(e.target.value)}
              style={{ marginTop: 0 }}
            />
            <input
              className="create_page_item"
              type="text"
              placeholder="Варт"
              value={vart}
              onChange={(e) => setVart(e.target.value)}
              style={{ marginTop: 0 }}
            />

            <input
              className="create_page_item"
              type="text"
              placeholder="Вбар"
              value={wBar}
              onChange={(e) => setWBar(e.target.value)}
              style={{ marginTop: 0 }}
            />
            <input
              className="create_page_item"
              type="text"
              placeholder="Аайди"
              value={aaid}
              onChange={(e) => setAaid(e.target.value)}
              style={{ marginTop: 0 }}
            />
            <select
              className={"h-[55px] rounded-[12px] text-2xl create_page_item"}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="tel">tel</option>
              <option value="stroy">stroy</option>
              <option value="print">print</option>
            </select>
            <input
              className="create_page_item"
              type="number"
              placeholder="Там. налог"
              value={cust}
              onChange={(e) => setCust(e.target.value)}
              style={{ marginTop: 0 }}
            />
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

            {(window.innerWidth <= 2200 && window.innerWidth >= 2140) ||
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
            )}
          </form>

          <p className="relative text-2xl mt-[25px] warning_text">
            !!! Фактический остаток всегда более или равен продаваемому остатку
            !!! Продаваемый остаток не должен быть более двух !!!
          </p>
          <p className="relative text-4xl mt-[25px] text-right about_sku">
            !!! SKU Яндекса, Озона и ММ должны совпадать!!!
          </p>
        </div>
      </Container>
    </AuthCheck>
  );
};

export default ButtonCreatePage;
