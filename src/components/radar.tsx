import {
    ScatterChart,
    Scatter,
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer,
} from "recharts";
import type {Coordinates} from "../types/attack.types";


const CHART_SIZE = 400;
const DOMAIN: [number, number] = [-200, 200];

export const RadarChart = ({coordinates}: {coordinates: Coordinates[];}) => (
    <ResponsiveContainer width={CHART_SIZE} height={CHART_SIZE}>
        <ScatterChart margin={{top: 0, right: 0, bottom: 0, left: 0}}>
            <CartesianGrid stroke="#0f0" strokeOpacity={0.15} />
            <XAxis
                type="number"
                dataKey="x"
                domain={DOMAIN}
                allowDataOverflow
                tickCount={10}
                hide
            />
            <YAxis
                type="number"
                dataKey="y"
                domain={DOMAIN}
                allowDataOverflow
                tickCount={10}
                hide
            />

            <Scatter data={coordinates} fill="#00ccff" isAnimationActive={false} />
        </ScatterChart>
    </ResponsiveContainer>
);
