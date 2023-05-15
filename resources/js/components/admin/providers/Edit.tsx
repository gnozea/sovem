import React, {FC, useContext, useState} from "react";
import Popup from "../../utils/Popup";
import InputMask from "react-input-mask"
import axios from "axios";
import Restricted from "../../utils/Restricted";
import AccountContext from "../../../context/AccountContext";
import {toast} from "react-toastify";
import ProviderContext from "../../../context/ProviderContext";
import Progress from "../../utils/Progress";


interface IProps {
    children?: React.ReactNode,
    onClose?: any,
    provider: any
}


const Edit: FC<IProps> = (props: IProps) => {
    const {user} = useContext(AccountContext),
        {providers, dispatch} = useContext(ProviderContext),
        [busy, setBusy] = useState<boolean>()
    const handleSubmit = (e: any) => {
        e.preventDefault()

        const form = new FormData(e.target)

        form.append("_method", "PUT")
        setBusy(true)
        axios.post(`/api/dashboard/provider/${providers[props.provider].id}`, form).then((rep: any) => {
            dispatch({type: "EDIT_PROVIDER", payload: {index: props.provider, update: rep.data.update}})
            toast.success("Vos données ont été mis à jours!")
            setBusy(false)
            props.onClose()
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
                  <InputMask type="email" name="email" placeholder="e.g. email@vighor.com" required={true} className="form-control" defaultValue={providers[props.provider].email} mask=""/>
              </div>
              <div className="form-group mb-0">
                  <label className="form-label">Phone number</label>
                  <InputMask type="tel" name="phone" required={true} mask="9999-9999" maskPlaceholder={null} placeholder="e.g. 3700-0000" className="form-control" defaultValue={providers[props.provider].phone}/>
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
