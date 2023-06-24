import React, {FC} from "react";
import Chart from "react-apexcharts";


interface IProps {
    stats: any
}

const StateChart: FC<IProps> = (props: IProps) => {
    return <>
        <Chart options={props.stats.options} series={props.stats.series} type="pie" height={350} />
    </>
}
export default StateChart
