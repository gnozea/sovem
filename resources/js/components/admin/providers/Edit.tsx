import React, {FC, useContext, useState} from "react";
import Popup from "../../utils/Popup";
import InputMask from "react-input-mask"
import axios from "axios";
import Restricted from "../../utils/Restricted";
import AccountContext from "../../../context/AccountContext";
import {toast} from "react-toastify";
import ProviderContext from "../../../context/ProviderContext";
import Progress from "../../utils/Progress";
import {debounce} from "lodash";


interface IProps {
    children?: React.ReactNode,
    onClose?: any,
    provider: any
}


const Edit: FC<IProps> = (props: IProps) => {
    const {user} = useContext(AccountContext),
        {providers, dispatch} = useContext(ProviderContext),
        [email, setEmail] = useState<string>(),
        [uniqueEmail, setUniqueEmail] = useState<boolean>(true),
        [busy, setBusy] = useState<boolean>()
    const handleSubmit = (e: any) => {
        e.preventDefault()

        const form = new FormData(e.target)

        if (email && email.trim().length) form.append("email", email)

        form.append("_method", "PUT")
        setBusy(true)
        axios.post(`/api/dashboard/provider/${providers[props.provider].id}`, form).then((rep: any) => {
            dispatch({type: "EDIT_PROVIDER", payload: {index: props.provider, update: rep.data.update}})
            toast.success("Vos données ont été mis à jours!")
            setBusy(false)
            props.onClose()
        })
    }

    const checkEmail = (e: any) => {
        if (e.target.value.trim() === "") return
        setUniqueEmail(true)
        axios.get("/api/dashboard/checkByEmail", {
            params: {
                email: e.target.value
            }
        }).then((rep) => {
            if (rep.data?.status && rep.data?.status === "error" && rep.data.data.email !== providers[props.provider].email) {
                setEmail(undefined)
                setUniqueEmail(false)
            }else{
                setEmail(e.target.value.trim())
            }
        })
    }

    if (user.provider_id) return <Restricted/>
    return <Popup onPopupClose={() => typeof props.onClose === "function" ? props.onClose() : undefined} isSmall={true} parentId={"2434sgs"}>
        {busy && <Progress/>}
      <form action="" onSubmit={handleSubmit}>
          <fieldset className="mt-2">
              <div className="form-group mb-2">
                  <label className="form-label">Nom<span className="form-required">*</span></label>
                  <input type="text" name="name" required={true} placeholder="Nom du prestataire" defaultValue={providers[props.provider].name} className="form-control"/>
              </div>
              <div className="form-group mb-2">
                  <label className="form-label">Abréviation<span className="form-required">*</span></label>
                  <input type="text" name="name_short" required={true} placeholder="Abréviation prestataire" defaultValue={providers[props.provider].name_short} className="form-control"/>
              </div>
              <div className="form-group mb-2">
                  <label className="form-label">Email<span className="form-required">*</span></label>
                  <InputMask type="email" name="email" onChange={debounce(checkEmail, 1500)} placeholder="e.g. email@vighor.com" required={true} className="form-control" defaultValue={email ? email : providers[props.provider].email} mask=""/>
                  {!uniqueEmail && <span className="text-danger">Cet email n'est pas disponible.</span>}
              </div>
              <div className="form-group mb-0">
                  <label className="form-label">Phone number</label>
                  <InputMask type="tel" name="phone" disabled={!uniqueEmail} required={true} mask="9999-9999" maskPlaceholder={null} placeholder="e.g. 3700-0000" className="form-control" defaultValue={providers[props.provider].phone}/>
              </div>
          </fieldset>
          <div className="card-footer text-right p-0 pt-2 mt-2">
              <div className="d-flex">
                  <button type="submit" className="btn btn-primary ml-auto">Mettre à jour</button>
              </div>
          </div>
      </form>
  </Popup>
}

export default Edit
