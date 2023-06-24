import React, {FC, useEffect, useRef, useState} from "react";
import axios from "axios";
import moment from "moment/moment";
import Progress from "../utils/Progress";
import Popup from "../utils/Popup";
import {toast} from "react-toastify";
import MFAForm from "../admin/account/MFAForm";

type IProps = {

}

const CreateProvider: FC<IProps> = (props: IProps) => {
    moment.locale('fr');
    const [details, setDetails] = useState<any>(),
        [name, setName] = useState<string>(),
        [authenticatorCode, setAuthenticatorCode] = useState<{ code: string, valid: boolean }>({code: "", valid: false}),
        [busy, setBusy] = useState<boolean>(),
        [goToMFA, setGoToMFA] = useState<boolean>(false),
        [password, setPassword] = useState<string>(),
        [passwordConfirm, setPasswordConfirm] = useState<string>(""),
        url = window.location.pathname.split("/").filter((u: any) => {
            return u !== ""
        }),
        formRef = useRef<any>()
    useEffect(() => {
        axios.get(`/api/provider/init/${url[url.length-1]}`).then((rep: any) => {
            if(rep.data.status === "success") {
                setDetails(rep.data.data);
            }else {
                toast.success(rep.data.msg)
            }
        })
    }, [])

    const handleComplete = () => {
        handleSubmit(formRef.current)
    }

    const handleSubmit = (e: any) => {
        if (!goToMFA) return setGoToMFA(true)
        const form = new FormData()
        form.append("provider", details.provider_id)
        form.append("name", name)
        form.append("password", password)
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
                                                    <div className="col-md-10 mx-auto">
                                                        {!goToMFA && <>
                                                            {!details?.provider.logo && <div style={{width: "250px", margin: "10px auto"}}>
                                                            <img src="/images/my-account-animate.svg" alt=""/>
                                                            </div>}
                                                            {details?.provider.logo && <div style={{width: "250px", margin: "10px auto"}}>
                                                                <img src={`/${details.provider.logo}`} alt=""/>
                                                            </div>}
                                                        </>}
                                                        <div className="text-center" style={{ margin: "0 40px" }}>
                                                            <h2 style={{ marginTop: goToMFA ? "1em" : "0" }} className="sc_item_title sc_title_title sc_item_title_style_decoration"><span
                                                                className="sc_item_title_text">Valider votre compte</span>
                                                            </h2>
                                                            {goToMFA && <>
                                                                <h3 className="sc_item_title sc_title_title sc_item_title_style_decoration" style={{ marginTop: ".5em" }}>
                                                                    <span className="sc_item_title_text" style={{ fontSize: "1.5rem" }}>Configurer l'authentification à 2 facteurs</span>
                                                                </h3>
                                                            </>}
                                                            <div className="mt-3">
                                                                {!goToMFA && <div className="col-md-7 col-12 mx-auto">
                                                                    <p className="">Validez votre compte pré-créé par l'administrateur pour accéder au tableau de bord.</p>
                                                                </div>}
                                                                <div className="scheme_default text-center">
                                                                    <form className="" ref={formRef}>
                                                                        {goToMFA && <MFAForm user_email={details['email']} value={details['qrCode']} _2faCode={(details: any) => setAuthenticatorCode(details)} onVerify={handleComplete}/>}
                                                                        {!goToMFA && <div className="col-12 col-md-6 mx-auto">
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
                                                                                <input autoComplete="username" defaultValue={details.email} type="hidden"  />
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
                                                                                <div className="QuestionBody">
                                                                                    <div className="ChoiceStructure">
                                                                                        <div className="dk-speakout-full">
                                                                                            <input autoComplete="password" required={true}
                                                                                                   id="password-confirm" type="password"
                                                                                                   onChange={(e: any) => setPasswordConfirm(e.target.value)}
                                                                                                   placeholder="Confirmer votre mot de passe" className="fill_inited"/>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                {((password !== passwordConfirm) && passwordConfirm.length > 0) &&
                                                                                    <p className="text-danger">Les deux mot de passe sont différent.</p>
                                                                                }
                                                                                {password === passwordConfirm && password?.length < 6 &&
                                                                                    <p className="text-danger">Mot de passe doit être au moins 6 caractères.</p>
                                                                                }
                                                                            </>
                                                                        </div>}

                                                                        <div className="dk-speakout-submit-wrap mt-3">
                                                                            {!goToMFA && <button type="button" disabled={(password !== passwordConfirm || password?.length < 6) || authenticatorCode.valid}
                                                                                                 className="dk-speakout-submit sc_button_hover_slide_left Question-Next-Button" onClick={() => setGoToMFA(true)}>
                                                                                <span className="">Etape suivante</span>
                                                                            </button>}
                                                                            {goToMFA && <button type="button" className="dk-speakout-submit sc_button_hover_slide_left Question-Next-Button"
                                                                                                onClick={() => setGoToMFA(false)}
                                                                            style={{ background: "linear-gradient(to right,#525252 50%,#979797 50%) no-repeat scroll right bottom/210% 100% #6d6d6d" }}>
                                                                                <span className="">Etape précédente</span>
                                                                            </button>}
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
