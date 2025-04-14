import { AuthCheck } from "@/components";

const DPage = () => {
  return (
    <AuthCheck>
      <div className="d_page">
        <div className="first_container">
          <span className="index">1.</span>
          <div className="btns_one">
            <button className="bttn">B</button>
            <button className="bttn">B</button>
          </div>
          <div className="fields">
            <input type="text" className="inpt" />
            <input type="text" className="inpt" />
            <input type="text" className="inpt" />
          </div>
          <div className="bttns_list">
            {[
              9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
            ].map((num) => {
              return <button className="bttn">{num}</button>;
            })}
          </div>
          <div className="p_m_bttns">
            <button className="bttn">+</button>
            <button className="bttn">-</button>
          </div>
        </div>
      </div>
    </AuthCheck>
  );
};

export default DPage;
