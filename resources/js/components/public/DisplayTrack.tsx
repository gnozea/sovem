import React, {FC} from "react";
import {AnimatePresence, motion} from "framer-motion";
import moment from "moment/moment";

interface IProps {
    children?: React.ReactNode,
    details: any,
    onWillConfirmProvider: any
}


const DisplayTrack: FC<IProps> = (props: IProps) => {
    // @ts-ignore
    return <AnimatePresence>
            <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 20, opacity: 0 }} className="results-set">
                <div className="scheme_default">
                    <div className="posts_container">
                        {Object.values(props.details.services).map((result: any, key: number) => {
                                let providers: any = {}
                                result.map((prov: any, key: any) => providers[prov.provider.id] = prov.provider.name_short)

                            return <article key={key} className={`post_item ${key > 0 ? "mt-2" : "mt-3"}`}>
                                    <div className="pt-1 pb-0 ps-3 pe-3">
                                        <div className="post_header entry-header">
                                            <h6 className="m-0">
                                                <span>{`Gen ${result.length === 1 ? "yon" : result.length } founisè ki aksepte dosye w la.`}</span>
                                            </h6>
                                            <div className="widget widget_categories">
                                                <div className="post_meta scheme_default d-flex justify-content-between">
                                                    <ul className="mt-0 cat-item cat-item-41">
                                                        <li className="post_meta_item" style={{ fontSize: '16px', fontWeight: "normal" }}>
                                                            {result[0].specialist.name}
                                                        </li>
                                                    </ul>
                                                    <span>{Object.values(providers).join(", ").replace(/, ([^,]*)$/, ' ak $1')}</span>
                                                </div>
                                            </div>
                                        </div>
                                        {result.length === 1 && result[0].decision === "accepted" && <div className="post_content entry-content">
                                            <div className="d-flex justify-content-between">
                                                <span className="text-danger mt-1 mb-1">
                                                    Randevou le {`${moment(result[0].date_slot).format("D MMMM YYYY")} ant ${result[0].time_slot}`}
                                                </span>
                                                <span className="pt-1" style={{verticalAlign: 'sub'}}>Adrès: {result[0].provider.address_line_1}</span>
                                            </div>
                                            <div className="post_content_inner">{result[0].secure_message}</div>
                                        </div>}
                                    </div>
                                    {props.details.services.length-1 !== key && props.details.services.length > 1 && <hr className="m-0 mt-2"/>}
                                </article>
                            }
                        )}
                        <div className="divider-inner mt-3"></div>
                        <div className="text-center mb-2">
                            <button type="button" onClick={() => typeof props.onWillConfirmProvider === "function" ? props.onWillConfirmProvider(true) : undefined} className="give-btn give-btn-modal sc_button_hover_slide_left border-0">Klike pou konfime</button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
}

export default DisplayTrack
