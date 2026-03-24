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
import Select2 from "../../utils/form-components/Select2";
import styled from "styled-components";

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
        [linkToProvider, setLinkToProvider] = useState<boolean>(),
        [showLinkToProviderOption, setShowLinkToProviderOption] = useState<boolean>(true),
        [loading, setLoading] = useState<boolean>(true),
        [providerSelected, setProviderSelected] = useState<any>(),
        [saving, setSaving] = useState<boolean>(false)

    const getData = () => {
        axios.get("/api/dashboard/users").then((rep: any) => {
            const data = [...rep.data.data]
            dispatch({type: "ADD_USERS", payload: data})
            setLoading(false)
        })
    }

    useEffect(() => {
        if(user.provider_id) return
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
        let post: any = {name: name, email: email}
        if (linkToProvider && providerSelected) post = {...post, provider: providerSelected.id}

        axios.post("/api/dashboard/users", post).then(rep => {
            toast.success(rep.data.msg)
            setSaving(false)
            setShowAdd(false)
            setShowLinkToProviderOption(true)
            getData()
        }).catch((error) => {
            toast.error(error.response.data.msg)
            setSaving(false)
            setShowAdd(false)
            setShowLinkToProviderOption(true)
        })
    }

    // if (user.provider_id) return <Restricted/>
    if (!users.length) return <Progress/>

    function handlePasswordReset(param: {id: any; email: any}) {
        setLoading(true)
        axios.post("/api/dashboard/reset-password", {email: param.email}).then(rep => {
            toast.success("Un lien de restauration à été envoyé.")
            setLoading(false)
        })
    }

    function handleMFAReset(id: any) {
        setLoading(true)
        axios.post("/api/dashboard/reset-mfa", {id: id}).then(rep => {
            toast.success(rep.data.msg)
            setLoading(false)
            if (rep.data.refresh) location.reload()
        }).catch((err) => {
            setLoading(false)
            toast.error(err.response.data.msg)
        })
    }

    function handleDelete(key: number, id: any) {
        if (!window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur? Cette action est irréversible.")) return
        setLoading(true)
        axios.delete(`/api/dashboard/user/${id}`).then(() => {
            dispatch({type: "REMOVE_USER", payload: key})
            setLoading(false)
            toast.success("Utilisateur supprimé.")
        }).catch((err) => {
            setLoading(false)
            toast.error(err.response?.data?.msg ?? "Erreur lors de la suppression.")
        })
    }

    return <div className="row">
        {loading && <Progress/>}
        <BrowserTitle title={"Utilisateurs"}/>
        {showAdd && <Popup isSmall={true} title={"Ajouter utilisateur"} onPopupClose={() => {}} parentId={2335}>
            {saving && <Progress/>}
            <form onSubmit={handleAddUser}>
                {providerSelected &&
                    <label className="form-label text-danger">
                        Prestataire: {providerSelected.name}
                    </label>
                }
                <div className="form-group mb-2">
                    <label className="form-label">Nom<span className="form-required">*</span></label>
                    <input onChange={(e: any) => setName(e.target.value)} type="text" name="name" required={true} placeholder="Nom" className="form-control"/>
                </div>
                <div className="form-group mb-2">
                    <label className="form-label">Email<span className="form-required">*</span></label>
                    <input type="email" onChange={debounce(checkEmail, 1500)} name="email" required={true} placeholder="Email" className="form-control"/>
                    {!uniqueEmail && <span className="text-danger">Cet email n'est pas disponible.</span>}
                </div>
                {showLinkToProviderOption && <label className="custom-control custom-checkbox">
                    <input type="checkbox" onChange={(e: any) => {
                        setProviderSelected(undefined)
                        setLinkToProvider(e.target.checked)

                    }} defaultChecked={linkToProvider} className="custom-control-input"/>
                        <span className="custom-control-label">Lier à un prestataire?</span>
                </label>}
                {linkToProvider && showLinkToProviderOption &&
                    <Select className="form-group mb-2">
                        <Select2 classes="service-form" multiple={false} selectedValue={undefined} onSearch={(e: any) => {}} searchKeys={ { id: 'id', text: ['name'] } } searchUrl={'/api/dashboard/provider/search'}
                                 onSelect={(e: any) => setProviderSelected(e)}
                                 searchable={true} placeholder="Nom du prestataire" id="pname"
                        />
                    </Select>
                }
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
                                <th></th>
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
                                <td className="text-right">
                                    <div className="item-action dropdown">
                                        <a href="" data-toggle="dropdown" data-boundary="viewport" className="icon" aria-expanded="false"><i className="fe fe-more-vertical"></i></a>

                                        <div className="dropdown-menu dropdown-menu-right" x-placement="bottom-center"
                                             style={{position: "absolute", transform: "translate3d(15px, 20px, 0px)", top: "0px", left: "0px", willChange: "transform"}}>
                                            <button className="dropdown-item" onClick={() => handlePasswordReset({id: rep.id, email: rep.email})}>
                                                <i className="dropdown-icon fe fe-shield"></i> Restaurer password
                                            </button>
                                            <button className="dropdown-item" onClick={() => handleMFAReset(rep.id)}>
                                                <i className="dropdown-icon fa fa-qrcode"></i> Restaurer MFA
                                            </button>
                                            <div className="dropdown-divider"></div>
                                            <button className="dropdown-item text-danger" onClick={() => handleDelete(key, rep.id)}>
                                                <i className="dropdown-icon fe fe-trash-2"></i> Supprimer
                                            </button>
                                {/*            /!*<a href="" className="dropdown-item"><i className="dropdown-icon fe fe-layers"></i> Details </a>*!/*/}
                                {/*            <button disabled={!rep.provider} className="dropdown-item" onClick={() => {*/}
                                {/*                setShowLinkToProviderOption(false)*/}
                                {/*                setShowAdd(true)*/}
                                {/*                setProviderSelected(rep.provider)*/}
                                {/*                setLinkToProvider(true)*/}
                                {/*            }}>*/}
                                {/*                <i className="dropdown-icon fe fe-user-plus"></i> Ajouter utilisateur</button>*/}
                                            {/*<div className="dropdown-divider"></div>*/}
                                            {/*<button className="dropdown-item" onClick={() => setShowLinkProvider(rep)}>*/}
                                            {/*    <i className="dropdown-icon fe fe-user-check"></i> Lier à des prestataires*/}
                                            {/*</button>*/}
                                            {/*<button className="dropdown-item" onClick={() => setShowAddSpecialist(rep)}>*/}
                                            {/*    <i className="dropdown-icon fe fe-git-pull-request"></i> Ajouter spécialité*/}
                                            {/*</button>*/}
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
export default Users

const Select = styled.div`
    .select2.select2-container{
        width: 100%!important;
        border: 1px solid rgba(0, 40, 100, 0.12);
    }
    .select2-selection__arrow{
        top: 4px!important;
    }
    .select2-selection.select2-selection--single{
        padding: 0!important;
    }
`
