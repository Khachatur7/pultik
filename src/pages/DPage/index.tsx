import { AuthCheck } from "@/components";
import DLine from "@/components/DLine";
import { useEffect, useState } from "react";
import axios from "@/axios";

interface Decr {
  avitoId: string;
  avitoId2: string;
  decr: string;
  price: string;
  step: string;
}

const DPage = () => {
  const [dLines, setDLines] = useState<Decr[]>([]);
  const [update,setUpdate] = useState(false)
  const getDecrs = async () => {
    try {
      const res = await axios.post("/readDecr", {
        user: localStorage.getItem("pultik-user-login"),
      });
      if (res.status == 200) {
        console.log(res.data.massage);
        setDLines(res.data.massage);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDecrs()
  }, [update]);

  return (
    <AuthCheck>
      <div className="d_page">
        {dLines.map((d) => {
          return <DLine dLines={dLines} dLine={d} setUpdate={setUpdate} />;
        })}
      </div>
    </AuthCheck>
  );
};

export default DPage;
