import React, {FC, useContext, useRef, useState} from "react";
import AccountContext from "../../../context/AccountContext";
import Progress from "../../utils/Progress";
import axios from "axios";
import {toast} from "react-toastify";
import Popup from "../../utils/Popup";


interface IProps {

}

const Profile: FC<IProps> = (props: IProps) => {
    const {user, dispatch} = useContext(AccountContext),
        [showPassWordEditor, setShowPassWordEditor] = useState<boolean>(false),
        [showBusy, setShowBusy] = useState<boolean>(),
        [newInvalid, setNewInvalid] = useState<boolean>(),
        [password, setPassword] = useState<{old: string, new: string, confirm: string}>()

    const handleNew = (e: any) => {
        setNewInvalid(false)
        if (password?.confirm && e.target.value !== password.confirm) return setNewInvalid(true)
        setPassword((prevState) => {
            return {...prevState, new: e.target.value}
        })
    }
    const handleConfirm = (e: any) => {
        setNewInvalid(false)
        if (password?.new && e.target.value !== password.new) return setNewInvalid(true)
        setPassword((prevState) => {
            return {...prevState, confirm: e.target.value}
        })
    }

    const handleSetPassword = (e: any) => {
        e.preventDefault()
        const form = new FormData()
        Object.keys(password).forEach((k: any) => {
            // @ts-ignore
            form.append(k, password[k])
        })
        setShowBusy(true)
        axios.post("/api/dashboard/change-password", form).then((rep) => {
            setShowBusy(false)
            setShowPassWordEditor(false)
            toast.success(rep.data.message)
        }).catch((error) => {
            return toast.error('votre mot de passe n\'a pas été changé.')
        })
    }

    return <div className="my-3 my-md-5">
        {showBusy && <Progress/>}
        <div className="container">
            <div className="col-lg-8 mx-auto">
                <div className="card card-profile">
                    <div className="card-header" style={{backgroundImage: `url(/images/dino-reichmuth-84359-1500.jpg)`}}></div>
                    <div className="card-body text-center">
                        <img className="card-profile-img" alt="photo" style={{ width: "6rem", height: "6rem" }} src="/images/default-profile.png"/>
                            <h3 className="mb-3">{user.name}</h3>
                            <h4 className="mb-3" style={{ fontWeight: "400" }}>{user.email}</h4>
                            <h5 className="mb-3" style={{ fontWeight: "400" }}>{!user?.provider ? "Administrateur" : user.provider.name_short}</h5>
                            <p className="mb-4"></p>
                            <button className="btn btn-outline-primary btn-sm" onClick={() => setShowPassWordEditor(!showPassWordEditor)}>
                                <span className="fa fa-pencil"></span> Changer mot de passe
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        {showPassWordEditor && <Popup onPopupClose={() => setShowPassWordEditor(false)} title="Changer mot de passe" isSmall={true} parentId={2012-1161}>
                <div className="mx-auto text-left">
                    <div className="card" style={{ border: "none", boxShadow: "none" }}>
                        <div className="card-body">
                            <div className="form-group">
                                <label className="form-label">Ancien mot de passe</label>
                                <input onChange={(e: any) => setPassword((prevState) => {
                                    return {...prevState, old: e.target.value}
                                })} type="password" placeholder="Ancien mot de passe" className="form-control"/>
                            </div>
                            <div className="form-group">
                                <input type="hidden" value={user.email} name="email" autoComplete="username"/>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Nouveau mot de passe</label>
                                <input onChange={handleNew} type="password" placeholder="Nouveau mot de passe" className="form-control" autoComplete="new-password"/>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Confirmer nouveau</label>
                                <input onChange={handleConfirm} type="password" placeholder="Confirmer nouveau mot de passe" className={`form-control${newInvalid ? " is-invalid" : ""}`}/>
                                {newInvalid && <div className="invalid-feedback">Les deux mot de passes sont différents</div>}
                            </div>
                            <div className="form-footer">
                                <button onClick={handleSetPassword} className="btn btn-primary btn-block">Modifier</button>
                            </div>
                        </div>
                    </div>
                </div>
            </Popup>}
    </div>
}
export default Profile
