import React, {FC, useState} from "react";
import axios from "axios";
import {Link, redirect} from "react-router-dom";
import Progress from "../components/utils/Progress";
import Popup from "../components/utils/Popup";
import {toast} from "react-toastify";

type IProps = {

}

const Login: FC<IProps> = (props: IProps) => {

    const [email, setEmail] = useState<string>(),
        [password, setPassword] = useState<string>(),
        [busy, setBusy] = useState<boolean>(),
        [loginError, setLoginError] = useState<string>(),
        [rememberMe, setRememberMe] = useState<boolean>(false),
        [showPasswordReset, setShowPasswordReset] = useState<boolean>()

    const handleSubmit = (e: any) => {
        e.preventDefault()
        if (!password || password.trim() === "") return
        if (!email || email.trim() === "") return
        const form = new FormData()
        form.append("password", password)
        form.append("email", email)
        // @ts-ignore
        form.append('remember', rememberMe)
        setBusy(true)
        axios.post("/login", form).then((rep: any) => {
            location.reload();
        }).catch((error: any) => {
            setLoginError("Adresse email ou mot de passe invalide")
            setBusy(false)
        })
    }

    function handleReset(e: any) {
        e.preventDefault()
        setBusy(true)
        setShowPasswordReset(false)
        axios.post("/api/login/reset-password", {email: email}).then(rep => {
            toast.success("Un lien de restauration à été envoyé.")
            setBusy(false)
        }).catch((err) => setBusy(false))
    }

    return <div className="page">
      {busy && <Progress/>}
      {showPasswordReset && <Popup onPopupClose={() => setShowPasswordReset(false)} isSmall={true} parentId={2000}>
          <div className="card-title">Restaurer mot de passe</div>
          <form onSubmit={handleReset}>
              <div className="form-group">
                  <label className="form-label">Adresse email</label>
                  <input type="email" className="form-control" id="reset-email" name={"resetEmail"} onChange={(e: any) => setEmail(e.target.value)} defaultValue={email}
                         aria-describedby="emailHelp" placeholder="Email"/>
              </div>
              <div className="form-footer">
                  <button type="submit" className="btn btn-primary btn-block">Restaurer</button>
              </div>
          </form>
      </Popup>}
      <div className="page-single">
          <div className="container">
              <div className="row">
                  <div className="col col-login mx-auto">
                      <div className="text-center mb-6">
                          <img src="/images/logo.png" className="h-6" alt=""/>
                      </div>
                      <form className="card" onSubmit={handleSubmit} method="post">
                          <div className="card-body p-6">
                              <div className="card-title">Connecter à votre compte</div>
                              <div className="form-group">
                                  <label className="form-label">Adresse email</label>
                                  <input type="email" className="form-control" id="email" onChange={(e: any) => setEmail(e.target.value)} defaultValue={email}
                                         aria-describedby="emailHelp" placeholder="Email"/>
                              </div>
                              <div className="form-group">
                                  <label className="form-label">
                                      Mot de passe
                                      <Link to="#" onClick={(e) => {
                                          e.preventDefault()
                                          setShowPasswordReset(true)
                                      }} className="float-right small">Mot de passe oublié</Link>
                                  </label>
                                  <input type="password" className="form-control" id="password" onChange={(e: any) => setPassword(e.target.value)} defaultValue={password}
                                         placeholder="Password"/>
                              </div>
                              {loginError && <p className="text-danger">{loginError}</p>}
                              <div className="form-group">
                                  <label className="custom-control custom-checkbox">
                                      <input type="checkbox" defaultChecked={rememberMe} className="custom-control-input" onChange={(e: any) => setRememberMe(e.target.checked)}/>
                                          <span className="custom-control-label">Se souvenir de moi</span>
                                  </label>
                              </div>
                              <div className="form-footer">
                                  <button type="submit" className="btn btn-primary btn-block">Se connecter</button>
                              </div>
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
export default Login
