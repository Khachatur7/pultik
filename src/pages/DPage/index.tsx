import { AuthCheck } from "@/components";
import DLine from "@/components/DLine";
import { useEffect, useState } from "react";
import axios from "@/axios";

interface Decr {
  avitoId: string;
  decr: string;
  price: string;
  step: string;
}

const DPage = () => {
  const [dLines, setDLines] = useState<Decr[]>([]);

  const getDecrs = async () => {
    try {
      const res = await axios.post("/readDecr", {
        user: localStorage.getItem("pultik-user-login"),
      });
      if (res.status == 200) {
        setDLines(res.data.massage);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDecrs();
  }, [dLines]);
  return (
    <AuthCheck>
      <div className="d_page">
        {dLines.map((d) => {
          return <DLine dLines={dLines} dLine={d} setDLines={setDLines} />;
        })}
      </div>
    </AuthCheck>
  );
};

export default DPage;
