import React, {FC, useEffect, useState} from "react";
import Chart from 'react-apexcharts'
import axios from "axios";
import Progress from "../utils/Progress";
import BrowserTitle from "../utils/BrowserTitle";

interface IProps {

}

const Dashboard: FC<IProps> = (props: IProps) => {
    const [data, setData] = useState<{totals: [], periods: []}>({totals: [], periods: []})
    const stats: any = {
        series: [/*{
            name: 'series1',
            data: [31, 40, 28, 51, 42, 109, 100]
        },*/ {
            name: 'series2',
            data: data.totals//[11, 32, 45, 32, 34, 52, 41]
        }],
        options: {
            chart: {
                toolbar: {
                    show: false,
                },
                height: 350,
                type: 'area',
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
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'smooth'
            },
            xaxis: {
                grid: {
                    line: {
                        show: false,
                    },
                },
                type: 'date',
                categories: data.periods//["2018-09-19", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
            },
            tooltip: {
                x: {
                    format: 'dd/MM/yy'
                },
            },
        },


    }
    const [defaultFilter, setDefaultFilter] = useState<string>("created_at")

    useEffect(() => {
        axios.get("/api/dashboard/charts", {
            params: { filter: defaultFilter}
        }).then((rep) => {
            setData({
                periods: rep.data.periods,
                totals: rep.data.totals
            })
        })
    }, [defaultFilter])

    return <>
        <BrowserTitle title="Tableau de bord"/>
    <div className="page-header d-flex justify-content-between">
        <h1 className="page-title">Nombre de demandes</h1>
        <div className="dropdown">
            <button type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown">
                <i className="fe fe-calendar mr-2"></i>Afficher par
            </button>
            <div className="dropdown-menu">
                <button disabled={defaultFilter === "created_at"} onClick={() => setDefaultFilter("created_at")} className="dropdown-item">Date soumission</button>
                <button disabled={defaultFilter === "incident_date"} onClick={() => setDefaultFilter("incident_date")} className="dropdown-item">Date d'incident</button>
            </div>
        </div>
    </div>
    <div className="">
        <div className="">
            <div className="">
                {!data.totals.length && <Progress/>}
                <Chart options={stats.options} series={stats.series} type="area" height={350} />
            </div>
        </div>
    </div>
    </>
}
export default Dashboard
