import React, {FC} from "react";
import {Link} from "react-router-dom";

interface IProps {

}


export const Banner: FC<IProps> = (props: IProps) => {
    return <section style={{ backgroundImage: "url(https://human-rights.impacto-patronus.ancorathemes.com/wp-content/uploads/2020/06/post-5-copyright.jpg)", backgroundPosition: "center center", backgroundSize: "cover", padding: "10em 0" }}
        className="vighor-section vighor-top-section vighor-element vighor-element-7e9f4a2 scheme_dark vighor-section-boxed vighor-section-height-default vighor-section-height-default"
        data-id="7e9f4a2" data-element_type="section"
        data-settings="{&quot;background_background&quot;:&quot;classic&quot;}">
        <div className="vighor-container vighor-column-gap-extended">
            <div className="vighor-row">
                <div
                    className="vighor-column vighor-col-100 vighor-top-column vighor-element vighor-element-fa09812 sc_inner_width_none sc_content_align_inherit sc_layouts_column_icons_position_left"
                    data-id="fa09812" data-element_type="column">
                    <div className="vighor-column-wrap vighor-element-populated">
                        <div className="vighor-widget-wrap">
                            <div
                                className="sc_layouts_item vighor-element vighor-element-e927b51 sc_fly_static vighor-widget vighor-widget-trx_sc_layouts_title"
                                data-id="e927b51" data-element_type="widget"
                                data-widget_type="trx_sc_layouts_title.default">
                                <div className="vighor-widget-container">
                                    <div id="trx_sc_layouts_title_52260867"
                                         className="sc_layouts_title sc_align_center with_content without_image without_tint">
                                        <div className="sc_layouts_title_content">
                                            <div className="sc_layouts_title_title">
                                                <h1 className="sc_layouts_title_caption">Kiyès nou ye</h1>
                                            </div>
                                            <div className="sc_layouts_title_breadcrumbs">
                                                <div className="breadcrumbs">
                                                    <Link className="breadcrumbs_item home" to="/">Akèy</Link>
                                                    <span className="breadcrumbs_delimiter"></span>
                                                    <span className="breadcrumbs_item current">Kiyès nou ye</span></div>
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
}
