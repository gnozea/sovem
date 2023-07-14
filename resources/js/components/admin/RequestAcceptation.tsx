import React, {FC, useEffect, useState} from "react";
import Popup from "../utils/Popup";
import Progress from "../utils/Progress";
import axios from "axios";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom"
import { DatePicker } from 'antd';
import dayjs, {Dayjs} from "dayjs";
import BrowserTitle from "../utils/BrowserTitle";
import {toast} from "react-toastify";


interface IProps {

}

const Left = styled.div`
    flex-basis: 350px;
`

const Right = styled.div`
    flex: 3;
`

const Wrapper = styled.div`
    @media all and (min-width: 600px){
        display: flex;
    }
`
const rangePresets: {
    label: string;
    value: [Dayjs, Dayjs];
}[] = [
    { label: "Ajourd'hui", value: [dayjs(), dayjs()] },
    { label: 'Dans 3 jours', value: [dayjs().add(3, 'd'), dayjs()] },
    { label: 'Dans 5 jours', value: [dayjs().add(5, 'd'), dayjs()] },
    { label: 'Dans 7 jours', value: [dayjs().add(7, 'd'), dayjs()] },
    { label: 'Dans 15 jours', value: [dayjs().add(15, 'd'), dayjs()] },
    { label: 'Dans 30 jours', value: [dayjs().add(30, 'd'), dayjs()] },
];

const hours: any = {
    "08_10AM": "8h - 10h AM",
    "10_12PM": "10h - 12h PM",
    "12_2PM": "12h - 2h PM",
    "2_4PM": "2h - 4h PM"
}

const onRangeChange = (dates: null | (Dayjs | null)[], dateStrings: string[]) => {
    if (dates) {
        console.log('From: ', dates[0], ', to: ', dates[1]);
        console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
    } else {
        console.log('Clear');
    }
};

const RequestAcceptation: FC<IProps> = (props: IProps) => {

    //TODO verify if user is connected and is a service provider
    const [services, setServices] = useState<any>(),
        uuid = window.location.pathname.split('/'),
        [able, setAble] = useState<any>({}),
        [date, setDate] = useState<any>(dayjs().format("YYYY-MM-DD")),
        [time, setTime] = useState<any>("8h - 10h AM"),
        [claimed, setClaimed] = useState<any>(),
        [requestStatus, setRequestStatus] = useState<any>(),
        navigate = useNavigate();

    const handleCheck = (e: any, id: any, key: number) => {
        let ab = { ...able }

        if (!e.target.checked) delete ab[id]
        if (e.target.checked) ab[id] = id

        setAble(ab)
    }

    const handleAccept = (e: any) => {
      axios.post(`/api/dashboard/request/${services.request.id}`, {
          sR: Object.values(able),
          date: date,
          time: time
      }).then((rep: any) => {
          //Add error message for already claimed service

          //Add alert if one of services was previously claimed and trying to claim alongside of another.

          setRequestStatus(rep.data.status)
          setClaimed(rep.data.data)
      })
    }

    useEffect(() => {
        axios.get(`/api/dashboard/request/${uuid[uuid.length-1]}`).then((rep: any) => {
            setServices(rep.data.data)
        }).catch(error => {
            toast.error(error.response.data.msg)
            setTimeout(() => {
                navigate("/dashboard/requests")
            }, 1200)
        })
    }, [])

    if (!services) return <Progress/>

    if (services.service.length === 0) return <Popup closable={true} onPopupClose={() => navigate("/dashboard/requests")} parentId={12444}>
        <div className="text-wrap mt-4 mb-4">
            <h4 className="mt-0 mb-4">Demande non disponible</h4>
            <p>Il semble que cette demande ait déjà été prise par un autre prestataire. Nous vous informerons si la demande a été libérée ou non résolue!</p>
        </div>
    </Popup>

    if (!claimed && requestStatus === 'error') return <Popup closable={true} onPopupClose={() => navigate("/dashboard/requests")} parentId={12444}>
        <div className="text-wrap mt-4 mb-4">
            {requestStatus === 'error' && <div className="success-animation text-center">
                <img src="/images/error.svg" alt=""/>
            </div>}
            <div className="text-center">
                <h2 className="sc_item_title sc_title_title sc_item_title_style_decoration"><span
                    className="sc_item_title_text">Vous avez déjà envoyé votre candidature</span>
                </h2>
                <p>Vous ne pouvez envoyer une proposition qu'une seule fois par service. Si le candidat approuve votre proposition, nous vous enverrons un e-mail.</p>
            </div>
        </div>
    </Popup>

    if (claimed) return <Popup onPopupClose={() => navigate("/dashboard/requests")}  options={{closable: true}} closable={true} parentId={12444}>
        <div className="text-wrap mt-6 mb-4">
            {requestStatus === 'success' && <div className="success-animation">
                <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                    <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
                    <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                </svg>
            </div>}
            {requestStatus === 'error' && <div className="success-animation text-center">
                <img src="/images/error.svg" alt=""/>
            </div>}
            {requestStatus === 'success' && <div className="text-center">
                <h2 className="sc_item_title sc_title_title sc_item_title_style_decoration"><span
                    className="sc_item_title_text">Vous avez reclamé {`${claimed.affected === 1 ? "un" : "des"}`} service{`${claimed.affected === 1 ? "" : "s"}`}</span>
                </h2>
                <p className="text-danger">Une fois que le candidat aura accepté votre proposition, nous vous en informerons par e-mail. Vous verrez alors vos demandes approuvées sous l'onglet accepté de la page de demande.</p>
                {claimed.affected !== Object.values(able).length &&
                    <p className="text-danger">Certaines de vos demandes ne vous ont pas été accordées. Vous verrez vos réclamations approuvées dans la liste de vos réclamations.</p>
                }
            </div>}
            {requestStatus === 'error' && <div className="text-center">
                <h2 className="sc_item_title sc_title_title sc_item_title_style_decoration"><span
                    className="sc_item_title_text">Service{`${claimed.affected === 1 ? "" : "s"}`} non accordé{`${claimed.affected === 1 ? "" : "s"}`}</span>
                </h2>
                <p>Il semble que cette demande ait été supprimée ou qu'un autre fournisseur l'ait déjà récupérée. Nous vous ferons savoir si disponible ou libéré.</p>
            </div>}
            <div className="text-center mt-3 mb-3">
                <button type="button" onClick={() => navigate("/dashboard/requests")} className="btn btn-dark btn-sm">Fèmen fenèt la</button>
            </div>
        </div>
    </Popup>
    return <Popup onPopupClose={(e: any) => navigate("/dashboard/requests")} parentId={12444} options={{closable: false}}>
        <BrowserTitle title={"Accepter une demande"}/>
        <Wrapper className="text-wrap mt-4 mb-4">
            <Left>
                <h4 className="mt-0 mb-4">Détails</h4>
                <strong>Type de violence</strong>
                <ul>
                    {services.request.violence_type.map((request: any, key: number) => <li key={key}>{request}</li>)}
                </ul>
                <p style={{ lineHeight: '.8' }}>
                    <strong>Lieu d'incident</strong>: {services.request.incident_location}
                </p>
                <p className="mt-3" style={{ lineHeight: '.8' }}>
                    <strong>Lieu de résidence</strong>: {`${services.request.city.name.trim()}, ${services.request.city.zip}`}
                </p>
            </Left>
            <Right>
                <h4 className="mt-0 mb-4">Quel service souhaitez-vous fournir ?</h4>
                <div className="custom-controls-stacked">
                    {services.service.map((service: any, key: number) => {
                        return <label key={key} className="custom-control custom-checkbox">
                            <input type="checkbox" onChange={(e) => handleCheck(e, service.id, key)}
                                   className="custom-control-input" name="able"/>
                            <span className="custom-control-label">{service.specialities.name}</span>
                        </label>
                    })}
                    <div className="divider-inner mt-4"></div>
                    <div className="" style={{ zIndex: "999999"}}>
                        <DatePicker defaultValue={dayjs()} disabledDate={function disabledDate(current) {
                            // Can not select days before today and today
                            return current && current.valueOf() < Date.now();
                        }} format={"DD/MM/YYYY"} style={{ width: "100%", display: "block" }} showToday={false} onChange={(date: Dayjs) => setDate(date.format("YYYY-MM-DD"))}
                                    /*presets={rangePresets}*/ popupClassName="office-hours" placeholder="Choisir date du rendez-vous." />
                    </div>
                    <div className="btn-group mt-4" style={{ width: "100%" }}>
                        {Object.keys(hours).map((hr: any, key: number) => <button key={key} onClick={() => setTime(hours[hr])} className={`btn ${time === hours[hr] ? " btn-danger" : "btn-outline-danger"} btn-sm`}>{hours[hr]}</button>)}
                    </div>
                </div>
            </Right>
        </Wrapper>
        <div className="card-footer text-right p-1">
            <div className="d-flex">
                <Link to="/dashboard/requests" className="btn btn-link">Annuler</Link>
                <button disabled={Object.keys(able).length === 0} type="submit" onClick={handleAccept} className="btn btn-primary ml-auto">Accepter</button>
            </div>
        </div>
    </Popup>

}

export default RequestAcceptation
