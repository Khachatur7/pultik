import { AuthCheck } from "@/components";
import DLine from "@/components/DLine";
import { useState } from "react";

const DPage = () => {
  const [dLines, setDLines] = useState([0]);

  return (
    <AuthCheck>
      <div className="d_page">
        { dLines.map(l=>{
          return <DLine dLines={dLines}
          setDLines={setDLines} index={l}/>
        })}
      </div>
    </AuthCheck>
  );
};

export default DPage;
