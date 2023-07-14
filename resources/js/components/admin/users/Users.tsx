import React, {FC, useContext, useEffect, useState} from "react"
import Restricted from "../../utils/Restricted";
import UserContext from "../../../context/UserContext";
import AccountContext from "../../../context/AccountContext";
import axios from "axios";
import Progress from "../../utils/Progress";
import _, {debounce} from "lodash";
import BrowserTitle from "../../utils/BrowserTitle";
import moment from "moment/moment";
import Popup from "../../utils/Popup";
import {toast} from "react-toastify";

interface IProps {

}



moment.locale('fr');
const Users: FC<IProps> = (props: IProps) => {
    const {users, dispatch} = useContext(UserContext),
        {user} = useContext(AccountContext),
        [name, setName] = useState<string>(),
        [email, setEmail] = useState<string>(),
        [uniqueEmail, setUniqueEmail] = useState<boolean>(true),
        [showAdd, setShowAdd] = useState<boolean>(),
        [loading, setLoading] = useState<boolean>(true),
        [saving, setSaving] = useState<boolean>(false)

    const getData = () => {
        axios.get("/api/dashboard/users").then((rep: any) => {
            const data = [...rep.data.data]
            dispatch({type: "ADD_USERS", payload: data})
            setLoading(false)
        })
    }

    useEffect(() => {
        getData()
    }, [])


    const checkEmail = (e: any) => {
        if (e.target.value.trim() === "") return
        setUniqueEmail(true)
        axios.get("/api/dashboard/checkByEmail", {params: {email: e.target.value}
        }).then((rep) => {
            if (rep.data?.status && rep.data?.status === "error") {
                setEmail(undefined)
                setUniqueEmail(false)
            }else{
                setEmail(e.target.value.trim())
            }
        })
    }

    const handleAddUser = (e: any) => {
        e.preventDefault()
        setSaving(true)
        axios.post("/api/dashboard/users", {name: name, email: email}).then(rep => {
            toast.success(rep.data.msg)
            setSaving(false)
            setShowAdd(false)
            getData()
        })
    }

    if (!users.length) return <Progress/>
    return <div className="row">
        {loading && <Progress/>}
        <BrowserTitle title={"Utilisateurs"}/>
        {showAdd && <Popup isSmall={true} title={"Ajouter utilisateur"} onPopupClose={() => {}} parentId={2335}>
            {saving && <Progress/>}
            <form onSubmit={handleAddUser}>
                <div className="form-group mb-2">
                    <label className="form-label">Nom<span className="form-required">*</span></label>
                    <input onChange={(e: any) => setName(e.target.value)} type="text" name="name" required={true} placeholder="Nom" className="form-control"/>
                </div>
                <div className="form-group mb-2">
                    <label className="form-label">Email<span className="form-required">*</span></label>
                    <input type="email" onChange={debounce(checkEmail, 1500)} name="email" required={true} placeholder="Email" className="form-control"/>
                    {!uniqueEmail && <span className="text-danger">Cet email n'est pas disponible.</span>}
                </div>
                <div className="mt-2 text-center">
                    <button disabled={!uniqueEmail} className="btn btn-primary btn-sm">Ajouter</button>
                </div>
            </form>
        </Popup>}
        <div className="col-12">
            <div className="card">
                <div className="card-header">
                    <h3 className="card-title">Utilisateurs</h3>
                    <button onClick={() => setShowAdd(true)} className="btn btn-outline-primary btn-sm ms-auto">Ajouter</button>
                </div>
                <div className="table-responsive">
                    <table className="table table-hover table-outline table-vcenter text-nowrap card-table">
                        <thead>
                            <tr role="row">
                                <th className="w-1">#</th>
                                <th className="" style={{ width: "71.727px" }}>Nom</th>
                                <th style={{  }}>Email</th>
                                <th style={{  }}></th>
                                <th>Ajouté le</th>
                                {/*<th></th>*/}
                            </tr>
                        </thead>
                        <tbody>
                        {users.map((rep: any, key: any) => {
                            return <tr key={key} role="row">
                                <td className="">
                                    <span className="text-muted">{key+1}</span>
                                </td>
                                <td>
                                    <span title={rep.name} className="text-inherit">{rep.name ? _.truncate(rep.name, {
                                        'length': 100,
                                        //'separator': /,? +/
                                    }) : <i className="text-muted"> Pas de nom</i>}</span>
                                </td>
                                <td className="">
                                    {_.truncate(rep.email, {
                                        'length': 100,
                                        //'separator': /,? +/
                                    })}
                                </td>
                                <td className="text-muted" title={`${rep.provider ? rep.provider.name : ""}`}>
                                    {rep.provider ? rep.provider.name_short : ""}
                                </td>
                                <td className="">
                                    {rep.created_at ? moment(rep.created_at).format("D MMMM YYYY") : "-----"}
                                </td>
                                {/*<td className="text-right">*/}
                                {/*    <div className="item-action dropdown">*/}
                                {/*        <a href="" data-toggle="dropdown" data-boundary="viewport" className="icon" aria-expanded="false"><i className="fe fe-more-vertical"></i></a>*/}
                                {/*        <div className="dropdown-menu dropdown-menu-right" x-placement="bottom-center"*/}
                                {/*             style={{position: "absolute", transform: "translate3d(15px, 20px, 0px)", top: "0px", left: "0px", willChange: "transform"}}>*/}
                                {/*            <a href="" className="dropdown-item"><i className="dropdown-icon fe fe-layers"></i> Details </a>*/}
                                {/*            <button className="dropdown-item"><i className="dropdown-icon fe fe-edit-2"></i> Modifier</button>*/}
                                {/*            <div className="dropdown-divider"></div>*/}
                                {/*            /!*<button className="dropdown-item" onClick={() => setShowLinkProvider(rep)}>*!/*/}
                                {/*            /!*    <i className="dropdown-icon fe fe-user-check"></i> Lier à des prestataires*!/*/}
                                {/*            /!*</button>*!/*/}
                                {/*            /!*<button className="dropdown-item" onClick={() => setShowAddSpecialist(rep)}>*!/*/}
                                {/*            /!*    <i className="dropdown-icon fe fe-git-pull-request"></i> Ajouter spécialité*!/*/}
                                {/*            /!*</button>*!/*/}
                                {/*        </div>*/}
                                {/*    </div>*/}
                                {/*</td>*/}
                            </tr>
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
}
export default Users
