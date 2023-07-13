import React, {FC, useContext, useEffect, useReducer, useRef, useState} from "react"
import axios from "axios";
import ServiceFormContext from "../../context/ServiceFormContext";
import Progress from "../utils/Progress";
import styled from "styled-components";
import {Radio, Checkbox} from "../utils/form-components/FormField";
import Select2 from "../utils/form-components/Select2";
import Popup from "../utils/Popup";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {toast} from "react-toastify";
import { DatePicker } from 'antd';
import dayjs, {Dayjs} from "dayjs";

const Loader = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
    height: 100%;
    width: 100%;
    /*background: rgba(0, 0, 0, .1);*/
`
const PopupStyled = styled(Popup)`
    font-family: Poppins, Arial, sans-serif!important;
`
const AntDCustom = styled.div`
    .ant-picker{
        width: 100%;
        display: block;
        border: 3px solid #ddd;
        padding: 0.52em 1.1em;
        border-radius: 0;
        box-shadow: none!important;
        line-height: 2em;
        background: #e6e9f2;
        &:focus{
            background-color: transparent;
        }
    }
    input{
        color: #5d5d5d;
        border-color: #cbcbcc;
        font-size: 1.4em!important;
        font-weight: 400;
        font-style: normal;
        text-decoration: none;
        font-family: Poppins, Arial, sans-serif !important;
        letter-spacing: 1px;
        transition: color .3s ease,background-color .3s ease,border-color .3s ease;
        box-sizing: border-box;
        border-radius: 0;
        background-color: #e6e9f2;
    }
`

const rangePresets: {
    label: string;
    value: [Dayjs, Dayjs];
}[] = [
    { label: "Jodi a", value: [dayjs(), dayjs()] },
    { label: 'Gen 3 jou', value: [dayjs().add(3, 'd'), dayjs()] },
    { label: 'Gen 5 jour', value: [dayjs().add(5, 'd'), dayjs()] },
    { label: 'Gen 7 jour', value: [dayjs().add(7, 'd'), dayjs()] },
    { label: 'Gen 15 jour', value: [dayjs().add(15, 'd'), dayjs()] },
    { label: 'Gen 30 jour', value: [dayjs().add(30, 'd'), dayjs()] },
];

interface IProps {

}
const ComplainForm: FC<IProps> = (props) => {
    const [accepted, setAccepted] = useState<boolean>(false),
        [loading, setLoading] = useState<boolean>(false),
        [codeCopied, setCodeCopied] = useState<boolean>(false),
        [submit, setSubmit] = useState<boolean>(false),
        [copied, setCopied] = useState<boolean>(false),
        [submitted, setSubmitted] = useState<any>(),
        [alert, setAlert] = useState<string>(),
        { state, dispatch } = useContext(ServiceFormContext),
        [ step, setStep ] = useState<number>(0),
        ref = useRef<any>(),
        stepsLength = 8

    const handleAccept = (e: any) => {
        setLoading(true)
        axios.post("/api/start-form").then((rep: any) => {
            dispatch({ type: "SET_SERVICES", payload: rep.data.data })
            setAccepted(true)
            setLoading(false)
        })
    }

    const getSpecialities = (parent: any) => {
        if (!parent.querySelector("input:checked")) return setAlert("Tanpri, reponn kesyon sa a.")
        let service: any = [], selections: any = []
        ref.current.querySelectorAll("input:checked").forEach((elem: any) => {
            const index: number = Array.prototype.indexOf.call(ref.current.children, elem.parentNode)
            service = [...service, index]
            if (state.services[index]) selections = [...selections, state.services[index].id]
        })

        if (!service.length) return setLoading(false)

        dispatch({ type: "SET_SELECTED_SERVICE", payload:  selections})
        setLoading(true)
        axios.get(`/api/service/specialities`, {
            params: {
                selections: selections
            }
        }).then((rep: any) => {
            dispatch({ type: "SET_SPECIALITIES", payload: rep.data.data })
            setLoading(false)
            setStep((step: number) => {
                return step+1
            })
        })
    }
    const setViolenceType = (parent: any) => {
        if (!parent.querySelector("input:checked")) return setAlert("Tanpri, reponn kesyon sa a tou non.")
        let violenceType: any = [], selections: any = []
        ref.current.querySelectorAll("input:checked").forEach((elem: any) => {
            const index: number = Array.prototype.indexOf.call(ref.current.children, elem.parentNode)
            violenceType = [...violenceType, index]
            if (state.violenceTypes[index]) selections = [...selections, state.violenceTypes[index]]
        })

        if (!violenceType.length) return setLoading(false)

        dispatch({ type: "SET_VIOLENCE_TYPE", payload: selections})

        setStep((step: number) => {
            return step+1
        })
    }
    const setFelon = (parent: any) => {
        if (!ref.current.querySelector("input:checked")) return setAlert("Tanpri, reponn kesyon sa a tou non.")
        let felon: any = [], selections: any = []
        ref.current.querySelectorAll("input:checked").forEach((elem: any) => {
            const index: number = Array.prototype.indexOf.call(ref.current.children, elem.parentNode)
            felon = [...felon, index]
            if (state.felon[index]) selections = [...selections, state.felon[index]]
        })

        if (!felon.length) return setLoading(false)

        dispatch({ type: "SET_FELON", payload: selections})

        // setStep((step: number) => {
        //     return step+1
        // })
    }
    const setAge = (parent: any) => {

        if (!ref.current.querySelector("input:checked")) return setAlert("Tanpri, di nou nan ki gwoup laj ou ye.")
        let selections: any = null

        const index: number = Array.prototype.indexOf.call(ref.current.children, ref.current.querySelector("input:checked").parentNode)

        if (state.ageRange[index]) selections = state.ageRange[index]

        dispatch({type: "SET_AGE", payload: selections})

        setStep((step: number) => {
            return step+1
        })
    }
    const setGender = (parent: any) => {

        if (!ref.current.querySelector("input:checked")) return setAlert("Tanpri, reponn kesyon sa a.")
        let selections: any = null

        const index: number = Array.prototype.indexOf.call(ref.current.children, ref.current.querySelector("input:checked").parentNode)

        if (state.genders[index]) selections = state.genders[index]

        dispatch({type: "SET_GENDER", payload: selections})

        setStep((step: number) => {
            return step + 1
        })
    }

    const getCities = (parent: any) => {
        if (!parent.querySelector("input:checked")) return setAlert("Tanpri, reponn kesyon sa a tou.")

        let specialities: any = [], selections: any = []
        ref.current.querySelectorAll("input:checked").forEach((elem: any) => {
            const index: number = Array.prototype.indexOf.call(ref.current.children, elem.parentNode)
            specialities = [...specialities, index]
            if (state.specialities[index]) selections = [...selections, state.specialities[index].id]
        })
        if (!specialities.length) return setLoading(false)

        dispatch({ type: "SET_SELECTED_SPECIALITIES", payload: selections })
        setStep((step: number) => {
            return step+1
        })
    }

    const handleNext = (e: any) => {
        e.preventDefault()
        setAlert(undefined)

        const parent = e.currentTarget.parentNode.parentNode.parentNode
        if (step === 0) return setViolenceType(parent)
        if (step === 1) return setGender(parent)
        if (step === 2) return setAge(parent)
        if (step === 3) return getSpecialities(parent)
        if (step === 4) return getCities(parent)
        if (step === 5 && state.selections.city === null) return setAlert("Tanpri, di nou nan ki zòn ou rete.")
        if (step === 6) return setIncidentLocation()
        if (step === 7) return setIncidentDate()
        //if (step === 6) return setFelon(parent)
        // //To be uncommented if new step added
    }

    const setYourCity = (e: any) => {
        dispatch({ type: "SET_CITY", payload: e })
        setStep((step: number) => {
            return step+1
        })
    }

    const setIncidentLocation = () => {
        if (!state.selections.crimeCity) return setAlert("Tanpri, di nou nan ki zòn sa te rive w.")
        // if (!state.selections.incidentLocation) return setAlert("Tanpri, di nou nan ki zòn sa te rive w.")
        setStep((step: number) => {
            return step+1
        })
    }
    const setIncidentDate = () => {
        if (!state.selections.incidentDate) return setAlert("Tanpri, di nou ki dat sa te rive w.")
        setStep((step: number) => {
            return step+1
        })
    }

    const handleSubmit = (e: any) => {
        e.preventDefault()
        if (step === 8) setFelon(parent)
        if (!state.selections.ageRange) return
        setLoading(true)
        setSubmit(true)
        axios.post("/api/request", state.selections).then((rep: any) => {
            setSubmit(false)
            setSubmitted(rep.data.data)
        })
    }

    const handleCodeCopied = () => {
        toast.success("Ou kopye nimero dosye w la.", {
            position: "top-center",
            autoClose: false,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        })
        setCodeCopied(true)

        setTimeout(() => {
            setCodeCopied(false)
        }, 1300)
    }

    if (submitted) return <PopupStyled fullWidth={true} closable={false} onPopupClose={() => {}} parentId={1299}>
        <div className="position-relative service-form-request-wrap">
            <section className="vighor-section vighor-top-section vighor-element vighor-element-21b3bff vighor-section-boxed vighor-section-height-default vighor-section-height-default">
                <div className="vighor-container vighor-column-gap-extended">
                    <div className="vighor-row">
                        <div className="vighor-column vighor-col-100 vighor-top-column vighor-element vighor-element-51472d7 sc_inner_width_none sc_content_align_inherit sc_layouts_column_icons_position_left">
                            <div className="vighor-column-wrap vighor-element-populated">
                                <div className="vighor-widget-wrap">
                                    <div className="vighor-element vighor-element-ca6ee5d sc_height_huge sc_fly_static vighor-widget vighor-widget-spacer">
                                        <div className="vighor-widget-container">
                                            <div className="success-animation">
                                                <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                                                    <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
                                                    <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                                                </svg>
                                            </div>
                                            <div className="text-center">
                                                <h2 className="sc_item_title sc_title_title sc_item_title_style_decoration"><span
                                                    className="sc_item_title_text">Demand ou an ale!</span>
                                                </h2>
                                                <div className="mt-3">
                                                    <p style={{ maxWidth: "800px", margin: "0 auto" }}>Demand ou a ale. Tout pèstatè ki espesyalize nan sèvis ou mande a o kouran. Gen jiska 3 prestatè ki ka asepte
                                                        founi sèvis ou mande a men w ap gen pou w chwazi yon sèl nan yo. Toujou vizite sit la pou w ka jwenn dènye nouvèl
                                                        sou demand ou a. Itilize nimewo demand {submitted?.ticket_number} pou w ka swiv dosye w la.
                                                    </p>
                                                    <div className="scheme_default text-center">
                                                        <h6 className="mt-2">
                                                            <span className="vighor-title">Nimewo dosye ou a se:</span>
                                                        </h6>
                                                        <h6 className="mt-2" style={{ width: "410px", margin: "0 auto" }}>
                                                            <CopyToClipboard text={submitted?.ticket_number} onCopy={handleCodeCopied}>
                                                                <span style={{ fontSize: "2em" }} className="vighor-title pt-1 d-block">{submitted?.ticket_number}
                                                                    <button  style={{
                                                                        display: "flex",
                                                                        padding: "1px 6px",
                                                                        margin: "10px auto",
                                                                        borderRadius: "8px",
                                                                        fontSize: "18px",
                                                                        alignItems: "center",
                                                                        gap: "5px",
                                                                        background: "none",
                                                                        border: "none",
                                                                        color: codeCopied ? "#4BB04F" : "#07203C"
                                                                    }}>
                                                                        {!codeCopied && <span>Klike pou kopye nimewo a</span>}
                                                                        {codeCopied && <div style={{ fontSize: "1.5em", marginTop: "20px" }}>
                                                                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                                                                <path d="M19.965 8.521C19.988 8.347 20 8.173 20 8c0-2.379-2.143-4.288-4.521-3.965C14.786 2.802 13.466 2 12 2s-2.786.802-3.479 2.035C6.138 3.712 4 5.621 4 8c0 .173.012.347.035.521C2.802 9.215 2 10.535 2 12s.802 2.785 2.035 3.479A3.976 3.976 0 0 0 4 16c0 2.379 2.138 4.283 4.521 3.965C9.214 21.198 10.534 22 12 22s2.786-.802 3.479-2.035C17.857 20.283 20 18.379 20 16c0-.173-.012-.347-.035-.521C21.198 14.785 22 13.465 22 12s-.802-2.785-2.035-3.479zm-9.01 7.895-3.667-3.714 1.424-1.404 2.257 2.286 4.327-4.294 1.408 1.42-5.749 5.706z"></path>
                                                                            </svg>
                                                                        </div>}

                                                                    </button>
                                                                </span>
                                                            </CopyToClipboard>
                                                        </h6>
                                                        <div style={{ display: "flex", gap: "1em", justifyContent: "center" }}>
                                                            <a href="/" style={{ padding: "10px" }}
                                                               className="sc_button sc_button_default sc_button_size_normal sc_button_icon_left color_style_link2 sc_button_hover_slide_left sc_button_hover_style_link2"
                                                               rel="nofollow">
                                                                    <span className="sc_button_text">
                                                                        <span className="sc_button_title">Tounen nan akèy</span>
                                                                    </span>
                                                            </a>
                                                            <a href="/service/track" style={{ padding: "10px" }}
                                                               className="sc_button sc_button_default sc_button_size_normal sc_button_icon_left color_style_link2 sc_button_hover_slide_left sc_button_hover_style_link2 link-red-btn"
                                                               rel="nofollow">
                                                                    <span className="sc_button_text">
                                                                        <span className="sc_button_title">Swiv dosye w</span>
                                                                    </span>
                                                            </a>
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
    </PopupStyled>

    if (accepted && !state.services) return <Progress style="skype"/>

    return <div className="position-relative service-form-request-wrap mb-5">
        <section className="vighor-section vighor-top-section vighor-element vighor-element-21b3bff vighor-section-boxed vighor-section-height-default vighor-section-height-default">
            <div className="vighor-container vighor-column-gap-extended">
                  <div className="vighor-row">
                      <div className="vighor-column vighor-col-100 vighor-top-column vighor-element vighor-element-51472d7 sc_inner_width_none sc_content_align_inherit sc_layouts_column_icons_position_left">
                          <div className="vighor-column-wrap vighor-element-populated">
                              <div className="vighor-widget-wrap">
                                  <div className="vighor-element vighor-element-ca6ee5d sc_height_huge sc_fly_static vighor-widget vighor-widget-spacer">
                                      <div className="vighor-widget-container">
                                          <div className="vighor-spacer">
                                              <div className="vighor-spacer-inner"></div>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
            </div>
        </section>
        <section className="vighor-section vighor-top-section vighor-element vighor-element-3664c57 vighor-section-boxed vighor-section-height-default vighor-section-height-default">
            <div className="vighor-container vighor-column-gap-extended">
              <div className="vighor-row">
                  <div className="vighor-column vighor-col-100 vighor-top-column vighor-element vighor-element-6ad4c51 sc_inner_width_none sc_content_align_inherit sc_layouts_column_icons_position_left">
                      <div className="vighor-column-wrap vighor-element-populated">
                          <div className="vighor-widget-wrap">
                              {accepted && <>
                                  <div className="vighor-element vighor-element-90bc65e sc_fly_static vighor-widget vighor-widget-trx_sc_title animated fadeIn">
                                      <div className="vighor-widget-container">
                                          <div className="sc_title sc_title_decoration">
                                              <span className="sc_item_subtitle sc_title_subtitle sc_align_center sc_item_subtitle_above sc_item_title_style_decoration">
                                                  <span className="subtitle_text">Itilize fòmilè sa a pouw mande asistans</span>
                                              </span>
                                              <h1 className="sc_item_title sc_title_title sc_align_center sc_item_title_style_decoration sc_item_title_tag">
                                                  <span className="sc_item_title_text">Mande yon asistans</span>
                                              </h1>
                                          </div>
                                      </div>
                                  </div>
                                  <div className="vighor-element vighor-element-793dfa0 sc_height_small sc_fly_static vighor-widget vighor-widget-spacer">
                                      <div className="vighor-widget-container">
                                          <div className="vighor-spacer">
                                              <div className="vighor-spacer-inner"></div>
                                          </div>
                                      </div>
                                  </div>
                              </>}

                              {!accepted && <div className="scheme_default position-relative">
                                  {loading &&
                                      <Loader>
                                          <Progress color="#E89C42" style="skype"/>
                                      </Loader>
                                  }
                                  <div className="sc_testimonials_wide">
                                      <div className="sc_testimonials_content_wrap">
                                          <div className="sc_testimonials_item_content">
                                              <h4>Atansyon</h4>
                                              <p>
                                                  Nou se yon enstitisyon endepandan ki fè yon pon ant oumenm ak kèk fonisè swen sikolojik, fizik elatriye.
                                                  Nou pa responsab travay fonisè sa yo. Travay nou fini lamennm nou fin konekte w ak yon founisè. Ou gen dwa aksepte oswa refize sèvis yon founisè pou nenpòt rezon
                                                  tankou mank konfyans, kondisyon yo pa nan sans ou pou nou site sayo sèlman.
                                                  <span className="divider-inner d-block mt-3"/>
                                                  Sevis sa pa fèt pou moun ki gen ijans, si w gen yon ijans pou w wè yon pwofesyonèl medikal osinon yon lòt pwofesyonèl, ale nan sant sante oswa lopital ki pi prè w la. Si se pwoblèm sekirite ijan w genyen, ale lapolis.
                                              </p>
                                          </div>
                                          <div className="columns_wrap no_spaces text-center mt-5">
                                              <div className="column-1_1">
                                                  <div className="button_wrap">
                                                      <button className="sc_button sc_button_default sc_button_size_normal sc_button_icon_left sc_button_hover_slide_left"
                                                      onClick={handleAccept}>
                                                          <span className="sc_button_text">
                                                              <span className="sc_button_title">Mwen aksepte</span>
                                                          </span>
                                                      </button>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                              }
                              {accepted && <div className="vighor-element vighor-complaint vighor-element-d3432c0 sc_fly_static vighor-widget vighor-widget-shortcode">
                                  {loading &&
                                      <Loader>
                                          <Progress color="#E89C42" style="skype"/>
                                      </Loader>
                                  }
                                  <div className="vighor-widget-container sc_testimonials_content_wrap">
                                      <div className="dk-speakout-petition-wrap">
                                          <div className="Skin">
                                              {alert && <p className="text-danger">{alert}</p>}
                                              {/*Questions start here*/}
                                              {step === 0 && <> {/*Question 5*/}
                                                  <legend>
                                                      <div className="QuestionText BorderColor">Chwazi ki fòm vyolans ou sibi.</div>
                                                  </legend>

                                                  <div className="ChoiceStructure">
                                                      <div className="QuestionBody">
                                                          <ul className="ChoiceStructure" ref={ref}>
                                                              {state.violenceTypes.map((type: any, key: any) => {
                                                                  return <li className="Selection reg" key={key}>
                                                                      <Checkbox defaultChecked={state.selections.violenceType.includes(type)}
                                                                                setRef={ref} id={`QR~vType~${key}`} defaultValue={type}
                                                                                labelValue={ type } name={`QR~type~${key}`}
                                                                                onChange={(e: any) => {}}
                                                                      />
                                                                  </li>
                                                              })}
                                                          </ul>
                                                      </div>
                                                  </div>
                                              </>}
                                              {step === 1 && <>
                                                  <legend>
                                                      <div className="QuestionText BorderColor">Mwen se yon: </div>
                                                  </legend>
                                                  <div className="QuestionBody">
                                                      <ul className="ChoiceStructure" ref={ref}>
                                                          {state.genders.map((gender: any, key: any) => {
                                                              return <li className="Selection reg" key={key}>
                                                                  <Radio defaultChecked={state.selections.gender == gender} id={`QR~${gender}~${key}`} labelValue={ gender } name={`QR~1`}/>
                                                              </li>
                                                          })}
                                                      </ul>
                                                  </div>
                                              </>}
                                              {step === 2 && <> {/*Question 7*/}
                                                  <legend>
                                                      <div className="QuestionText BorderColor">Chwazi group laj ou.</div>
                                                  </legend>

                                                  <div className="ChoiceStructure">
                                                      <div className="QuestionBody">
                                                          <ul className="ChoiceStructure" ref={ref}>
                                                              {state.ageRange.map((range: any, key: any) => {
                                                                  console.log(state.selections.ageRange, range);
                                                                  return <li className="Selection reg" key={key}>
                                                                      <Radio defaultChecked={state.selections.ageRange === range}
                                                                             setRef={ref} id={`QR~Range~${key}`} defaultValue={range}
                                                                             labelValue={ range } name={`QR~Range`}
                                                                             onChange={(e: any) => {}}
                                                                      />
                                                                  </li>
                                                              })}
                                                          </ul>
                                                      </div>
                                                  </div>
                                              </>}
                                              {step === 3 && <> {/*Question 1*/}
                                                  <legend>
                                                      <div className="QuestionText BorderColor">Ki sèvis ou bezwen?</div>
                                                  </legend>
                                                  <div className="QuestionBody">
                                                      <ul className="ChoiceStructure" ref={ref}>
                                                          {state.services.map((service: any, key: any) => {
                                                              return <li className="Selection reg" key={key}>
                                                                  <Radio defaultChecked={state.selections.serviceId.includes(service.id) || state.services.length === 1} id={`QR~${service.id}~${key}`} labelValue={ service.name } name={`QR~1`}/>
                                                              </li>
                                                          })}
                                                      </ul>
                                                  </div>
                                              </>}
                                              {step === 4 && <> {/*Question 2*/}
                                                  <legend>
                                                      <div className="QuestionText BorderColor">Ki espesyalis ou bezwen?</div>
                                                  </legend>
                                                  <div className="QuestionBody">
                                                      <ul className="ChoiceStructure" ref={ref}>
                                                          {state.specialities.map((speciality: any, key: any) => {
                                                              return <li className="Selection reg" key={key}>
                                                                  <Checkbox defaultChecked={state.selections.specialistId.includes(speciality.id) || state.specialities.length === 1} setRef={ref} id={`QR~${speciality.id}~${key}`} defaultValue={speciality.id} labelValue={ speciality.name } name={`QR~${speciality.id}`}/>
                                                              </li>
                                                          })}
                                                      </ul>
                                                  </div>
                                              </>}
                                              {step === 5 && <> {/*Question 3*/}
                                                  <legend>
                                                      <div className="QuestionText BorderColor">Nan ki vil ou rete?</div>
                                                  </legend>

                                                      <div className="ChoiceStructure">
                                                          <Select2 classes="service-form" multiple={false} onSearch={(e: any) => {}} searchKeys={ { id: 'id', text: ['name'] } } searchUrl={`/api/city/search`}
                                                                   selectedValue={state.selections?.city?.id}
                                                                   onSelect={setYourCity}
                                                                   searchable={true} name="teacher_id" placeholder="Ekri non vil ou rete a la." id="city"/>
                                                      </div>
                                                      <div className="QuestionBody"></div>
                                              </>}
                                              {step === 6 && <> {/*Question 4*/}
                                                  <>
                                                      <legend>
                                                          <div className="QuestionText BorderColor">Nan ki vil sa te rive?</div>
                                                      </legend>

                                                      <div className="ChoiceStructure">
                                                          <Select2 classes="service-form" multiple={false} onSearch={(e: any) => {}} searchKeys={ { id: 'id', text: ['name'] } } searchUrl={`/api/city/search?all=true`}
                                                                   selectedValue={state.selections?.crimeCity?.id}
                                                                   onSelect={(e: any) => dispatch({ type: "SET_CRIME_CITY", payload: e })}
                                                                   searchable={true} name="teacher_id" placeholder="Ekri non vil sa te rive w a la." id="city"/>
                                                      </div>
                                                      <div className="QuestionBody"></div>
                                                  </>
                                                  {/*{state.selections?.crimeCity?.id && <>*/}
                                                  {/*    <legend>*/}
                                                  {/*        <div className="QuestionText BorderColor pb-0 pt-4">Nan ki zòn oswa lokalite sa te rive?</div>*/}
                                                  {/*    </legend>*/}
                                                  {/*    <div className="QuestionBody">*/}
                                                  {/*        <div className="ChoiceStructure">*/}
                                                  {/*            <div className="dk-speakout-full">*/}
                                                  {/*                <input autoComplete="pff" name="incident_location"*/}
                                                  {/*                       id="where-this-happen" type="text"*/}
                                                  {/*                       onChange={(e: any) => dispatch({ type: "SET_INCIDENT_LOCATION", payload: e.target.value })}*/}
                                                  {/*                       defaultValue={state.selections.incidentLocation}*/}
                                                  {/*                       placeholder="Ekri non zòn sa te rive w la" className="fill_inited"/>*/}
                                                  {/*            </div>*/}
                                                  {/*        </div>*/}
                                                  {/*    </div>*/}
                                                  {/*</>}*/}
                                              </>}

                                              {step === 7 && <> {/*Question 5*/}
                                                  <legend>
                                                      <div className="QuestionText BorderColor">Ki dat sa te rive w?</div>
                                                  </legend>

                                                  <div className="ChoiceStructure">
                                                      <div className="QuestionBody">
                                                          <div className="ChoiceStructure">
                                                              <AntDCustom className="dk-speakout-full">
                                                                  <DatePicker defaultValue={dayjs()} disabledDate={function disabledDate(current) {
                                                                      // Can not select days before today and today
                                                                      return current && current.valueOf() >= Date.now();
                                                                  }} format={"DD/MM/YYYY"} style={{ width: "100%", display: "block" }} showToday={false}
                                                                              //(e: any) => dispatch({ type: "SET_INCIDENT_LOCATION", payload: e.target.value })
                                                                              onChange={(date: Dayjs) => dispatch({ type: "SET_INCIDENT_DATE", payload: date.format("YYYY-MM-DD")})}
                                                                              // presets={rangePresets}
                                                                              popupClassName="office-hours" placeholder="Chwazi yon date." />
                                                              </AntDCustom>
                                                          </div>
                                                      </div>
                                                  </div>
                                              </>}
                                              {step === 8 && <> {/*Question 6*/}
                                                  <legend>
                                                      <div className="QuestionText BorderColor">Si posib, ou ka di kiyès ki fè vyolans lan?</div>
                                                  </legend>

                                                  <div className="ChoiceStructure">
                                                      <div className="QuestionBody">
                                                          <ul className="ChoiceStructure" ref={ref}>
                                                              {state.felon.map((type: any, key: any) => {
                                                                  return <li className="Selection reg" key={key}>
                                                                      <Radio defaultChecked={state.selections.felon.includes(type)}
                                                                                setRef={ref} id={`QR~vType~${key}`} defaultValue={type}
                                                                                labelValue={ type } name={`QR~felon`}
                                                                                onChange={(e: any) => {}}
                                                                      />
                                                                  </li>
                                                              })}
                                                          </ul>
                                                      </div>
                                                  </div>
                                              </>}
                                              {/*Questions end here*/}
                                              <div className={`d-flex${step === 0 ? " justify-content-end" : " justify-content-between"}`}>
                                                  {step > 0  && <div className="dk-speakout-submit-wrap text-end">
                                                      <button onClick={() => setStep((step: any) => step-1)} className="dk-speakout-submit sc_button_hover_slide_left Question-Next-Button">
                                                          <span className="">←</span>
                                                      </button>
                                                  </div>}
                                                  {step < stepsLength && <div className="dk-speakout-submit-wrap text-end">
                                                      <button onClick={handleNext} className="dk-speakout-submit sc_button_hover_slide_left Question-Next-Button">
                                                          <span className="">→</span>
                                                      </button>
                                                  </div>}
                                                  {step === stepsLength && <div className="dk-speakout-submit-wrap text-end">
                                                      <button disabled={submit} onClick={handleSubmit} className="dk-speakout-submit sc_button_hover_slide_left Question-Next-Button">
                                                          <span className="">Mande sèvis la</span>
                                                      </button>
                                                  </div>}
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              </div>}

                              <div className="vighor-element vighor-element-ca6ee5d sc_height_huge sc_fly_static vighor-widget vighor-widget-spacer">
                                  <div className="vighor-widget-container">
                                      <div className="vighor-spacer">
                                          <div className="vighor-spacer-inner"></div>
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
}
export default ComplainForm
