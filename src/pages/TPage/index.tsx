import { AuthCheck } from "@/components";
import axios from "@/axios";
import { useEffect } from "react";

const TPage = () => {
  const GetT = async () => {
    try {
      const res = await axios.post("/massages");

      if (res.data) {
        console.log(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetT();
  }, []);

  return (
    <AuthCheck>
      <div className="decr_page"></div>
    </AuthCheck>
  );
};

export default TPage;
