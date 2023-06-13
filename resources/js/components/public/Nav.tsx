import React, {FC, useEffect, useState} from "react";
import {Link, NavLink} from "react-router-dom";
import MobileNav from "./MobileNav";
import styled from "styled-components";

interface IProps {
    menuItems: { title: string, href: string, children?: {title: string, href: string}[] }[]
}
const Nav: FC<IProps> = (props: IProps) => {
    const [position, setPosition] = useState<number>(0),
        [showTrack, setShowTrack] = useState<boolean>(false),
        [mobileNavOpen, setMobileNavOpen] = useState<boolean>(false)
    useEffect(() => {
        const updatePosition = () => setPosition(window.pageYOffset);
        window.addEventListener("scroll", updatePosition);
        updatePosition();
        return () => window.removeEventListener("scroll", updatePosition);
    }, [])


    return <>
        {mobileNavOpen && <MobileNav menuItems={props.menuItems} onCloseMenu={() => setMobileNavOpen(false)}/>}
        <header className="top_panel top_panel_custom top_panel_custom_2768 top_panel_custom_helpline-header without_bg_image">
            <div data-vighor-type="cpt_layouts" className="vighor vighor-2768">
                <div className="vighor-inner">
                    <div className="vighor-section-wrap">
                        <section className={`vighor-section vighor-top-section vighor-element vighor-element-1683f54f vighor-section-full_width vighor-section-content-middle sc_layouts_row sc_layouts_row_type_compact sc_layouts_row_fixed sc_layouts_row_fixed_always sc_layouts_hide_on_mobile vighor-section-height-default vighor-section-height-default${position > 40 ? " sc_layouts_row_fixed_on" : ""}`} data-id="1683f54f" data-element_type="section">
                            <div className="vighor-container vighor-column-gap-no">
                                <div className="vighor-row">
                                    <div
                                        className="vighor-column vighor-col-33 vighor-top-column vighor-element vighor-element-2b3fbd40 sc_inner_width_none sc_content_align_inherit sc_layouts_column_icons_position_left"
                                        data-id="2b3fbd40" data-element_type="column">
                                        <div className="vighor-column-wrap vighor-element-populated">
                                            <div className="vighor-widget-wrap">
                                                <div
                                                    className="sc_layouts_item vighor-element vighor-element-71f766da sc_fly_static vighor-widget vighor-widget-trx_sc_layouts_logo"
                                                    data-id="71f766da" data-element_type="widget"
                                                    data-widget_type="trx_sc_layouts_logo.default">
                                                    <div className="vighor-widget-container">
                                                        <a href="/" id="trx_sc_layouts_logo_1139677019"
                                                           className="sc_layouts_logo sc_layouts_logo_default trx_addons_inline_1362397269"><img
                                                            className="logo_image"
                                                            src="/images/PHOTO-2023-04-30-00-07-25.jpg"
                                                            srcSet="/images/PHOTO-2023-04-30-00-07-25.jpg 2x"
                                                            alt="Logo" width="212" height="80"/>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="vighor-column vighor-col-66 vighor-top-column vighor-element vighor-element-1faf574c sc_layouts_column_align_right sc_layouts_column sc_inner_width_none sc_content_align_inherit sc_layouts_column_icons_position_left"
                                        data-id="1faf574c" data-element_type="column">
                                        <div className="vighor-column-wrap vighor-element-populated">
                                            <div className="vighor-widget-wrap">
                                                <div
                                                    className="sc_layouts_item vighor-element vighor-element-1815bea6 sc_fly_static vighor-widget vighor-widget-trx_sc_layouts_menu"
                                                    data-id="1815bea6" data-element_type="widget"
                                                    data-widget_type="trx_sc_layouts_menu.default">
                                                    <div className="vighor-widget-container">
                                                        <nav
                                                            className="sc_layouts_menu sc_layouts_menu_default sc_layouts_menu_dir_horizontal menu_hover_fade inited"
                                                            id="trx_sc_layouts_menu_747240181"
                                                            data-animation-in="fadeInUpSmall"
                                                            data-animation-out="slideOutDown">
                                                            <ul id="menu_main"
                                                                className="sc_layouts_menu_nav menu_main_nav inited sf-js-enabled sf-arrows"
                                                                style={{ touchAction: "pan-y" }}>
                                                                {props.menuItems.map((item: any, key: number) =>
                                                                    <li key={key} className="menu-item menu-item-type-custom menu-item-object-custom current-menu-ancestor current-menu-parent menu-item-has-children menu-item-3786">
                                                                        <NavLink to={item.href} className={(isActive) => {
                                                                            return isActive ? "sf-with-ul-" : ""
                                                                        }}>
                                                                            <span>{item.title}</span>
                                                                        </NavLink>
                                                                    </li>
                                                                )}

                                                                {/*<li id="menu-item-3827"*/}
                                                                {/*    className="menu-item menu-item-type-post_type menu-item-object-page menu-item-3827"*/}
                                                                {/*    data-width="105.758">*/}
                                                                {/*    <Link to="/service/track" rel="nofollow">*/}
                                                                {/*        <span>Swiv dosyew</span>*/}
                                                                {/*    </Link>*/}
                                                                {/*</li>*/}
                                                                {/*<li id="menu-item-3827"*/}
                                                                {/*    className="menu-item menu-item-type-post_type menu-item-object-page menu-item-3827"*/}
                                                                {/*    data-width="105.758">*/}
                                                                {/*    <Link to="" target="_blank" rel="nofollow">*/}
                                                                {/*        <span>Kiyès nou ye</span>*/}
                                                                {/*    </Link>*/}
                                                                {/*</li>*/}
                                                            </ul>
                                                        </nav>
                                                    </div>
                                                </div>
                                                <div className="sc_layouts_item vighor-element vighor-element-4978fe66 sc_fly_static vighor-widget vighor-widget-trx_sc_button"
                                                    data-id="4978fe66" data-element_type="widget" data-widget_type="trx_sc_button.default">
                                                    <div className="vighor-widget-container">
                                                        <div id="trx_sc_button_662041494" className="sc_item_button sc_button_wrap">
                                                            <a href="/complain"
                                                            className="sc_button sc_button_default sc_button_size_normal sc_button_icon_left color_style_link2 sc_button_hover_slide_left sc_button_hover_style_link2"
                                                            rel="nofollow">
                                                                <span className="sc_button_text">
                                                                    <span className="sc_button_title">Mande yon sèvis</span>
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
                        </section>
                        <div className="sc_layouts_row_fixed_placeholder" style={{ backgroundColor: "rgba(0, 0, 0, 0)", height: "0px" }}></div>
                        <section className="vighor-section vighor-top-section vighor-element vighor-element-5e85655 vighor-section-full_width vighor-section-content-middle sc_layouts_row sc_layouts_row_type_compact sc_layouts_row_fixed sc_layouts_row_fixed_always sc_layouts_hide_on_wide sc_layouts_hide_on_desktop sc_layouts_hide_on_notebook sc_layouts_hide_on_tablet vighor-section-height-default vighor-section-height-default"
                            data-id="5e85655" data-element_type="section" style={{ paddingRight: ".2em" }}>
                            <div className="vighor-container vighor-column-gap-no">
                                <div className="vighor-row">
                                    <div
                                        className="vighor-column vighor-col-50 vighor-top-column vighor-element vighor-element-45287991 sc_inner_width_none sc_content_align_inherit sc_layouts_column_icons_position_left"
                                        data-id="45287991" data-element_type="column">
                                        <div className="vighor-column-wrap vighor-element-populated">
                                            <div className="vighor-widget-wrap">
                                                <div
                                                    className="sc_layouts_item vighor-element vighor-element-43ab5f0a sc_fly_static vighor-widget vighor-widget-trx_sc_layouts_logo"
                                                    data-id="43ab5f0a" data-element_type="widget"
                                                    data-widget_type="trx_sc_layouts_logo.default">
                                                    <div className="vighor-widget-container">
                                                        <a href="index.html#" id="trx_sc_layouts_logo_484185902"
                                                           className="sc_layouts_logo sc_layouts_logo_default trx_addons_inline_1112168072">
                                                            <img
                                                            className="logo_image"
                                                            src="https://vighor.com/templates/hugue-theme-main/img/logo-primary.png"
                                                            srcSet="https://vighor.com/templates/hugue-theme-main/img/logo-primary.png 2x"
                                                            alt="Impacto Patronus" style={{width: "100px"}}/>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="vighor-column vighor-col-50 vighor-top-column vighor-element vighor-element-16373ea5 sc_layouts_column_align_right sc_layouts_column sc_inner_width_none sc_content_align_inherit sc_layouts_column_icons_position_left"
                                        data-id="16373ea5" data-element_type="column">
                                        <div className="vighor-column-wrap vighor-element-populated">
                                            <div className="vighor-widget-wrap">
                                                <div
                                                    className="sc_layouts_item vighor-element vighor-element-32fe7257 sc_fly_static vighor-widget vighor-widget-trx_sc_layouts_menu"
                                                    data-id="32fe7257" data-element_type="widget"
                                                    data-widget_type="trx_sc_layouts_menu.default">
                                                    <div className="vighor-widget-container">
                                                        <Flex id="trx_sc_layouts_menu_158583175"
                                                             className="sc_layouts_iconed_text sc_layouts_menu_mobile_button_burger sc_layouts_menu_mobile_button without_menu">
                                                            <a onClick={() => setMobileNavOpen(true)} className="sc_layouts_item_link sc_layouts_iconed_text_link" style={{ cursor: "pointer" }}>
                                                                <span className="sc_layouts_item_icon sc_layouts_iconed_text_icon trx_addons_icon-menu"></span>
                                                            </a>
                                                            <a href="/complain" style={{ padding: "10px" }}
                                                               className="sc_button sc_button_default sc_button_size_normal sc_button_icon_left color_style_link2 sc_button_hover_slide_left sc_button_hover_style_link2"
                                                               rel="nofollow">
                                                                <span className="sc_button_text">
                                                                    <span className="sc_button_title">Mande yon sèvis</span>
                                                                </span>
                                                            </a>
                                                        </Flex>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <div className="sc_layouts_row_fixed_placeholder" style={{ backgroundColor: "rgba(0, 0, 0, 0)", height: "0px" }}></div>
                    </div>
                </div>
            </div>
        </header>
    </>
}
export default Nav

const Flex = styled.div`
    display: flex!important;
    align-items: center;
    gap: 1em
`
