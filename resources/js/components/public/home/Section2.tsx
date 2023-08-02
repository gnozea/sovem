import React, {createRef, FC, useEffect, useLayoutEffect, useRef, useState} from "react";
import {Link} from "react-router-dom"

interface IProps {
    windowSize: any
}

const Section2: FC<IProps> = (props) => {
    const [size, setSize] = useState(0),
        secRef = useRef<any>()
    useEffect(() => {
        const updateSize = () => setSize(secRef.current.offsetWidth)

        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, [])

    return <section
        className="vighor-section vighor-top-section vighor-element vighor-element-8fa36ae vighor-section-stretched vighor-section-boxed vighor-section-height-default vighor-section-height-default"
        data-id="8fa36ae"
        data-element_type="section"
        data-settings='{"stretch_section":"section-stretched","background_background":"classic"}'
        style={{ width: `${props.windowSize[0]}px` }}
    >
        <div className="vighor-container vighor-column-gap-extended" ref={secRef}>
            <div className="vighor-row">
                <div
                    className="vighor-column vighor-col-100 vighor-top-column vighor-element vighor-element-527d35c sc_inner_width_none sc_content_align_inherit sc_layouts_column_icons_position_left"
                    data-id="527d35c"
                    data-element_type="column"
                >
                    <div className="vighor-column-wrap vighor-element-populated">
                        <div className="vighor-widget-wrap">
                            <div
                                className="vighor-element vighor-element-6ad8efd sc_height_huge sc_fly_static vighor-widget vighor-widget-spacer"
                                data-id="6ad8efd"
                                data-element_type="widget"
                                data-widget_type="spacer.default"
                            >
                                <div className="vighor-widget-container">
                                    <div className="vighor-spacer">
                                        <div className="vighor-spacer-inner" />
                                    </div>
                                </div>
                            </div>
                            <section
                                className="vighor-section vighor-inner-section vighor-element vighor-element-1e41a58 vighor-section-boxed vighor-section-height-default vighor-section-height-default"
                                data-id="1e41a58"
                                data-element_type="section"
                            >
                                <div className="vighor-container vighor-column-gap-no">
                                    <div className="vighor-row">
                                        <div
                                            className="vighor-column vighor-col-100 vighor-inner-column vighor-element vighor-element-02557c1 sc_inner_width_none sc_content_align_inherit sc_layouts_column_icons_position_left"
                                            data-id="02557c1"
                                            data-element_type="column"
                                        >
                                            <div className="vighor-column-wrap vighor-element-populated">
                                                <div className="vighor-widget-wrap">
                                                    <div
                                                        className="vighor-element vighor-element-55663d0 scheme_default sc_fly_static vighor-widget vighor-widget-trx_sc_promo animated fadeIn"
                                                        data-id="55663d0"
                                                        data-element_type="widget"
                                                        data-settings='{"_animation":"fadeIn","_animation_mobile":"none","_animation_delay":100}'
                                                        data-widget_type="trx_sc_promo.default"
                                                    >
                                                        <div className="vighor-widget-container">
                                                            <div
                                                                id="trx_sc_promo_1388711592"
                                                                className="sc_promo color_style_dark scheme_default sc_promo_default sc_promo_size_normal sc_promo_image_position_right"
                                                            >
                                                                <div
                                                                    className="sc_promo_image"
                                                                    style={{
                                                                        backgroundImage:
                                                                            "url(/images/post-13-copyright.png)",
                                                                        width: "calc(40% - 30px/2)",
                                                                        right: 0
                                                                    }}
                                                                />
                                                                <div
                                                                    className="sc_promo_text"
                                                                    style={{
                                                                        width: "calc(100% - 30px/2 - 40%)",
                                                                        float: "left"
                                                                    }}
                                                                >
                                                                    <div className="sc_promo_text_inner trx_addons_inline_835092385">
                                                                        <h2 className="sc_item_title sc_promo_title sc_item_title_style_with_line sc_item_title_tag trx_addons_inline_1758223025">
                                                                            <span className="sc_item_title_text">
                                                                                Tout moun dwe viv an pè
                                                                            </span>
                                                                        </h2>
                                                                        <div
                                                                            id="sc_button_1731220190"
                                                                            className="sc_item_button sc_button_wrap sc_item_button sc_item_button_default sc_promo_button"
                                                                        >
                                                                            <Link
                                                                                to="/about-us/"
                                                                                className="sc_button sc_button_default sc_button_size_normal sc_button_icon_left sc_button_hover_slide_left sc_button_hover_style_dark"
                                                                            >
                                                                                <span className="sc_button_text">
                                                                                    <span className="sc_button_title">Kiyès nou ye</span>
                                                                                </span>
                                                                            </Link>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>{" "}
                                                        </div>
                                                    </div>
                                                    <div
                                                        className="vighor-element vighor-element-e3652b7 sc_fly_static vighor-widget vighor-widget-spacer"
                                                        data-id="e3652b7"
                                                        data-element_type="widget"
                                                        data-widget_type="spacer.default"
                                                    >
                                                        <div className="vighor-widget-container">
                                                            <div className="vighor-spacer">
                                                                <div className="vighor-spacer-inner" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className="vighor-element vighor-element-259e833 sc_fly_static vighor-widget vighor-widget-trx_sc_icons animated fadeIn"
                                                        data-id="259e833"
                                                        data-element_type="widget"
                                                        data-settings='{"_animation":"fadeIn","_animation_mobile":"none","_animation_delay":300}'
                                                        data-widget_type="trx_sc_icons.default"
                                                    >
                                                        <div className="vighor-widget-container">
                                                            <div
                                                                id="trx_sc_icons_816096055"
                                                                className="sc_icons sc_icons_extra sc_icons_size_medium sc_align_none"
                                                            >
                                                                <div className="sc_icons_columns_wrap sc_item_columns trx_addons_columns_wrap columns_padding_bottom columns_in_single_row">
                                                                    <div className="trx_addons_column-1_3">
                                                                        <div className="sc_icons_item sc_icons_item_linked">
                                                                            <div className="sc_icons_item_details">
                                                                                <h4 className="sc_icons_item_title">
                                                                                    <span>Ki objektif pòtay sa a</span>
                                                                                </h4>
                                                                                <div className="sc_icons_item_description">
                                                                                    <span>
                                                                                      Pòtay sa a reyalize nan objektif pou ede moun ki viktim vyolans yo antre an kontak byen fasil ak
                                                                                        òganizasyon oswa enstitisyon ki ka ede yo. Ou ka itilize sèvis sa a gratis.
                                                                                    </span>
                                                                                </div>
                                                                                <Link className="sc_icons_item_link" to={{
                                                                                    pathname: "/about-us",
                                                                                    hash: "#goal-123",
                                                                                }}>Plis detay</Link>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="trx_addons_column-1_3">
                                                                        <div className="sc_icons_item sc_icons_item_linked">
                                                                            <div className="sc_icons_item_details">
                                                                                <h4 className="sc_icons_item_title">
                                                                                    <span>Kijan pòtay la fonksyone?</span>
                                                                                </h4>
                                                                                <div className="sc_icons_item_description">
                                                                                    <span>Lè w konekte sou pòtay la, jis klike sou onglè MANDE YON SEVIS. Epi swiv tout etap pandan w ap reponn kesyon ki korespon n ak sitiyasyon w lan.
                                                                                    </span>
                                                                                </div>
                                                                                <Link to="/about-us" className="sc_icons_item_link">
                                                                                    Plis detay
                                                                                </Link>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="trx_addons_column-1_3">
                                                                        <div className="sc_icons_item sc_icons_item_linked">
                                                                            <div className="sc_icons_item_details">
                                                                                <h4 className="sc_icons_item_title">
                                                                                    <span>Apre demand lan fin soumèt</span>
                                                                                </h4>
                                                                                <div className="sc_icons_item_description">
                                                                                    <span>Aprè ou fin soumèt yon demann, òganizasyon oswa espesyalis ki ka ede w yo ap resevwa yon alèt nan yon sistèm otomatik ki entegre nan pòtay la. Ou ka suive evolisyon dosye w la byen fasil sou lyen sa a: suive dosye w.</span>
                                                                                </div>
                                                                                <Link
                                                                                    to="/about-us"
                                                                                    className="sc_icons_item_link"
                                                                                >
                                                                                    Plis detay
                                                                                </Link>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>{" "}
                                                        </div>
                                                    </div>
                                                    <div
                                                        className="vighor-element vighor-element-c55b0b8 sc_height_huge sc_fly_static vighor-widget vighor-widget-spacer"
                                                        data-id="c55b0b8"
                                                        data-element_type="widget"
                                                        data-widget_type="spacer.default"
                                                    >
                                                        <div className="vighor-widget-container">
                                                            <div className="vighor-spacer">
                                                                <div className="vighor-spacer-inner" />
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
                </div>
            </div>
        </div>
    </section>

}
export default Section2
