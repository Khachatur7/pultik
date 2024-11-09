import closeImg from "@/images/close-svgrepo-com.svg";
import { ButtonItemType } from "@/types/common";

interface ModalBttns {
  bttns: ButtonItemType[];
  closeModule: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalSearchRes: React.FC<ModalBttns> = ({ bttns, closeModule }) => {
  const DetermineBackgroundColor = (bttn: ButtonItemType) => {

    if (!bttn.fStocks) {
      return "button-gradient";
    }

    if (bttn.fStocks >= 4) {
      return "green";
    } else if (bttn.fStocks < 0) {
      return "black";
    }

    switch (bttn.fStocks) {
      case 1:
        return "red";

      case 2:
        return "yellow";

      case 3:
        return "blue";

      default:
        return "";
    }
  };

  return (
    <div className="bttns_modal_res">
      <div className="close_bttns_modal" onClick={() => closeModule(false)}>
        <img src={closeImg} alt="" />
      </div>
      <div className="bttns_list">
        {bttns.map((el) => {
          return (
            <div
              className={`bttn_index ${
                DetermineBackgroundColor(el) 
              }`}
              key={el._id}
            >
              {el.i}. {el.fullName}
            </div>
          );
        })}
      </div>
      {bttns.length == 0 && (
        <>
          <div className="bttns_not_found">
            <span>NOT FOUND</span>
          </div>
        </>
      )}
    </div>
  );
};

export default ModalSearchRes;
