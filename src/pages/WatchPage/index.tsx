import { InfoBlockParser } from "@/components"
import { infoBlockItems } from "@/store/useBotsStore";
import { useEffect, useState } from "react";

const WatchPage = () => {

  const [bots, setBots] = useState();

  useEffect(() => {
    fetch("https://hjklhkjlhkljhpjhkhddhgfdghfdgfcycffgh.ru:2999/pultikMon")
      .then((res) => res.json())
      .then((res) => setBots(res.answer));
  }, []);


  return (
    <div className="flex items-start justify-center gap-12 px-10 pt-16 h-full watch_page_list">
       <div className="watch_page_column">
        
         {/* Если данные получены */}
         {bots &&
          infoBlockItems.map((item, index) => {
            if (item.page == "bots") {
              return (
                <InfoBlockParser
                  key={item.text + index}
                  bot={bots[index - 1]}
                  text={item.text}
                  isLast
                />
              );
            }
          })}
        {/* Если данные не получены */}
        {!bots &&
          infoBlockItems.map((item, index) => {
            if (item.page == "bots") {
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
      {/* <div className="flex flex-col gap-12 watch_page_column">
        {
          bots.filter(el => el.page === "bots").slice(10).map((item) => (
            <InfoBlockParser 
                key={item.id}
                bot={item}
                isLast
            />
          ))
        }
      </div> */}
    </div>
  )
}

export default WatchPage