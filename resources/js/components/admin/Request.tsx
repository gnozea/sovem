import React, {FC, Fragment, useContext, useEffect, useState} from "react";
import Progress from "../utils/Progress"
import BrowserTitle from "../utils/BrowserTitle";
import axios from "axios";
import RequestContext from "../../context/RequestContext";
import Moment from "react-moment";
import moment from "moment";
import AccountContext from "../../context/AccountContext";
import {keys} from "lodash";
import {toast} from "react-toastify";
import Release from "./providers/Release";
import RequestDetails from "../RequestDetails";

interface IProps {
    children?: React.ReactNode
}
const calendarStrings = {
    lastDay : '[Hier à] LT',
    sameDay : '[Aujourd\'hui à] LT',
    nextDay : '[Demain à] LT',
    lastWeek : 'dddd [dernier] [à] LT',
    nextWeek : 'dddd [à] LT',
    sameElse : 'L'
};

const words: any = {
    claimed: "Réclamé",
    unclaimed: "En attente",
    solved: "Résolue",
    released: "Relaché",
    unsolved: "Non résolue"
}
const Request: FC<IProps> = (props: IProps) => {
    const { state, dispatch } = useContext(RequestContext),
        {user} = useContext(AccountContext),
        [busy, setBusy] = useState<boolean>(),
        [showDetail, setShowDetail] = useState<any>(),
        [showRelease, setShowRelease] = useState<any>(),
        [paginate, setPaginate] = useState<any>({
            to: null,
            from: null
        })
    moment.locale('fr');
    useEffect(() => {
        axios.get("/api/dashboard/requests").then((rep: any) => {
            dispatch({type: "SET_REQUESTS", payload: rep.data[0].data})
            setPaginate({
                from: rep.data[0].from,
                to: rep.data[0].to,
                prev_page_url: rep.data[0].prev_page_url,
            })
        })
    }, [])

    if (!state.length) return <Progress/>
    return <div className="row">
        <BrowserTitle title={"Demandes de services"}/>
        {busy && <Progress/>}
        {showDetail && <RequestDetails item={showDetail} onClose={() => setShowDetail(undefined)}/>}
        {showRelease !== undefined && <Release item={showRelease} onClose={() => setShowRelease(undefined)}/>}
        <div className="col-12">
            <div className="card">
                <div className="card-header">
                    <h3 className="card-title">Demandes de service</h3>
                </div>
                <div className="table-responsive">
                    <div id="DataTables_Table_0_wrapper" className="dataTables_wrapper no-footer">
                        <div id="DataTables_Table_0_filter" className="dataTables_filter mt-2 mb-0">
                            <label>
                                <input type="search" className="" placeholder="Rechercher" aria-controls="DataTables_Table_0"/>
                            </label>
                        </div>
                        <table className="table card-table table-vcenter text-nowrap datatable dataTable no-footer"
                               id="DataTables_Table_0" role="grid" aria-describedby="DataTables_Table_0_info">
                            <thead>
                                <tr role="row">
                                    <th className="w-1 sorting_asc" tabIndex={0} aria-controls="DataTables_Table_0"
                                        rowSpan={1} colSpan={1} aria-sort="ascending"
                                        aria-label="No.: activate to sort column descending" style={{ width: "44.7344px" }}>#
                                    </th>
                                    <th className="sorting" tabIndex={0} aria-controls="DataTables_Table_0" rowSpan={1}
                                        colSpan={1} aria-label="Invoice Subject: activate to sort column ascending"
                                        style={{ width: "171.727px" }}>Ticket #
                                    </th>
                                    <th className="sorting" tabIndex={0} aria-controls="DataTables_Table_0" rowSpan={1}
                                        colSpan={1} aria-label="Client: activate to sort column ascending"
                                        style={{ width: "131.039px" }}>Sex
                                    </th>
                                    <th className="sorting" tabIndex={0} aria-controls="DataTables_Table_0" rowSpan={1}
                                        colSpan={1} aria-label="VAT No.: activate to sort column ascending"
                                        style={{ width: "81.852px" }}>Lieu d'incident
                                    </th>
                                    <th className="sorting" tabIndex={0} aria-controls="DataTables_Table_0" rowSpan={1}
                                        colSpan={1} aria-label="Created: activate to sort column ascending"
                                        style={{ width: "102.812px" }}>Date rendez-vouz
                                    </th>
                                    <th className="sorting" tabIndex={0} aria-controls="DataTables_Table_0" rowSpan={1}
                                        colSpan={1} aria-label="Status: activate to sort column ascending"
                                        style={{ width: "146.297px" }}>Statut
                                    </th>
                                    <th className="sorting" tabIndex={0} aria-controls="DataTables_Table_0" rowSpan={1}
                                        colSpan={1} aria-label="Price: activate to sort column ascending"
                                        style={{ width: "53.5547px" }}>Spécialist
                                    </th>
                                    <th className="" tabIndex={0} aria-controls="DataTables_Table_0" rowSpan={1}
                                        colSpan={1} aria-label=": activate to sort column ascending"
                                        style={{ width: "173.422px" }}></th>
                                </tr>
                            </thead>
                            <tbody>

                            { state.map((unclaimed: any, key: number) => {
                                if (unclaimed.requests.length === 0) return <Fragment key={0}></Fragment>

                                let specialist: any = unclaimed.requests.map((specialist: any) => {
                                    return specialist.specialities.name
                                })
                                let status: any = []
                                unclaimed.requests.map((specialist: any) => {
                                    if (status.indexOf(words[specialist.status]) === -1) return status.push(words[specialist.status])
                                })

                                let date: any = []
                                unclaimed.claimed.forEach((specialist: any) => {
                                    const d = `${moment(specialist.date_slot).format("D MMMM YYYY")} ${specialist.time_slot}`
                                    if (date.indexOf(d) === -1) date = d
                                })
                                return <tr role="row" key={key} className="odd">
                                    <td className="sorting_1"><span className="text-muted">{key+1}</span></td>
                                    <td><span className="text-inherit">{ unclaimed.ticket_number }</span></td>
                                    <td>{ unclaimed.gender.replace("Fi", "Femme").replace("Gason", "Homme") }</td>
                                    <td>{unclaimed.incident_location}</td>
                                    <td>{date.length ? date : <span className="text-muted">Date à préciser</span>}</td>
                                    <td>
                                        <span className={`status-icon bg-${`primary`} text-${`warning`}`}></span>
                                        <span className={`text-${`primary`}`}>{status.join(', ')}</span>
                                    </td>
                                    <td className="">
                                        <span data-toggle="tooltip" title={specialist.join(", ").replace(/, ([^,]*)$/, ' et $1')}>{specialist.join(", ")}</span>
                                    </td>
                                    <td className="text-right">
                                        <div className="item-action dropdown">
                                            <a href="" data-toggle="dropdown" data-boundary="viewport" className="icon" aria-expanded="false"><i className="fe fe-more-vertical"></i></a>
                                            <div className="dropdown-menu dropdown-menu-right" x-placement="bottom-center"
                                                 style={{position: "absolute", transform: "translate3d(15px, 20px, 0px)", top: "0px", left: "0px", willChange: "transform"}}>
                                                <button className="dropdown-item" onClick={() => setShowDetail(unclaimed)}><i className="dropdown-icon fe fe-layers"></i> Details </button>
                                                {status.indexOf("claimed") > -1 && <button onClick={() => setShowRelease(key)} className="dropdown-item"><i className="dropdown-icon fe fe-thumbs-down"></i> Relacher </button>}
                                                {/*<div className="dropdown-divider"></div>*/}
                                                {/*<a href="" className="dropdown-item"><i className="dropdown-icon fe fe-link"></i> Separated link</a>*/}
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            }) }

                            </tbody>
                        </table>
                        <div className="dataTables_info" id="DataTables_Table_0_info" role="status"
                             aria-live="polite">Affichage {paginate.from} à {paginate.to} entrées
                        </div>
                        <div className="dataTables_paginate paging_simple_numbers" id="DataTables_Table_0_paginate">
                            <button className={`paginate_button previous${paginate.prev_page_url === "null" ? "disabled": ""}`} aria-controls="DataTables_Table_0" data-dt-idx={0} tabIndex={0} id="DataTables_Table_0_previous">Précédente</button>
                            {/*<span>*/}
                            {/*    <a className="paginate_button current" aria-controls="DataTables_Table_0" data-dt-idx={1} tabIndex={0}>1</a>*/}
                            {/*    <a className="paginate_button " aria-controls="DataTables_Table_0" data-dt-idx="2" tabIndex={0}>2</a>*/}
                            {/*</span>*/}
                            <button className="paginate_button next" aria-controls="DataTables_Table_0" data-dt-idx="3" tabIndex={0} id="DataTables_Table_0_next">Suivante</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}
export default Request
