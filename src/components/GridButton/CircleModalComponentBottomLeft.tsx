import { useState } from "react";

interface CircleModalComponentBottomLeftProps {
    cust?: number;
}

const CircleModalComponentBottomLeft: React.FC<CircleModalComponentBottomLeftProps> = ({
    cust
}) => {

    const [isActive, setIsActive] = useState(false);

    function onMouseOver() {
        setIsActive(true);
    }

    function onMouseLeave() {
        setIsActive(false);
    }

    return (
        <div className={`${!isActive  ? "popup__circle" : "popup"} bottom-left`} onMouseOver={onMouseOver} onMouseLeave={onMouseLeave}>
            {
                isActive ? 
                    <>
                        <p className="popup__el">cust: {cust || 0}</p>
                        <p className="popup__el">...</p>
                        <p className="popup__el">...</p>
                        <p className="popup__el">...</p>
                        <p className="popup__el">...</p>
                    </>
                : 
                    <></>
            }
        </div>
    )

} 

export default CircleModalComponentBottomLeft;