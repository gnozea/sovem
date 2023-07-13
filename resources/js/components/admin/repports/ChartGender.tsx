import React, {FC, useEffect, useState} from "react";
import Chart from "react-apexcharts";
import Progress from "../../utils/Progress";

interface IProps {
    report: any,
    dateType: string
}

const Chart: FC<IProps> = (props: IProps) => {
    const [chart, setChart] = useState<any>()
    useEffect(() => {
        let total: any = [], category: any = []
        Object.keys(props.report).map((rep: any) => {
            category.push(rep)
            total.push(props.report[rep].total)
        })
        setChart({
            options: {
                chart: {
                    id: "basic-bar"
                },
                xaxis: {
                    categories: category//[1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
                },
                stroke: {
                    curve: 'smooth'
                }
            },
            series: [
                {
                    name: "Total",
                    data: total//[30, 40, 45, 50, 49, 60, 70, 91]
                }
            ]
        })
    }, [props.report])

    if(!chart) return <Progress/>

    return <div className="">
        <div className="card">
            {/*<div className="card-header">*/}
            {/*</div>*/}
            <Chart
                options={chart.options}
                series={chart.series}
                type="line" height={300}
            />
        </div>
    </div>
}
export default Chart
