import React, {FC, useContext, useEffect, useState} from "react";
import BrowserTitle from "../utils/BrowserTitle";
import axios from "axios";
import Progress from "../utils/Progress";
import AccountContext from "../../context/AccountContext";
import Restricted from "../utils/Restricted";
import Edit from "./providers/Edit";
import Add from "./providers/Add";
import ProviderContext from "../../context/ProviderContext";
import _ from "lodash";
import Popup from "../utils/Popup";
import AddSpecialist from "./providers/AddSpecialist";

interface IProps {

}

const status: any = {
    "active": "Actif",
    "disabled": "Désactivé",
    "inactive": "Inactif",
    "pending": "En attente"
}
const Provider: FC<IProps> = (props: IProps) => {
    const [paginate, setPaginate] = useState<any>(),
        {user} = useContext(AccountContext),
        {providers, dispatch} = useContext(ProviderContext),
        [busy, setBusy] = useState<boolean>(true),
        [showEdit, setShowEdit] = useState<any>(),
        [showAddSpecialist, setShowAddSpecialist] = useState<any>(),
        [showAdd, setShowAdd] = useState<boolean>()

    useEffect(() => {
        axios.get("/api/dashboard/providers").then((rep: any) => {
            const data = {...rep.data}
            dispatch({type: "SET_PROVIDERS", payload: data.data});
            delete data.data
            setPaginate(data)
            setBusy(false)
        })
    }, [])

    const handleDisableEnable = (e: any, action: string) => {
        const provider = providers[e]
        const url: string = action === "disable" ? "disable" : "activate"
        setBusy(true)

        axios.post(`/api/dashboard/provider/${provider.id}/${url}`).then((rep: any) => {
            dispatch({type: "ENABLE_DISABLE", payload: {index: e, status: action === "disable" ? "inactive" : "active"}})
            setBusy(false)
        })
    }

    const setAddSpeciality = (key: any) => {
        setShowAddSpecialist(providers[key])
    }

    const handleSendVerificationEmail = (user: any) => {

    }

    if (user.provider_id) return <Restricted/>
    if (busy && (!providers.length || !paginate)) return <Progress/>

    if (!providers.length) return <div className="row" style={{ height: "100vh", alignItems: "center" }}>
        {showAdd && <Add onClose={() => setShowAdd(undefined)}/>}
        <div className="col-12" style={{ textAlign: "center" }}>
            <h2>Il n'y a pas encore de prestataire</h2>
            <button onClick={() => setShowAdd(true)} className="btn btn-outline-primary btn-sm ms-auto">Ajouter prestataire</button>
        </div>
    </div>
    return <div className="row">
        <BrowserTitle title="Prestataires"/>
        {busy && <Progress/>}
        {showEdit !== undefined && <Edit provider={showEdit} onClose={() => setShowEdit(undefined)}/>}
        {showAddSpecialist && <AddSpecialist provider={showAddSpecialist} onClose={() => setShowAddSpecialist(undefined)} service={showAddSpecialist}/>}
        {showAdd && <Add onClose={() => setShowAdd(undefined)}/>}
        <div className="col-12">
            <div className="card">
                <div className="card-header">
                    <h3 className="card-title">Prestataires</h3>
                    <button onClick={() => setShowAdd(true)} className="btn btn-outline-primary btn-sm ms-auto">Ajouter prestataire</button>
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
                                        style={{ width: "171.727px" }}>Nom
                                    </th>
                                    <th className="sorting" tabIndex={0} aria-controls="DataTables_Table_0" rowSpan={1}
                                        colSpan={1} aria-label="Client: activate to sort column ascending"
                                        style={{ width: "131.039px" }}>Email
                                    </th>
                                    <th className="sorting" tabIndex={0} aria-controls="DataTables_Table_0" rowSpan={1}
                                        colSpan={1} aria-label="VAT No.: activate to sort column ascending"
                                        style={{ width: "81.852px" }}>Phone
                                    </th>
                                    <th className="sorting" tabIndex={0} aria-controls="DataTables_Table_0" rowSpan={1}
                                        colSpan={1} aria-label="Created: activate to sort column ascending"
                                        style={{ width: "171.812px" }}>Adresse
                                    </th>
                                    <th className="no-sorting" tabIndex={0} aria-controls="DataTables_Table_0" rowSpan={1}
                                        colSpan={1} aria-label="Status: activate to sort column ascending"
                                        style={{ width: "81.297px" }}>Statut
                                    </th>
                                    <th tabIndex={0} className="no-sort" aria-controls="DataTables_Table_0" rowSpan={1}
                                        colSpan={1} aria-label=": activate to sort column ascending"
                                        style={{ width: "81px" }}></th>
                                </tr>
                            </thead>
                            <tbody>
                            {providers.map((rep: any, key: any) => {
                                const colors: any = {
                                    "pending": "secondary",
                                    "active": "primary",
                                    "disabled": "danger",
                                    "inactive": "warning",
                                }
                                return <tr key={key} role="row" className="odd">
                                    <td className="sorting_1"><span className="text-muted">{key+1}</span></td>
                                    <td><span title={rep.name} className="text-inherit">{_.truncate(rep.name, {
                                        'length': 24,
                                        //'separator': /,? +/
                                    })}</span></td>
                                    <td>{rep.email}</td>
                                    <td>{rep.phone}</td>
                                    <td>{rep.address_line_1}</td>
                                    <td>
                                        <span className={`status-icon bg-${colors[rep.status]}`}></span>
                                        <span className={`text-${colors[rep.status]}`}>{status[rep.status]}</span>
                                    </td>
                                    {/*<td className="">*/}
                                    {/*    <span data-toggle="tooltip">Data 4</span>*/}
                                    {/*</td>*/}
                                    <td className="text-right">
                                        <div className="item-action dropdown">
                                            <a href="" data-toggle="dropdown" data-boundary="viewport" className="icon" aria-expanded="false"><i className="fe fe-more-vertical"></i></a>
                                            <div className="dropdown-menu dropdown-menu-right" x-placement="bottom-center"
                                                 style={{position: "absolute", transform: "translate3d(15px, 20px, 0px)", top: "0px", left: "0px", willChange: "transform"}}>
                                                <a href="" className="dropdown-item"><i className="dropdown-icon fe fe-layers"></i> Details </a>
                                                <button className="dropdown-item" onClick={() => setShowEdit(key)}><i className="dropdown-icon fe fe-edit-2"></i> Modifier</button>
                                                {rep.status === "active" && <button className="dropdown-item" onClick={() => handleDisableEnable(key, "disable")}><i className="dropdown-icon fe fe-lock"></i> Désactiver</button>}
                                                {(rep.status === "inactive" || rep.status === "disabled" || rep.status === "pending") && <button className="dropdown-item" onClick={() => handleDisableEnable(key, "enable")}><i className="dropdown-icon fe fe-lock"></i> Activer</button>}
                                                <button className="dropdown-item" onClick={() => setAddSpeciality(key)}>
                                                    <i className="dropdown-icon fe fe-git-pull-request"></i> Lier spécialité</button>
                                                <div className="dropdown-divider"></div>
                                                {rep.status === "pending" && 1 && <button className="dropdown-item" onClick={() => handleSendVerificationEmail(rep.id)}><i className="dropdown-icon fe fe-edit-2"></i> Send verification email</button>}
                                                <a href="" className="dropdown-item"><i className="dropdown-icon fe fe-trash-2"></i> Supprimer</a>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            })}
                            </tbody>
                        </table>
                        {/*<div className="dataTables_info" id="DataTables_Table_0_info" role="status"*/}
                        {/*     aria-live="polite">Affichage 1 à 10*/}
                        {/*</div>*/}
                        <div className="dataTables_paginate paging_simple_numbers" id="DataTables_Table_0_paginate">
                            <button className={`paginate_button previous`} disabled={!paginate.prev_page_url} aria-controls="DataTables_Table_0" data-dt-idx={0} tabIndex={0} id="DataTables_Table_0_previous">Précédente</button>
                            {/*<span>*/}
                            {/*    <a className="paginate_button current" aria-controls="DataTables_Table_0" data-dt-idx={1} tabIndex={0}>1</a>*/}
                            {/*    <a className="paginate_button " aria-controls="DataTables_Table_0" data-dt-idx="2" tabIndex={0}>2</a>*/}
                            {/*</span>*/}
                            <button className="paginate_button next" disabled={!paginate.next_page_url} aria-controls="DataTables_Table_0" data-dt-idx="3" tabIndex={0} id="DataTables_Table_0_next">Suivante</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}
export default Provider
