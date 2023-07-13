import React, {FC, useEffect, useState} from "react";
import {DatePicker} from 'antd';
import Chart from "./repports/Chart";
import { Radio } from 'antd';
import Select2 from "../utils/form-components/Select2";
import styled from "styled-components";
import axios from "axios";
import dayjs from "dayjs";
import moment from "moment";
import Progress from "../utils/Progress";
import ChartGender from "./repports/ChartGender";
import BrowserTitle from "../utils/BrowserTitle";
const { RangePicker } = DatePicker;


const today = new Date(),
    defaultDate: any[] = [dayjs(dayjs().startOf("month")), dayjs(dayjs())]

const defaultFilter: any = {
    dateType: "di",
    date: defaultDate,
    location: undefined,
    dept: undefined,
    service: undefined,
    groupBy: 'di'
}

const Report: FC = (props) => {
    const [dateType, setDateType] = useState<string>("di"),
        [services, setServices] = useState<{}[]>([]),
        [dept, setDept] = useState<{id: string, text: string}[]>([]),
        [filter, setFilter] = useState<{}[]>(),
        [defaultValues, setDefaultValues] = useState(defaultFilter),
        [url, setUrl] = useState(`/api/city/search?all=true"`),
        [report, setReport] = useState<any>()

    useEffect(() => {
        document.querySelector("body").classList.add("report-frame")
        if(!services.length) axios.post("/api/start-form").then((rep: any) => {
            const serv = rep.data.data.map((s: any) => {
                return {text: s.name, id: s.id.toString()}
            })
            setServices([
                {text: "Tous les services", id: "-1"},
                ...serv
            ])
        }).then(() => {
            axios.get("/api/dashboard/dept").then((rep: any) => {
                const dept = rep.data.map((s: any) => {
                    return {text: s.name, id: s.id.toString()}
                })
                setDept([
                    {text: "Tous les département", id: "-1"},
                    ...dept
                ])
            })
        })
    }, [])

    useEffect(() => {

        if (defaultValues.dept) setUrl(`/api/city/search?dept=${defaultValues.dept}`)

        const date = [dayjs(defaultValues.date[0]).format("YYYY-MM-DD"), dayjs(defaultValues.date[1]).format("YYYY-MM-DD")]
        axios.get("/api/dashboard/reports", {
            params: {...defaultValues, date: date}
        }).then((rep) => setReport(rep.data.data))
    }, [defaultValues])

    const handleFilter = async (key:string, value: any) => {
        if(value === undefined || value === "-1") {
            setDefaultValues((prevState: any) => {
                return {...prevState, [key]: undefined}
            })
        }

        if(key === "date"){
            value[0] = moment(value[0], "DD-MM-YYYY").format("YYYY-MM-DD")
            value[1] = moment(value[1], "DD-MM-YYYY").format("YYYY-MM-DD")
        }
        setDefaultValues((prevState: any) => {
            return {...prevState, [key]: value}
        })
    }
    // console.log(defaultValues);

    return <div className="row">
        <BrowserTitle title={"Rapport de services"}/>
        <div className="">
            <div className="page-header">
                <h1 className="page-title">
                    Rapport de services
                </h1>
            </div>
            <div className="row">
                <Group className="col-md-2 mb-2 position-sticky">
                    <span className="form-label">Grouper par</span>
                    <div className="list-group list-group-transparent mb-0">
                        <button className={`list-group-item list-group-item-action px-0${defaultValues.groupBy === "di" ? " active" : "" }`} onClick={() => handleFilter("groupBy", 'di')}>Date d'incident</button>
                        <button className={`list-group-item list-group-item-action px-0${defaultValues.groupBy === "ds" ? " active" : "" }`} onClick={() => handleFilter("groupBy", 'ds')}>Date soummission</button>
                        <button className={`list-group-item list-group-item-action px-0${defaultValues.groupBy === "gender" ? " active" : "" }`} onClick={() => handleFilter("groupBy", 'gender')}>Femme | Homme</button>
                    </div>
                </Group>
                <div className="col-md-10">
                    <div className="d-flex position-sticky " style={{ top: "0", zIndex: "9" }}>
                        <div className="d-flex" style={{ gap: "0.25rem" }}>
                            <div>
                                <span className="form-label">Choisir date type</span>
                                <Radio.Group onChange={(e: any) => handleFilter("dateType", e.target.value)} style={{ marginBottom: "5px" }} defaultValue="di">
                                    <Radio.Button value="di">Incident</Radio.Button>
                                    <Radio.Button value="ds">Soummission</Radio.Button>
                                </Radio.Group>
                            </div>
                            <div>
                                <span className="form-label">&nbsp;</span>
                                <RangePicker allowClear={false}
                                             defaultValue={defaultValues.date}
                                             onChange={(e: any, dateStrings: string[]) => handleFilter("date", dateStrings)} format="DD-MM-YYYY" />
                            </div>
                            <div className="">
                                <span className="form-label">Lieu d'incident</span>
                                <Select>
                                    <Select2 multiple={false}
                                             selectedValue={defaultValues.dept} data={dept}
                                             onSelect={(e: any) => handleFilter("dept", e.id)}
                                             searchable={false} name="dept" placeholder="Choisir départment" id="dept"/>
                                </Select>
                            </div>
                            <div className="">
                                <span className="form-label">&nbsp;</span>
                                <Select>
                                    <Select2 multiple={false}
                                             selectedValue={defaultValues.location}
                                             onSearch={(e: any) => {}} searchKeys={ { id: 'id', text: ['name'] } } searchUrl={url}
                                             onSelect={(e: any) => handleFilter("location", e.id)}
                                             searchable={true} name="city" placeholder="Choisir ville d'incident" id="city"/>
                                </Select>
                            </div>
                        </div>
                        <div className="ms-auto">
                            <span className="form-label">&nbsp;</span>
                            <button className="btn p-0  btn-link" onClick={() => setDefaultValues(defaultFilter)}>
                                <i className="mdi mdi-filter"/>
                                Effacer
                            </button>
                        </div>
                        {/*<div className="">*/}
                        {/*    <span className="form-label">Service</span>*/}
                        {/*    <Select>*/}
                        {/*        <Select2 multiple={false}*/}
                        {/*                 selectedValue={defaultValues.service}*/}
                        {/*                 onSelect={(e: any) => handleFilter("service", e.id)}*/}
                        {/*                 data={services}*/}
                        {/*                 searchable={false} name="servicess" placeholder="Choisir sevice" id="service"/>*/}
                        {/*    </Select>*/}
                        {/*</div>*/}
                    </div>
                    {report && defaultValues.groupBy !== "gender" && <Chart report={report} dateType={defaultValues.dateType}/>}
                    {report && defaultValues.groupBy === "gender" && <ChartGender report={report} dateType={undefined}/>}
                </div>
            </div>
            {!report && <Progress/>}
        </div>
    </div>
}
export default Report

const Group = styled.div`
    .active{
        background: none!important;
    }
`

const Select = styled.div`
    .select2.select2-container.select2-container--default{
        width: 100%!important;
    }
    .select2-container--default .select2-selection--single{
        background: #fff;
        padding: 1px!important;
    }
    .select2-container--default .select2-selection--single{
        border: 1px solid #d9d9d9;
        border-radius: 6px;
    }
    .select2-container--default .select2-selection--single .select2-selection__arrow {
        bottom: 4px;
    }
    .select2-container--default .select2-selection--single .select2-selection__rendered {
        line-height: 2em;
        font-size: 14px;
    }
`
