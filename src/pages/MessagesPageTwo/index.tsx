import { AuthCheck } from "@/components";
import axios from "@/axios";
import { useEffect, useState, useRef } from "react";

interface IMessage {
  massage: string;
  moment: string;
  _id: string;
}

const MessagesPageTwo = () => {
  const [messagesAccepted, setMessagesAccepted] = useState<boolean>(false);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  const readMessages = localStorage.getItem("read-messages-two");
  const [newMessagesIndex, setNewMessagesIndex] = useState(0);
  const getMessages = async () => {
    try {
      const res = await axios.post("/massages2", {
        user: localStorage.getItem("pultik-user-login"),
      });

      if (res.data) {
        if (messages.length < res.data.massage.length) {
          setMessages(res.data.massage);
          !messagesAccepted ? setMessagesAccepted(true) : "";
        }
        localStorage.setItem(
          "read-messages-two",
          JSON.stringify(res.data.massage.length)
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const PrintMessage = async (text: string) => {
    const orderNum = text.split("|")[3];
    try {
      const res = await axios.post("/printOzonLbl", {
       orderNum: orderNum.trim(),
        user: localStorage.getItem("pultik-user-login"),
      });

      if (res.data) {
        alert(res.data.massage);
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
      localStorage.setItem(
        "read-messages-two",
        JSON.stringify(messages.length)
      );
    } else {
      setNewMessagesIndex(+readMessages);
    }
  }, []);
console.log(messages);

  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messagesAccepted]);

  return (
    <AuthCheck>
        <div className="header__">
          <span>Заказы готовые для самостоятельной отгрузки</span>
        </div>
      <div className="decr_page_two">
        <div className="messages">
          {messages.map((m, ind) => {
            if (ind != newMessagesIndex) {
              return (
                <>
                  <div className="message_content" key={ind+100}>
                    <div className="message">
                      <div className="text">
                        {ind + 1}. {m.massage}
                      </div>
                      {/* <div className="data">{m.moment}</div> */}
                    </div>
                    <div
                    className="print_bttn"
                    onClick={() => PrintMessage(m.massage)}
                  >
                    <span>Напечатать ярлык</span>
                  </div>
                  </div>
                </>
              );
            } else {
              return (
                <>
                  <div className="new_messages">Не прочитанны сообщения</div>
                    <div className="message_content" key={m._id}>
                  <div className="message">
                    <div className="text">
                      <span>{ind + 1}.</span> <span>{m.massage}</span>
                    </div>
                    {/* <div className="data">{m.moment}</div> */}
                  </div>
                  <div
                    className="print_bttn"
                    onClick={() => PrintMessage(m.massage)}
                  >
                    <span>Напечатать ярлык</span>
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

export default MessagesPageTwo;
