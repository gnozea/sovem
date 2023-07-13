import React, {FC} from "react";
import Chart from "react-apexcharts";

interface IProps {
    stats: { labels: string[], values: any[] }
}

const AgeChart: FC<IProps> = (props: IProps) => {
    const series = [44, 55, 41, 17, 15];
    const options: any = {
        labels: props.stats.labels,
        chart: {
            type: "donut"
        }
    };

    return <Chart options={options} series={props.stats.values} type="donut" height={400} />
}
export default AgeChart
