import { AuthCheck, Container } from "@/components";
import { useEffect, useState } from "react";
import axios from "@/axios";

interface ReadButton {
  date: number;
  g: string;
  p: number;
  r: string;
  sum: number;
  tel: string;
  _id: string;
}

const NewPage = () => {
  const [items, setItems] = useState<ReadButton[] | null>(null);

  const loadData = async () => {
    try {
      const res = await axios.get("/gRead");

      if (!res.data) {
        throw Error();
      }

      setItems(
        res.data.data.sort((a: ReadButton, b: ReadButton) => a.date - b.date)
      );
    } catch (error) {
      console.log(error);
    }
  };

  console.log(items);

  const stockValueHandler = (p: number) => {
    switch (p) {
      case 0:
        return "grid_bttn_red";

      case 1:
        return "grid_bttn_green";

      default:
        return "";
    }
  };
  useEffect(() => {
    loadData();
  }, []);

  return (
    <AuthCheck>
      <Container>
        <></>
        <div className="btn__wrapper">
          {items &&
            items?.length > 0 &&
            items.map((el) => {
              return (
                <div className="btn__cont">
                  <button
                    className={`btn _hover ${stockValueHandler(el.p)}`}
                    // onClick={getPrice}
                    // disabled={isDisabled}
                  >
                    <p style={{fontSize:"21px"}}>
                      {" "}
                      {el.date} | {el.g} | {el.r} 
                    </p>
                    <p style={{fontWeight:"700",fontSize:"22px"}}>{el.sum}</p>
                  </button>
                </div>
              );
            })}
        </div>
      </Container>
    </AuthCheck>
  );
};

export default NewPage;
