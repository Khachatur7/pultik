import { useEffect, useState } from 'react'
import axios from "@/axios";
import { AuthCheck, Container } from '@/components';
import ChartComponent from './ChartComponent';


const ChartsPage = () => {

    const [dates, setDates] = useState<string[] | null>(null);
    const [totalPages, setTotalPages] = useState(1);

    const [dayMargin, setDayMargin] = useState<number[] | null>(null);

    const [ordersNum, setOrdersNum] = useState<number[] | null>(null);

    const [chartDataLeft, setChartDataLeft] = useState<number[] | null>(null);
    
    const [chartDataRight, setChartDataRight] = useState<number[] | null>(null);

    const getChartData = async () => {

        interface ChartDataType {
            aS: number;
            aSp: number;
            date: string;
            oneStockPrice: number;
            dayMargin?: string;
            ordersNum?: number;
            roiMonth?: number;
        }

        try {
            
            const res = await axios.post<{ result: ChartDataType[] }>("/stocksData");

            if (!res.data) {
                throw Error();
            }

            const { data } = res;

            const datesItems = [];
            const dataLeft = [];
            const dataRight = [];
            const dataDayMargin = [];
            const dataOrdersNum = [];

            for (let i = 0; i < data.result.length; i++) {
                const item = data.result[i];

                datesItems.push(item.date);
                dataLeft.push(item.aS || 0);
                dataRight.push(item.aSp || 0);
                dataDayMargin.push(Number(item.dayMargin) || 0);
                dataOrdersNum.push(Number(item.ordersNum) || 0);
            }

            setChartDataLeft(dataLeft);
            setChartDataRight(dataRight);
            setDayMargin(dataDayMargin);
            setOrdersNum(dataOrdersNum);

            setDates(datesItems);

            const totalPagesNum = Math.ceil(datesItems.length / 10);

            setTotalPages(totalPagesNum);

        } catch (error) {
            console.log("Не удалось получить графики");
        }

    }

    useEffect(() => {
        getChartData();
    }, []);

    return (
        <AuthCheck>
            <Container>
                <div className='grid grid-cols-2 gap-8 w-full charts'>
                        <ChartComponent 
                            label="aS"
                            labels={dates}
                            data={chartDataLeft}
                            totalPages={totalPages}
                            isMedian
                        />
                        <ChartComponent 
                            label="aSp"
                            labels={dates}
                            data={chartDataRight}
                            totalPages={totalPages}
                            isMedian
                        />
                        <ChartComponent 
                            label="Day margin"
                            labels={dates}
                            data={dayMargin}
                            totalPages={totalPages}
                            isMedian
                        />
                         <ChartComponent 
                            label="Order num"
                            labels={dates}
                            data={ordersNum}
                            totalPages={totalPages}
                            isMedian
                        />
                </div>
            </Container>
        </AuthCheck>
    )
}

export default ChartsPage