import React from 'react';
import { StyleSheet } from 'react-native';

import { Chart, Line, Area, HorizontalAxis, VerticalAxis, ChartDataPoint, Tooltip } from 'react-native-responsive-linechart';


export const ChartVFX = (
   {data, minValueX, maxValueX, minValueY, maxValueY, period}:
   {data: ChartDataPoint[], minValueX: number, maxValueX: number, minValueY: number, maxValueY: number, period?: string}) => {

    return (
        <Chart
            style={styles.chart}
            data={data}
            padding={{ left: 40, bottom: 35, right: 20, top: 30 }}
            xDomain={{ min: minValueX, max: maxValueX }}
            yDomain={{ min: minValueY, max: maxValueY }}
            viewport={{ size: { width: 5, height: period && period.includes('DAILY') ? (maxValueY / 10) : (maxValueY / 2)} }}
            >
            <VerticalAxis
                tickCount={10}
                theme={{
                axis: { stroke: { color: '#aaa', width: 2 } },
                ticks: { stroke: { color: '#aaa', width: 2 } },
                labels: { formatter: (v: number) => v.toFixed(3) },
                }}
            />
            <HorizontalAxis
            tickValues={data.map(i => i.x)}
            theme={{
                axis: { stroke: { color: '#aaa', width: 2 } },
                ticks: { stroke: { color: '#aaa', width: 2 } },
                labels: { label: { rotation: 50 }, formatter: (v) => data.find(i => i.x === v)?.meta },
            }}
            />
            <Line
                theme={{
                stroke: { color: '#021622', width: 2 },
                scatter: { default: { width: 8, height: 8, rx: 4, color: 'black' }, selected: { color: 'red' } },
                }}
                smoothing="cubic-spline"
                tooltipComponent={<Tooltip theme={{shape: {
                    width: 50,
                    height: 20,
                    dx: 0,
                    dy: 20,
                    rx: 4,
                    color: 'black',
                    }}}/>}

            />
            <Area theme={{ gradient: { from: { color: '#2274A5', opacity: 0.4 }, to: { color: '#2274A5', opacity: 0.4 } } }} smoothing="cubic-spline" />
        </Chart>

    );
};

const styles = StyleSheet.create({
    chart: {
        height: 355,
        width: '100%',
    },
  });
