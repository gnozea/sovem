import React, {FC, useContext, useState} from "react";
import Progress from "../../utils/Progress";
import InputMask from "react-input-mask";
import axios from "axios";
import {Link} from "react-router-dom";
import AccountContext from "../../../context/AccountContext";
import MFAEnrollment from "./MFAEnrollment";

interface IProps {

}

const MFALogin: FC<IProps> = (props: IProps) => {
    const [busy, setBusy] = useState<boolean>(),
        [otpError, setOtpError] = useState<string>(),
        {user} = useContext(AccountContext)

    const handleCheckAuthenticator = (e: any) => {
        setOtpError(undefined)
        if (e.target.value.length === 7){

            let arr: any = {
                code: e.target.value.replace(" ", '')
            }
            setBusy(true)
            axios.post('/api/post-login/otp', arr).then((res) => {
               if(res.data.status === "success") return location.reload();
               setOtpError("Ce code n'est pas valide")
                setBusy(false)
            });
        }
    }

    if(!user) return <Progress/>
    return <div className="page">
        {busy && <Progress/>}
        <div className="page-single">
            <div className="container">
                <div className="row">
                    <div className="col col-login mx-auto" style={{maxWidth: !user?.mfa ? "28em" : "24em"}}>
                        <div className="text-center mb-6">
                            <img src="/images/logo.png" className="h-6" alt=""/>
                        </div>
                        <form className="card" onSubmit={undefined} method="post">
                            <div className={`card-body ${!user?.mfa ? "p-" : "p-6"}`}>
                                <div className="card-title text-center">Authentification à 2 Facteurs</div>
                                {user?.mfaCapable && <>
                                    <div className="form-group">
                                        <label className="form-label">
                                            OTP
                                        </label>
                                        <div className="QuestionBody">
                                            <div className="ChoiceStructure">
                                                <div className="form-group">
                                                    <InputMask type="text" name="phone" required={true} mask="999 999" maskPlaceholder={null}
                                                               onChange={handleCheckAuthenticator}
                                                               placeholder="Authenticator app code" className="form-control"
                                                    />
                                                </div>
                                                {otpError && <p className="text-danger">{otpError}</p>}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-footer">
                                        <button type="submit" className="btn btn-primary btn-block">Confirm code</button>
                                    </div>
                                    <Link to="#" className="mt-3 d-block" onClick={(e: any) => {
                                        e.preventDefault()
                                        axios.post("/logout").then((rep) => {
                                            location.reload();
                                        })
                                    }}>Annuler authentification</Link>
                                </>}
                                {!user?.mfaCapable && <>
                                    <MFAEnrollment/>
                                </>}
                            </div>
                        </form>
                        {/*<div className="text-center text-muted">*/}
                        {/*    Don't have account yet? <a href="./register.html">Sign up</a>*/}
                        {/*</div>*/}
                    </div>
                </div>
            </div>
        </div>
    </div>
}
export default MFALogin
