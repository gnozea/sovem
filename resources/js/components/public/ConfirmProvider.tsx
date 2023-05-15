import React, {FC, useState} from "react";
import styled from "styled-components";
import {AnimatePresence, motion} from "framer-motion";
import moment from "moment";


const BackButton = styled.button`
    outline: none;
    background: none;
    border: none;
    display: flex;
    font-size: 17px;
`
const Card = styled.div`
    position: relative;
    border: none;
    box-shadow: rgb(0 0 0 / 0%) 0 0 0 0, rgb(0 0 0 / 0%) 0 0 0 0, rgb(0 0 0 / 0%) 0 0 0 0, rgb(64 68 82 / 16%) 0 0 0 1px, rgb(0 0 0 / 0%) 0 0 0 0, rgb(0 0 0 / 0%) 0 0 0 0, rgb(0 0 0 / 0%) 0 0 0 0;
    transition: all .3s ease;
    .activeCard {
        border-radius: 8px;
        box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, #17629f 0px 0px 0px 3px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px !important;
    }
`

interface IProps {
    children?: React.ReactNode,
    details: any,
    onBack: any,
    onDone: any,
    currentPage: number,
    maxPage: number,
    canNext: any
}

let localeData: any =  {
        "Janvier": "Janvye", "Février": "Fevriye", "Mars": "Mas", "Avril": "Avril", "Mai": "Me", "Juin": "Jen", "Juillet": "Jiyè",
        "Aout": "Dawout", "Septembre": "Septanm", "Octobre": "Octòb", "Novembre": "Novanm", "Décembre": "Desanm"
    }
const ConfirmProvider:FC<IProps> = (props: IProps) => {
    const [choices, setChoices] = useState<any[]>([])
    let details = [...props.details]
    const handleChoiceSelect = (service: any) => {
        setChoices((prevState: any) => {
            const choice = [...prevState]
            choice[props.currentPage-1] = service
            if (choice[props.currentPage-1]) props.canNext(true)
            return choice
        })
    }
    // @ts-ignore
    return <AnimatePresence>
        <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }}>
            <BackButton onClick={() => props.onBack()}>
                <i className="mdi mdi-chevron-left"></i>
                <span>Retounen</span>
            </BackButton>
            <div className="">
                <div className="scheme_default d-flex justify-content-between">
                    <h6 className="mt-2">Chwazi yon founisè</h6>
                    <span>Chwa {props.currentPage} sou {props.maxPage}</span>
                </div>
                {details.map((detail: any, key: number) => {
                    // @ts-ignore
                    return <motion.div key={key} initial={{ x: 100, opacity: 0 }} className={`${key === 0 ? 'mt-2' : ''}`} animate={{ x: 0, opacity: 1 }} exit={{ x: -100, opacity: 0 }}>
                        <Card className="card mb-3" style={{cursor: 'pointer'}} onClick={() => handleChoiceSelect(detail)}>
                            <div className={`card-body pt-2 pb-1${choices[props.currentPage-1] && detail.provider_id === choices[props.currentPage-1].provider_id ? " activeCard" : ""}`}>
                                <div className="flex justify-content-between mb-1">
                                    <div className="d-inline-block">
                                        <p className='text-muted mb-0 text-dark'>{detail.provider.name}</p>
                                    </div>
                                    <span className="align-self-center" style={{padding: '0 5px'}}>{detail.provider.name_short}</span>
                                </div>
                                <div className="flex mt-1 justify-content-between">
                                    <p className='card-title mb-0 text-dark' style={{fontSize: '1rem'}}>Espesyalis: {detail.specialist.name}</p>
                                    <span className="text-danger mt-1 mb-1">Date: {`${moment(detail.date_slot).format("D MMMM YYYY")} ant ${detail.time_slot}`}</span>
                                </div>
                                <div>
                                    <p className="text-muted mb-0 d-flex justify-content-between mt-0" style={{borderTopWidth: "1px", borderTopStyle: "solid", borderTopColor: "rgb(238, 238, 238)"}}>
                                        <span className="pt-1" style={{verticalAlign: 'sub'}}>Adrès: {detail.provider.address_line_1}</span>
                                        <span className="pt-1" style={{verticalAlign: 'sub'}}>Telefòn: {detail.provider.phone}</span>
                                    </p>
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                })
                }
            </div>

            {props.maxPage === props.currentPage &&
                <div className="text-center mb-2">
                    <button disabled={!choices[props.currentPage-1]} type="button" onClick={() => props.onDone(choices)} className="give-btn give-btn-modal sc_button_hover_slide_left border-0">Mwen fini</button>
                </div>
            }
        </motion.div>
    </AnimatePresence>
}

export default ConfirmProvider
