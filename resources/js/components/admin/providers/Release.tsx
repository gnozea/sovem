import React, {FC, Fragment, useContext, useState} from "react";
import Popup from "../../utils/Popup";
import axios from "axios";
import AccountContext from "../../../context/AccountContext";
import {toast} from "react-toastify";
import styled from "styled-components";
import Progress from "../../utils/Progress";
import RequestContext from "../../../context/RequestContext";
import {Navigate} from "react-router-dom";

const Wrapper = styled.label`
    display: flex;
`

interface IProps {
    item?: any,
    onClose?: any
}

const Release: FC<IProps> = (props: IProps) => {
    const {user} = useContext(AccountContext),
        { state, dispatch } = useContext(RequestContext),
        [selections, setSelections] = useState<any>({}),
        [busy, setBusy] = useState<boolean>()

    const handleChange = (e: any, index: number) => {
        if (e.target.checked) {
            const selects: any = {
                provider_id: state[props.item].requests[index].provider_id,
                request_id: state[props.item].requests[index].request_id,
                service_id: state[props.item].requests[index].service_id,
                speciality_id: state[props.item].requests[index].speciality_id
            }
            setSelections((prevState: any) => {
                prevState = {...prevState, [`release-${index}`]: selects}
                return prevState
            })
        }
        if (!e.target.checked) setSelections((prevState: any) => {
            delete prevState[`release-${index}`]
            return prevState
        })
    }
    const handleSubmit = (e: any) => {
        e.preventDefault()
        setBusy(true)
        axios.post('/api/dashboard/request/release', Object.values(selections)).then((rep: any) => {
            if (rep.data.released) toast.success(`Vous avez relaché ${rep.data.released} demande${rep.data.released > 1 ? "s" : ""} de service!`)
            if (!rep.data.released) toast.error("Aucune demande de service n'a été libéré.")
            setBusy(false)
            setTimeout(() => window.location.reload(), 2000) //Bottom codes are replaced by this code since just reload the page would fetch data no need to update state to avoid complications
            //dispatch({type: "UPDATE_RELEASED", payload: selections}) //Ignored because condition may changed in the future
        })
    }

    return <Popup onPopupClose={() => typeof props.onClose === "function" ? props.onClose() : undefined} parentId={"2434993"}>
        {busy && <Progress/>}
        <span className="d-block">Sélectionner service à relacher</span>
        <div className="mt-5">
            <h3>Dossier: {state[props.item].ticket_number}</h3>
            {state[props.item].requests.map((item: any, key: number) => {
                return <Fragment key={key}>
                    <Wrapper htmlFor={`879~e45~${key}`} className="">
                        <label className="custom-control custom-checkbox">
                            <input type="checkbox" onChange={(e: any) => handleChange(e, key)} disabled={!item.provider} id={`879~e45~${key}`} className="custom-control-input" value="option1"
                                   />
                            <span className="custom-control-label"></span>
                        </label>
                        <div className="">
                            {!user.provider_id && <>
                                <h4 className="m-0">{!item.provider ? <span className="text-muted text-warning">En attente de réclamation</span> : item.provider.name}</h4>
                                <p>{item.specialities.name}</p>
                            </>}
                            {user.provider_id && <h4>{item.specialities.name}</h4>}
                        </div>
                    </Wrapper>
                    {key+1 < state[props.item].requests.length && <div className="divider-outer mb-3" style={{ width: "100%", height: "4px" }}/>}
                </Fragment>
            })
            }
            <div className="text-center">
                <button onClick={handleSubmit} disabled={!Object.keys(selections).length } className="btn btn-primary">Relacher sélection</button>
            </div>
        </div>
  </Popup>
}

export default Release
