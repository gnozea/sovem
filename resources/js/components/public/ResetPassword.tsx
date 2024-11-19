import React, { FC, useEffect, useRef, useState } from "react";
import axios from "axios";
import moment from "moment/moment";
import Progress from "../utils/Progress";
import Popup from "../utils/Popup";
import { toast } from "react-toastify";
import MFAForm from "../admin/account/MFAForm";
import BrowserTitle from "../utils/BrowserTitle";

type IProps = {

}

const ResetPassword: FC<IProps> = (props: IProps) => {
    moment.locale('fr');
    const [details, setDetails] = useState<any>(),
        email = decodeURI(document.URL.replace(/.*email=([^&]*).*|(.*)/, '$1')),
        [busy, setBusy] = useState<boolean>(),
        [error, setError] = useState<any>(),
        [password, setPassword] = useState<string>(),
        [passwordConfirm, setPasswordConfirm] = useState<string>(""),
        url = window.location.pathname.split("/").filter((u: any) => {
            return u !== ""
        }),
        formRef = useRef<any>()
    useEffect(() => {
        axios.get(`/api/reset-password`, { params: { email: email } }).then((rep: any) => {
            if (rep.data.status === "success") {
                setDetails([]);
            } else {
                toast.success(rep.data.msg)
            }
        }).catch(err => {
            setDetails(null);
        })
    }, [])

    const handleSubmit = (e: any) => {
        e.preventDefault()
        const form = new FormData()
        form.append("email", email)
        form.append("password", password)
        form.append("password_confirmation", passwordConfirm)
        form.append("token", url[url.length - 1])
        setBusy(true)
        axios.post(`/api/reset-password`, form, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }).then((rep: any) => {
            if (rep.data.status === "success") {
                setTimeout(() => {
                    window.location.href = "/dashboard"
                    toast.success("Votre mot de passe a été modifié.")
                }, 3000)
                return
            }
            toast.error("Compte inexistant ou lien invalide.")
            setBusy(false)
        }).catch(error => {
            setError("Compte inexistant ou lien invalide.")
            setBusy(false)
        })
    }

    if (details === undefined) return <Popup onPopupClose={() => { }} fullWidth={true} parentId={12748838}>
        <BrowserTitle title={"Restaurer mot de passe"} />
        <Progress />
    </Popup>

    if (!details) return <Popup onPopupClose={() => { }} fullWidth={true} parentId={12748838}>
        <BrowserTitle title={"Compte non trouvé"} />
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
        {busy && <div style={{ position: "absolute", width: "100%", height: "100%", zIndex: "999" }}>
            <Progress style={"skype"} color={"#E89C42"} />
        </div>}
        <BrowserTitle title={"Restaurer mot de passe"} />
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
                                                    <div className="text-center" style={{ margin: "0 40px" }}>
                                                        <h2 style={{ marginTop: "1em" }} className="sc_item_title sc_title_title sc_item_title_style_decoration"><span
                                                            className="sc_item_title_text">Restaurer mot de passe</span>
                                                        </h2>
                                                        <div className="mt-3">
                                                            <div className="scheme_default text-center">
                                                                <form className="" onSubmit={handleSubmit} ref={formRef}>
                                                                    <div>
                                                                        <input autoComplete="username" defaultValue={details.email} type="hidden" />
                                                                        <h6 className="mt-4 text-start mb-0">
                                                                            <span className="vighor-title">Mot de passe</span>
                                                                        </h6>
                                                                        <div className="QuestionBody">
                                                                            <div className="ChoiceStructure">
                                                                                <div className="dk-speakout-full">
                                                                                    <input autoComplete="password" required={true} name="password"
                                                                                        id="password" type="password"
                                                                                        onChange={(e: any) => setPassword(e.target.value)}
                                                                                        placeholder="Votre mot de passe" className="fill_inited" />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="QuestionBody">
                                                                            <div className="ChoiceStructure">
                                                                                <div className="dk-speakout-full">
                                                                                    <input autoComplete="password" required={true}
                                                                                        id="password-confirm" type="password"
                                                                                        onChange={(e: any) => setPasswordConfirm(e.target.value)}
                                                                                        placeholder="Confirmer votre mot de passe" className="fill_inited" />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        {((password !== passwordConfirm) && passwordConfirm.length > 0) &&
                                                                            <p className="text-danger">Les deux mot de passe sont différent.</p>
                                                                        }
                                                                        {password === passwordConfirm && password?.length < 6 &&
                                                                            <p className="text-danger">Mot de passe doit être au moins 6 caractères.</p>
                                                                        }
                                                                        {error &&
                                                                            <p className="text-danger text-start">{error}</p>
                                                                        }
                                                                    </div>

                                                                    <div className="dk-speakout-submit-wrap mt-3">
                                                                        <button disabled={(password !== passwordConfirm || password?.length < 6)}
                                                                            className="dk-speakout-submit sc_button_hover_slide_left Question-Next-Button">
                                                                            <span className="">Restaurer mot de passe</span>
                                                                        </button>
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

export default ResetPassword
