import React, {FC, useContext, useState} from "react";
import Popup from "../../utils/Popup";
import InputMask from "react-input-mask"
import { debounce } from "lodash"
import axios from "axios";
import Restricted from "../../utils/Restricted";
import AccountContext from "../../../context/AccountContext";
import {toast} from "react-toastify";
import styled from "styled-components";
import DragAndDrop from "../../utils/DragAndDrop";
import Select2 from "../../utils/form-components/Select2";
import ProviderContext from "../../../context/ProviderContext";
import Progress from "../../utils/Progress";

const Container = styled.div`
    display: flex;
    @media all and (max-width: 768px){
        flex-direction: column;
    }
`
const Uploader = styled.div`
    flex-basis: 350px;
    align-self: center;
    margin-top: -3em;
    @media all and (max-width: 768px){
        flex-basis: auto;
        align-self: auto;
        margin-top: 0;
    }
`
const Contents = styled.div`
    flex: 3;
`

interface IProps {
    children?: React.ReactNode,
    onClose?: any
}

const fileTypes = ["JPG", "PNG", "GIF", "JPEG", 'SVG']
const Add: FC<IProps> = (props: IProps) => {
    const {user} = useContext(AccountContext),
        {dispatch} = useContext(ProviderContext),
        [logo, setLogo] = useState<any>(),
        [uniqueEmail, setUniqueEmail] = useState<boolean>(true),
        [busy, setBusy] = useState<boolean>()
    const handleSubmit = (e: any) => {
        e.preventDefault()

        const form = new FormData(e.target)
        form.delete('logoFile')
        form.append("logoFile", logo[0])
        setBusy(true)
        axios.post(`/api/dashboard/provider`, form,{
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }).then((rep: any) => {
            setBusy(false)
            toast.success("Vos données ont été enregistrées!")
            dispatch({type: "ADD_PROVIDER", payload: rep.data.created})
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
            if (rep.data?.status && rep.data?.status === "error") setUniqueEmail(false)
        })
    }

    if (user.provider_id) return <Restricted/>
    return <Popup onPopupClose={() => typeof props.onClose === "function" ? props.onClose() : undefined} parentId={"2434sgs"}>
        {busy && <Progress/>}
      <form action="" onSubmit={handleSubmit}>
          <Container>
              <Uploader className="text-center">
                  <DragAndDrop previousImage={undefined} styles={{minHeight: '200px'}} labelTitle="Selectionner ou drager logo" fileTypes={fileTypes}
                               maxMBSize={1} handleChange={(e: any) => {console.log(e)}} name="logoFile"
                               onFinished={(files: any) => setLogo(files)}/>
              </Uploader>
              <Contents>
                  <fieldset className="mt-2">
                      <div className="form-group mb-2">
                          <label className="form-label">Nom<span className="form-required">*</span></label>
                          <input type="text" name="name" required={true} placeholder="Nom du prestataire" className="form-control"/>
                      </div>
                      <div className="form-group mb-2">
                          <label className="form-label">Abréviation<span className="form-required">*</span></label>
                          <input type="text" name="name_short" required={true} placeholder="Abréviation prestataire" className="form-control"/>
                      </div>
                      <div className="form-group mb-2">
                          <label className="form-label">Email<span className="form-required">*</span></label>
                          <InputMask type="email" onChange={debounce(checkEmail, 1500)} name="email" placeholder="e.g. email@vighor.com" required={true} className={`form-control${!uniqueEmail ? " is-invalid" : ""}`} mask=""/>
                          {!uniqueEmail && <span className="text-danger">Cet email n'est pas disponible.</span>}
                      </div>
                      <div className="form-group mb-0">
                          <label className="form-label">Phone number</label>
                          <InputMask type="tel" name="phone" required={true} mask="9999-9999" maskPlaceholder={null} placeholder="e.g. 3700-0000" className="form-control"/>
                      </div>
                  </fieldset>
                  <fieldset className="mt-2">
                      <div className="form-group mb-2">
                          <label className="form-label">Adresse<span className="form-required">*</span></label>
                          <input type="text" name="address_line_1" required={true} placeholder="e.g. 2, Delmas 19" className="form-control"/>
                      </div>
                      <div className="form-group mb-2">
                          <label className="form-label">Ville<span className="form-required">*</span></label>
                          <Select2 classes="dashboard-select2" multiple={false} onSearch={(e: any) => {}} searchKeys={ { id: 'id', text: ['name'] } } searchUrl={`/api/city/search`}
                                   selectedValue={undefined}
                                   onSelect={undefined}
                                   searchable={true} name="city" placeholder="e.g. Delmas" id="city"/>
                      </div>
                  </fieldset>

                  <div className="text-right p-0 pt-2 mt-2">
                      <div className="d-flex">
                          <button type="submit" disabled={!uniqueEmail} className="btn btn-primary ml-auto">Enregistrer</button>
                      </div>
                  </div>
              </Contents>
          </Container>
      </form>
  </Popup>
}

export default Add
