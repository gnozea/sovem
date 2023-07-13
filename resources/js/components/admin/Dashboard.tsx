import React, {FC, useEffect, useState} from "react";
import Chart from 'react-apexcharts'
import axios from "axios";
import Progress from "../utils/Progress";
import BrowserTitle from "../utils/BrowserTitle";
import StateChart from "./home/StateChart";
import AgeChart from "./home/AgeChart";

interface IProps {

}

const Dashboard: FC<IProps> = (props: IProps) => {
    const [data, setData] = useState<{totals?: [], periods?: []}>({totals: [], periods: []}),
        [states, setStates] = useState<{}>(),
        [age, setAge] = useState<{labels: string[], values: any[]}>()
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
        }).then(() => {
            axios.get("/api/dashboard/state-charts", {
                params: { filter: "incident_date"}
            }).then((rep) => {
                setStates(rep.data.data)
            })
        }).then(() => {
            axios.get("/api/dashboard/charts-age", {
                params: { filter: "created_at"}
            }).then((rep) => {
                let labels: any[] = [],
                    values: any[] = []
                Object.values(rep.data.data).map((item: any) => {
                    labels = [...labels, item.age]
                    values = [...values, item.total]
                })
                setAge({
                    labels: labels,
                    values: values
                })
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
                <button disabled={defaultFilter === "created_at"} onClick={() => setDefaultFilter("created_at")} className={`dropdown-item${defaultFilter === "created_at" ? ' ps-1' : ''}`}>
                    {defaultFilter === "created_at" ? <i className="mdi mdi-check"></i> : ""} Date soumission</button>
                <button disabled={defaultFilter === "incident_date"} onClick={() => setDefaultFilter("incident_date")} className={`dropdown-item${defaultFilter === "incident_date" ? ' ps-1' : ''}`}>
                    {defaultFilter === "incident_date" ? <i className="mdi mdi-check"></i> : ""} Date d'incident</button>
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
        <div className="row">
            <div className="col-lg-6">
                <div className="card" style={{minHeight: "400px"}}>
                    <h3 className="page-title text-center" style={{fontSize: "19px"}}>Incidents par département pour le mois</h3>
                    {!states || Object.keys(states).length === 0 && <Progress/>}
                    {states && Object.keys(states).length > 0 && <StateChart stats={states}/>}
                </div>
            </div>
            <div className="col-lg-6">
                <div className="card" style={{minHeight: "400px"}}>
                    <h3 className="page-title text-center" style={{fontSize: "19px"}}>Incidents par tranche d'age</h3>
                    {!age || Object.keys(age).length === 0 && <Progress/>}
                    {age && Object.keys(age).length > 0 && <AgeChart stats={age}/>}
                </div>
            </div>
        </div>
    </div>
    </>
}
export default Dashboard
