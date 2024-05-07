import { useCallback, useMemo } from 'react';

export const useFormatData = ({ data, keyIndex, period }: {data: unknown, keyIndex: string, period?: string}) => {

    const getLabel = useCallback((stockDate: string) => {
        if (!period || period === 'FX_MONTHLY'){
            const date =  new Date(stockDate);
            const month = date.toLocaleString('default', { month: 'short' });
            const year = date.getFullYear();
            return `${month} ${year}`;
        }
        if (period === 'FX_WEEKLY'){
            const date =  new Date(stockDate);
            const year = date.getFullYear();
            const yearStart = new Date(date.getFullYear(), 0, 1);
            const week = Math.ceil((((date.getTime() - yearStart.getTime()) / 86400000) + yearStart.getDay() + 1) / 7);
            return `${week}W ${year}`;
        }
        if (period === 'FX_DAILY'){
            return stockDate;
        }

    }, [period]);

    const dataFormatted = useMemo(() => {
        if (data && keyIndex && data[keyIndex  as keyof {}]){
            const list = data[keyIndex as keyof {}];
            return Object.keys(list).map((i, index) => {
                const date =  getLabel(i);
                return {
                    x: index + 10,
                    y: parseFloat(list[i]['4. close']),
                    meta: date,
                };
            });
        }
        return [];
    }, [data, getLabel, keyIndex]);

    const { minValueY,
        maxValueY,
        minValueX,
        maxValueX } = useMemo(() => {

        if (dataFormatted &&  dataFormatted.length ){
            const valuesY = dataFormatted.map( i => i.y);
            const valuesX = dataFormatted.map( i => i.x);

            return {
                minValueY: Math.min(...valuesY),
                maxValueY: Math.max(...valuesY),
                minValueX: Math.min(...valuesX),
                maxValueX: Math.max(...valuesX),
            };
        }
        return {};
    }, [dataFormatted]) as {minValueY?: number, maxValueY?: number, minValueX?: number, maxValueX?: number};

    return {
        dataFormatted,
        minValueY,
        maxValueY,
        minValueX,
        maxValueX,
    };
};

