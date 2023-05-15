import React, {FC} from "react";
import {AnimatePresence, motion} from "framer-motion";
import moment from "moment/moment";

interface IProps {
    children?: React.ReactNode,
    details: any,
    onWillConfirmProvider: any
}


const DisplayConfirmed: FC<IProps> = (props: IProps) => {
    //console.log(props.details);
    // @ts-ignore
    return <AnimatePresence>
            <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 20, opacity: 0 }} className="results-set">
                <div className="scheme_default">
                    <div className="posts_container">
                        {Object.values(props.details).map((result: any, key: number) => {
                            return <article key={key} className={`post_item ${key > 0 ? "mt-2" : "mt-3"}`}>
                                    <div className="pt-1 pb-0 ps-3 pe-3">
                                        <div className="post_header entry-header">
                                            <h6 className="m-0">
                                                <span>{result[0].provider.name}</span>
                                            </h6>
                                            <div className="widget widget_categories">
                                                <div className="post_meta scheme_default d-flex justify-content-between">
                                                    <ul className="mt-0 cat-item cat-item-41">
                                                        <li className="post_meta_item" style={{ fontSize: '16px', fontWeight: "normal" }}>
                                                            {result[0].specialist.name}
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        {result.length === 1 && result[0].decision === "accepted" && <div className="post_content entry-content">
                                            <div className="d-flex justify-content-between">
                                                <span className="text-primary font-weight-bold mt-1 mb-1">
                                                    Randevou le {`${moment(result[0].date_slot).format("D MMMM YYYY")} ant ${result[0].time_slot}`}
                                                </span>
                                                <span className="pt-1" style={{verticalAlign: 'sub'}}>Adrès: {result[0].provider.address_line_1}</span>
                                            </div>
                                            <div className="post_content_inner">{result[0].secure_message}</div>
                                        </div>}
                                    </div>
                                </article>
                            }
                        )}
                        <div className="divider-inner mt-3"></div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
}

export default DisplayConfirmed
