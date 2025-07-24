import { AuthCheck } from "@/components";
import axios from "@/axios";
import { useEffect, useState, useRef } from "react";

interface IMessage {
  massage: string;
  moment: string;
  _id: string;
  sku: string;
}

const EndingGoods = () => {
  const [messagesAccepted, setMessagesAccepted] = useState<boolean>(false);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  const readMessages = localStorage.getItem("ending-good-m");
  const [newMessagesIndex, setNewMessagesIndex] = useState(0);
  const getMessages = async () => {
    try {
      const res = await axios.post("/endingGoods", {
        user: localStorage.getItem("pultik-user-login"),
      });

      if (res.data) {
        if (messages.length < res.data.massage.length) {
          setMessages(res.data.massage);
          !messagesAccepted ? setMessagesAccepted(true) : "";
        }
        localStorage.setItem(
          "ending-good-m",
          JSON.stringify(res.data.massage.length)
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const GoodToBuy = async (sku: string) => {
    try {
      const res = await axios.post("/buyed", {
        sku: sku.trim(),
        user: localStorage.getItem("pultik-user-login"),
      });

      if (res.data) {
        alert(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMessages();
  }, []);

  useEffect(() => {
    const checkNewMessages = setInterval(() => {
      getMessages();
    }, 5000);

    return () => clearInterval(checkNewMessages);
  }, []);

  useEffect(() => {
    if (!readMessages) {
      localStorage.setItem("ending-good-m", JSON.stringify(messages.length));
    } else {
      setNewMessagesIndex(+readMessages);
    }
  }, []);

  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messagesAccepted]);

  return (
    <AuthCheck>
      <div className="header__">
        <span>Нулевые остатки</span>
      </div>
      <div className="decr_page">
        <div className="messages">
          {messages.map((m, ind) => {
            if (ind == newMessagesIndex) {
              return (
                <>
                  <div className="new_messages">Не прочитанны сообщения</div>
                  <div className="message_content" key={m._id}>
                    <div
                      className={`message ${
                        m.massage.length > 90 ? "small_text" : ""
                      }`}
                    >
                      <div className="text">
                        {ind + 1}. {m.massage}
                      </div>
                      <div className="data">{m.moment}</div>
                    </div>
                    <div
                      className={`bought_bttn`}
                      onClick={() => GoodToBuy(m.sku)}
                    >
                      <span>Купил!</span>
                    </div>
                  </div>
                </>
              );
            } else {
              return (
                <>
                  <div className="message_content" key={m._id}>
                    <div
                      className={`message ${
                        m.massage.length > 90 ? "small_text" : ""
                      }`}
                    >
                      <div className="text">
                        {ind + 1}. {m.massage}
                      </div>
                      <div className="data">{m.moment}</div>
                    </div>
                    <div
                      className={`bought_bttn`}
                      onClick={() => GoodToBuy(m.sku)}
                    >
                      <span>Купил!</span>
                    </div>
                  </div>
                </>
              );
            }
          })}
          <div ref={endOfMessagesRef} />
        </div>
      </div>
    </AuthCheck>
  );
};

export default EndingGoods;
