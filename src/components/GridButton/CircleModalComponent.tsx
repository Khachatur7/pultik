import { priceReplaceHandler } from "@/usable";
import { useState } from "react";

export interface MultiType {
    avito: number[];
    ozon: number[];
    tel: string;
    wildberries: number[];
    wildberriesPlus: number;
    yandex: number[];
    mega: number[];
    _id: string;
}

interface CircleModalComponentProps {
    price: number;
    ozonPrice: number;
    wbPrice: number;
    yandexPrice: number;
    avitoPrice: number;
    yandexEPrice: number;
    mmPrice: number;
}

const CircleModalComponent: React.FC<CircleModalComponentProps> = ({
    price,
    ozonPrice,
    wbPrice,
    yandexPrice,
    avitoPrice,
    yandexEPrice,
    mmPrice
}) => {

    const [isActive, setIsActive] = useState(false);

    function onMouseOver() {
        setIsActive(true);
    }

    function onMouseLeave() {
        setIsActive(false);
    }

    if (!price) {
        return <></>;
    }

    return (
        <div className={!isActive  ? "popup__circle" : "popup"} onMouseOver={onMouseOver} onMouseLeave={onMouseLeave}>
            {
                isActive ? 
                    <>
                        <p className="popup__el">Ya: {priceReplaceHandler(yandexPrice)} ₽</p>
                        <p className="popup__el">YaE: {priceReplaceHandler(yandexEPrice)} ₽</p>
                        <p className="popup__el">Av: {priceReplaceHandler(avitoPrice)} ₽</p>
                        <p className="popup__el">Oz: {priceReplaceHandler(ozonPrice)} ₽</p>
                        <p className="popup__el">Wb: {priceReplaceHandler(wbPrice)} ₽</p>
                        <p className="popup__el">Mm: {priceReplaceHandler(mmPrice)} ₽</p>
                    </>
                : 
                    <></>
            }
        </div>
    )

} 

export default CircleModalComponent;