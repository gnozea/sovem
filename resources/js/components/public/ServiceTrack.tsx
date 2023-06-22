import React, {FC, useRef, useState} from "react";
import axios from "axios";
import Moment from "react-moment";
import Popup from "../utils/Popup";
import moment from "moment/moment";
import ConfirmProvider from "./ConfirmProvider";
import DisplayTrack from "./DisplayTrack";
import DisplayConfirmed from "./DisplayConfirmed";

const calendarStrings = {
    lastDay : '[Yè v`] LT',
    sameDay : '[Jodi a vè] LT',
    nextDay : '[Demen vè] LT',
    lastWeek : 'dddd [dènye] [vè] LT',
    nextWeek : 'dddd [vè] LT',
    sameElse : 'L'
};

type IProps = {

}

const ServiceTrack: FC<IProps> = (props: IProps) => {
    moment.locale('fr');
    const [tracking, setTracking] = useState<string|number>(),
        [results, setResults] = useState<any>(),
        [confirmed, setConfirmed] = useState<any>([]),
        [showPopup, setShowPopup] = useState<any>(),
        [showConfirmProvider, setShowConfirmProvider] = useState<boolean>(),
        [canNext, setCanNext] = useState<boolean>(),
        [current, setCurrent] = useState<number>(0)

    const getData = () => {
        axios.get(`/api/track/${tracking}`).then((rep: any) => {
            setConfirmed(rep.data.data.confirmed)
            let data: any = {...rep.data.data}
            delete data['confirmed']
            setResults(data)
            setShowPopup(true)
        })
    }
    const handleTrack = (e: any) => {
        e.preventDefault()
        getData()
    }

    const handleSubmit = (data: any) => {
        const form = new FormData();
        let choices: any = []
        data.forEach((d: any) => {
            choices.push({
                service_id: d.service_id,
                provider_id: d.provider_id,
                request_id: d.request_id,
                speciality_id: d.speciality_id,
            })
        })
        form.append("confirm", JSON.stringify(choices))

        axios.post("/api/track/confirm", form).then((rep: any) => {
            setShowConfirmProvider(false)
            setCurrent(0)
            getData()
        })
    }

    return <>
            <div className="col-12 col-md-8 pb-4 mx-auto">
                <div className="position-relative service-form-request-wrap">
                    <section className="vighor-section vighor-top-section vighor-element vighor-element-21b3bff vighor-section-boxed vighor-section-height-default vighor-section-height-default">
                        <div className="vighor-container vighor-column-gap-extended">
                            <div className="vighor-row">
                                <div className="vighor-column vighor-col-100 vighor-top-column vighor-element vighor-element-51472d7 sc_inner_width_none sc_content_align_inherit sc_layouts_column_icons_position_left">
                                    <div className="vighor-column-wrap vighor-element-populated">
                                        <div className="vighor-widget-wrap service-follow-up">
                                            <div className="vighor-element vighor-element-ca6ee5d sc_height_huge sc_fly_static vighor-widget vighor-widget-spacer">
                                                <div className="vighor-widget-container">
                                                    <div className="">
                                                        <div style={{width: "250px", margin: "10px auto"}}>
                                                            <img src="/images/4967841.png" alt=""/>
                                                        </div>
                                                        <div className="text-center">
                                                            <h2 className="sc_item_title sc_title_title sc_item_title_style_decoration"><span
                                                                className="sc_item_title_text">Swiv dosye w la</span>
                                                            </h2>
                                                            <div className="mt-3">
                                                                <p>Antre nimewo dosye ou a nan fòmilè ki anba a pouw ka gade tout dènye aktivite ki fèt nan dosye ou a.</p>
                                                                <div className="scheme_default text-center">
                                                                    <div className="">
                                                                        <div className="col-12 col-md-6 mx-auto">
                                                                            <h6 className="mt-2 text-start mb-0">
                                                                                <span className="vighor-title">Ki nimewo dosye w la?</span>
                                                                            </h6>
                                                                            <>
                                                                                <div className="QuestionBody">
                                                                                    <div className="ChoiceStructure">
                                                                                        <div className="dk-speakout-full">
                                                                                            <input autoComplete="off" name="DS~NO~990"
                                                                                                   id="folderN" type="text"
                                                                                                   onChange={(e: any) => setTracking(e.target.value)}
                                                                                                   placeholder="Mete nimewo dosye w la" className="fill_inited"/>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </>
                                                                            <div className="dk-speakout-submit-wrap mt-3">
                                                                                <button disabled={!tracking} onClick={handleTrack} className="dk-speakout-submit sc_button_hover_slide_left Question-Next-Button">
                                                                                    <span className="">Verifye eta demand lan</span>
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {(results?.services.length === 0 && confirmed.length === 0) && <Popup onPopupClose={() => setShowPopup(false)} parentId={1900}>
                                                            <div className="results-set mt-4 text-center">
                                                                <div style={{ width: "200px", margin: "0 auto" }}>
                                                                    <img src="/images/novelist-writing-animate.svg" alt=""/>
                                                                </div>
                                                                <h4 className="mt-0">
                                                                    <span className="">Demand ou an poko trete</span>
                                                                </h4>
                                                                <p className="mb-2">Okenn prestatè poko aksepte trete dosye w la. Pa enkyete w yap reponn ou nan yon ti tan!</p>
                                                                <p className="text-center m-0 mb-2" style={{ fontSize: "20px", fontWeight: "600" }}>Dosye {results.request.ticket_number}</p>
                                                            </div>
                                                        </Popup>
                                                    }
                                                    {(results?.services.length > 0 || confirmed.length > 0)&& showPopup && <Popup onPopupClose={() => {setShowPopup(false);setCurrent(0);setShowConfirmProvider(false)}} parentId={1900}>
                                                        {!showConfirmProvider && results.services.length > 0 && <DisplayTrack details={results} onWillConfirmProvider={() => setShowConfirmProvider(true)}/>}
                                                        {showConfirmProvider && <ConfirmProvider currentPage={current+1} maxPage={results?.services.length}
                                                                                                 onBack={() => {
                                                                                                     if (current === 0) setShowConfirmProvider(false)
                                                                                                     if (current === 1)setCurrent((prevState) => prevState-1)
                                                                                                 }} details={results.services[current]} onDone={handleSubmit} canNext={(e: boolean) => setCanNext(e)}/>
                                                        }
                                                        <div className="text-center mb-2">
                                                            {(showConfirmProvider && current+1 < results?.services.length) &&
                                                                <button disabled={!canNext} type="button" onClick={() => {
                                                                    setCurrent((cu) => cu + 1)
                                                                    setCanNext(false)
                                                                }} className="give-btn give-btn-modal sc_button_hover_slide_left border-0 mb-1">Ale nan pwochen an</button>
                                                            }
                                                        </div>
                                                        {!showConfirmProvider && confirmed.length > 0 && <DisplayConfirmed details={confirmed} onWillConfirmProvider={() => setShowConfirmProvider(true)}/>}

                                                        <p className="text-danger">Sonje, nou pa antite k ap founi sèvis la. Nou jis fè yon pon ant oumenm ansanm ak founisè a.</p>
                                                    </Popup>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
}

export default ServiceTrack
