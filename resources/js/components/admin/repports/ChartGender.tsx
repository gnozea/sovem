import React, {FC, useEffect, useState} from "react";
import Chart from "react-apexcharts";
import Progress from "../../utils/Progress";

interface IProps {
    report: any,
    dateType: string
}

const ChartGender: FC<IProps> = (props: IProps) => {
    const [chart, setChart] = useState<any>()
    useEffect(() => {
        let male: any = [], female: any = [], category: any = []
        Object.keys(props.report).map((rep: any) => {
            category.push(rep)

            female.push(props.report[rep].female)

            male.push(props.report[rep].male)
        })
        setChart({
            options: {
                chart: {
                    id: "basic-bar",
                    dropShadow: {
                        enabled: true,
                        enabledOnSeries: undefined,
                        top: 0,
                        left: 0,
                        blur: 3,
                        color: '#000',
                        opacity: 0.1
                    }
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
                    name: "Fi",
                    data: female//[30, 40, 45, 50, 49, 60, 70, 91]
                },
                {
                    name: "Gason",
                    data: male//[30, 40, 45, 50, 49, 60, 70, 91]
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
export default ChartGender
