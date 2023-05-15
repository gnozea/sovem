import React, {FC, useEffect, useRef, useState} from "react";
import axios from "axios";
import moment from "moment/moment";
import Progress from "../utils/Progress";
import Popup from "../utils/Popup";
import {toast} from "react-toastify";

type IProps = {

}

const CreateProvider: FC<IProps> = (props: IProps) => {
    moment.locale('fr');
    const [details, setDetails] = useState<any>(),
        [name, setName] = useState<string>(),
        [busy, setBusy] = useState<boolean>(),
        [password, setPassword] = useState<string>(),
        url = window.location.pathname.split("/").filter((u: any) => {
            return u !== ""
        })
    useEffect(() => {
        axios.get(`/api/provider/init/${url[url.length-1]}`).then((rep: any) => {
            if(rep.data.status === "success") setDetails(rep.data.data);
        })
    }, [])

    const handleSubmit = (e: any) => {
        e.preventDefault()
        const form = new FormData(e.target)
        form.append("provider", details.provider_id)
        setBusy(true)
        axios.post(`/api/provider/init/${url[url.length-1]}`, form, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }).then((rep: any) => {
            if (rep.data.status === "success"){
                setTimeout(() => {
                    window.location.href = "/dashboard"
                    toast.success("Compte confirmé! Redirection en cours.")
                }, 3000)
                return
            }
            toast.error("Compte inexistant ou lien invalide.")
            setBusy(false)
        })
    }

    if (details === undefined) return <Popup onPopupClose={() => {}} fullWidth={true} parentId={12748838}>
        <Progress/>
    </Popup>

    if (!details) return <Popup onPopupClose={() => {}} fullWidth={true} parentId={12748838}>

        <div className="col-12 col-md-8 pb-4 mx-auto">
            <div className="vighor-column-wrap vighor-element-populated">
                <div className="vighor-widget-wrap">
                    <div className="vighor-element vighor-element-ca6ee5d sc_height_huge sc_fly_static vighor-widget vighor-widget-spacer">
                        <div className="vighor-widget-container">
                            <h2 className="sc_item_title sc_title_title sc_item_title_style_decoration"><span
                                className="sc_item_title_text">Compte non trouvé</span>
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Popup>

    return <>
        {busy && <div style={{position: "absolute", width: "100%", height: "100%",zIndex: "999"}}>
            <Progress style={"skype"} color={"#E89C42"}/>
        </div>}
            <div className="col-12 col-md-8 pb-4 mx-auto">
                <div className="position-relative service-form-request-wrap">
                    <section className="vighor-section vighor-top-section vighor-element vighor-element-21b3bff vighor-section-boxed vighor-section-height-default vighor-section-height-default">
                        <div className="vighor-container vighor-column-gap-extended">
                            <div className="vighor-row">
                                <div className="vighor-column vighor-col-100 vighor-top-column vighor-element vighor-element-51472d7 sc_inner_width_none sc_content_align_inherit sc_layouts_column_icons_position_left">
                                    <div className="vighor-column-wrap vighor-element-populated">
                                        <div className="vighor-widget-wrap">
                                            <div className="vighor-element vighor-element-ca6ee5d sc_height_huge sc_fly_static vighor-widget vighor-widget-spacer">
                                                <div className="vighor-widget-container">
                                                    <div className="">
                                                        {!details?.provider.logo && <div style={{width: "250px", margin: "10px auto"}}>
                                                            <img src="/images/my-account-animate.svg" alt=""/>
                                                        </div>}
                                                        {details?.provider.logo && <div style={{width: "250px", margin: "10px auto"}}>
                                                            <img src={`/${details.provider.logo}`} alt=""/>
                                                        </div>}
                                                        <div className="text-center">
                                                            <h2 className="sc_item_title sc_title_title sc_item_title_style_decoration"><span
                                                                className="sc_item_title_text">Valider votre compte</span>
                                                            </h2>
                                                            <div className="mt-3">
                                                                <p>Validez votre compte pré-créé par l'administrateur pour accéder au tableau de bord.</p>
                                                                <div className="scheme_default text-center">
                                                                    <form onSubmit={handleSubmit} className="">
                                                                        <div className="col-12 col-md-6 mx-auto">
                                                                            <>
                                                                                <h6 className="mt-2 text-start mb-0">
                                                                                    <span className="vighor-title">Votre nom</span>
                                                                                </h6>
                                                                                <div className="QuestionBody">
                                                                                    <div className="ChoiceStructure">
                                                                                        <div className="dk-speakout-full">
                                                                                            <input autoComplete="name" required={true} name="name"
                                                                                                   id="name" type="text"
                                                                                                   onChange={(e: any) => setName(e.target.value)}
                                                                                                   placeholder="e.g. Michelot Jean-Claude" className="fill_inited"/>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </>
                                                                            <>
                                                                                <h6 className="mt-4 text-start mb-0">
                                                                                    <span className="vighor-title">Mot de passe</span>
                                                                                </h6>
                                                                                <div className="QuestionBody">
                                                                                    <div className="ChoiceStructure">
                                                                                        <div className="dk-speakout-full">
                                                                                            <input autoComplete="password" required={true} name="password"
                                                                                                   id="password" type="password"
                                                                                                   onChange={(e: any) => setPassword(e.target.value)}
                                                                                                   placeholder="Votre mot de passe" className="fill_inited"/>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </>
                                                                            <div className="dk-speakout-submit-wrap mt-3">
                                                                                <button className="dk-speakout-submit sc_button_hover_slide_left Question-Next-Button">
                                                                                    <span className="">Validate account</span>
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </form>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
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

export default CreateProvider
