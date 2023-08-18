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
import Select2 from "../../utils/form-components/Select2";


interface IProps {
    children?: React.ReactNode,
    onClose?: any,
    provider: any
}


const AddressChange: FC<IProps> = (props: IProps) => {
    const {user} = useContext(AccountContext),
        {providers, dispatch} = useContext(ProviderContext),
        [busy, setBusy] = useState<boolean>()


    const handleSubmit = (e: any) => {
        e.preventDefault()

        const form = new FormData(e.target)

        form.append("_method", "PUT")
        setBusy(true)
        axios.post(`/api/dashboard/provider/${props.provider.id}/change-address`, form).then((rep: any) => {
            dispatch({type: "EDIT_PROVIDER", payload: {index: props.provider.index, update: rep.data.update}})
            toast.success("Vos données ont été mis à jours!")
            setBusy(false)
            props.onClose()
        }).catch(error => {
            toast.error(error.response.data.message)
            setBusy(false)
            props.onClose()
        })
    }

    if (user.provider_id) return <Restricted/>
    return <Popup onPopupClose={() => typeof props.onClose === "function" ? props.onClose() : undefined} title="Changement d'adresse" isSmall={true} parentId={"24634sgs"}>
        {busy && <Progress/>}
      <form action="" onSubmit={handleSubmit}>
          <fieldset className="mt-2">
              <div className="form-group mb-2">
                  <label className="form-label">Adresse<span className="form-required">*</span></label>
                  <input type="text" name="address_line_1" required={true} placeholder="Nom du prestataire" defaultValue={props.provider.address_line_1} className="form-control"/>
              </div>
          </fieldset>
          <fieldset className="mt-2">
            <div className="form-group mb-2">
                <label className="form-label">Ville<span className="form-required">*</span></label>
                <Select2 classes="dashboard-select2" multiple={false} onSearch={(e: any) => {}} searchKeys={ { id: 'id', text: ['name'] } } 
                searchUrl={`/api/city/search?all=true`} selectedValue={undefined}
                        onSelect={undefined}
                        searchable={true} name="city" placeholder="e.g. Delmas" id="city"/>
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

export default AddressChange
