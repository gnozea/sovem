import React, {FC, Fragment, useContext, useEffect, useState} from "react";
import BrowserTitle from "../../utils/BrowserTitle";
import ServiceContext from "../../../context/ServiceContext";
import Progress from "../../utils/Progress";
import Restricted from "../../utils/Restricted";
import AccountContext from "../../../context/AccountContext";
import axios from "axios";
import _ from "lodash";
import Popup from "../../utils/Popup";
import Add from "./Add";
import {AddFromService} from "../specialist/AddFromService";

interface IProps {

}

const Service: FC<IProps> = (props: IProps) => {
    const { state, dispatch } = useContext(ServiceContext),
        {user} = useContext(AccountContext),
        [showAdd, setShowAdd] = useState<boolean>(),
        [showAddSpecialist, setShowAddSpecialist] = useState<any>()

    useEffect(() => {
        axios.get("/api/dashboard/services").then((rep: any) => {
            const data = [...rep.data.data]
            dispatch({type: "ADD_SERVICES", payload: data})
        })
    }, [])

    if (user.provider_id) return <Restricted/>
    if (!state.length) return <Progress/>
    return <div className="row">
        {showAddSpecialist && <Popup onPopupClose={() => {setShowAddSpecialist(undefined)}} isSmall={true} parentId={"2437n"} children={<AddFromService service={...showAddSpecialist}/>}/>}
        {showAdd && <Popup onPopupClose={() => {setShowAdd(undefined)}} isSmall={true} parentId={"2434n"} children={<Add/>}/>}
        <BrowserTitle title={"Services"}/>
        <div className="col-12">
            <div className="card">
                <div className="card-header">
                    <h3 className="card-title">Services</h3>
                    <button onClick={() => setShowAdd(true)} className="btn btn-outline-primary btn-sm ms-auto">Ajouter service</button>
                </div>
                <div className="table-responsive">
                    <table className="table table-hover table-outline table-vcenter text-nowrap card-table" role="grid">
                        <thead>
                        <tr role="row">
                            <th className="w-1" tabIndex={0} aria-controls="DataTables_Table_0"
                                rowSpan={1} colSpan={1} aria-sort="ascending"
                                aria-label="No.: activate to sort column descending" style={{ width: "4.7344px" }}>#
                            </th>
                            <th className="" tabIndex={0} rowSpan={1}
                                colSpan={1} aria-label="Invoice Subject: activate to sort column ascending"
                                style={{ width: "71.727px" }}>Nom
                            </th>
                            <th tabIndex={0} rowSpan={1}
                                colSpan={1} aria-label="Invoice Subject: activate to sort column ascending"
                                style={{ width: "20px" }}>
                            </th>
                            <th tabIndex={0} rowSpan={1}
                                colSpan={1} aria-label="Invoice Subject: activate to sort column ascending"
                                style={{ width: "20px" }}>
                            </th>
                            <th tabIndex={0} className="no-sort" rowSpan={1}
                                colSpan={1} aria-label=": activate to sort column ascending"
                                style={{ width: "81px" }}>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {state.map((rep: any, key: any) => {
                            return <tr key={key} role="row">
                                <td className=""><span className="text-muted">{key+1}</span></td>
                                <td>
                                    <span title={rep.name} className="text-inherit">{_.truncate(rep.name, {
                                        'length': 100,
                                        //'separator': /,? +/
                                    })}</span>
                                </td>
                                <td className="">
                                    <span className={`${rep.providers_count === 0 ? "text-danger" : "text-primary"}`}>
                                    {rep.providers_count === 0 ? "Pas de prestataire" : ""}
                                    {rep.providers_count > 0 ? `${rep.providers_count} prestataire${rep.providers_count > 1 ? "s" : ''}` : ""}
                                    </span>
                                </td>
                                <td className="">
                                    <span className={`${rep.specialists.length === 0 ? "text-danger" : "text-primary"}`}>
                                    {rep.specialists.length === 0 ? "Pas de spécialiste" : ""}
                                    {rep.specialists.length > 0 ? `${rep.specialists.length} spécaliste${rep.specialists.length > 1 ? "s" : ''}` : ""}
                                    </span>
                                </td>
                                <td className="text-right">
                                    <div className="item-action dropdown">
                                        <a href="" data-toggle="dropdown" data-boundary="viewport" className="icon" aria-expanded="false"><i className="fe fe-more-vertical"></i></a>
                                        <div className="dropdown-menu dropdown-menu-right" x-placement="bottom-center"
                                             style={{position: "absolute", transform: "translate3d(15px, 20px, 0px)", top: "0px", left: "0px", willChange: "transform"}}>
                                            <a href="" className="dropdown-item"><i className="dropdown-icon fe fe-layers"></i> Details </a>
                                            <button className="dropdown-item"><i className="dropdown-icon fe fe-edit-2"></i> Modifier</button>
                                            <div className="dropdown-divider"></div>
                                            <button className="dropdown-item">
                                                <i className="dropdown-icon fe fe-user-check"></i> Lier à un prestataire
                                            </button>
                                            <button className="dropdown-item" onClick={() => setShowAddSpecialist(rep)}>
                                                <i className="dropdown-icon fe fe-git-pull-request"></i> Ajouter spécialité
                                            </button>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
}
export default Service
