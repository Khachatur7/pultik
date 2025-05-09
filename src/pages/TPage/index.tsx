import { AuthCheck } from "@/components";
import axios from "@/axios";
import { useEffect, useState } from "react";

interface IMessage {
  massage: string;
  moment: string;
  _id: string;
}

const TPage = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);

  const getMessages = async () => {
    try {
      const res = await axios.post("/massages");

      if (res.data) {
        console.log(res.data.massage);
        setMessages(res.data.massage);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMessages();
  }, []);

  return (
    <AuthCheck>
      <div className="decr_page">
        <div className="messages">
          {messages.map((m, ind) => {
            return (
              <div className="message">
                <div className="text">
                  {ind}.{m.massage}
                </div>
                <div className="data">{m.moment}</div>
              </div>
            );
          })}
        </div>
      </div>
    </AuthCheck>
  );
};

export default TPage;
