import { AuthCheck } from "@/components";
import DLine from "@/components/DLine";
import { useState } from "react";

const DPage = () => {
  const [dLines, setDLines] = useState(1);

  return (
    <AuthCheck>
      <div className="d_page">
        {Array.from({ length: dLines }, (_, index) => index + 1).map(l=>{
          return <DLine dLines={dLines}
          setDLines={setDLines} index={l}/>
        })}
      </div>
    </AuthCheck>
  );
};

export default DPage;
