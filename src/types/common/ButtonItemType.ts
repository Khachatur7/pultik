import { ComValueType } from "../api";

interface ButtonItemType {
    _id: string;
    tel: string;
    qinReactTime: number;
    qinCoeff: number;
    avitoId: number;
    basePrice: number;
    sku: string;
    stocks: number;
    bool: number;
    fullName: string;
    i: number;
    com?: ComValueType;
    percent:number;
    avPrice: number;
    mmPrice: number;
    ozPrice: number;
    wbPrice: number;
    yaEPrice: number;
    yaPrice: number;
    fStocks?: number;
    boost?: number; 
    wBar: string;
    cP: number;
    cust?: number;
    h?:boolean | undefined
}

export default ButtonItemType;