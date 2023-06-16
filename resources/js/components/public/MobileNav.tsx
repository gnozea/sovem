import React, {FC} from "react"
import {Link, NavLink} from "react-router-dom";

interface IProps {
    children?: React.ReactNode,
    onCloseMenu: any,
    active: string,
    onClickUrl: any
    menuItems: {title: string, href: string, children?: {title: string, href: string}[]}[]
}
const MobileNav: FC<IProps> = (props: IProps) => {

    return <>
        <div className="menu_mobile_overlay"></div>
        <div className="menu_mobile menu_mobile_fullscreen scheme_dark opened">
        <div className="menu_mobile_inner">
            <a className="menu_mobile_close theme_button_close" onClick={props.onCloseMenu}><span className="theme_button_close_icon"></span></a>
            <a className="sc_layouts_logo" href="https://helpline.impacto-patronus.ancorathemes.com/">
                <img
                    src="https://vighor.com/templates/hugue-theme-main/img/logo-primary.png"
                    srcSet="https://vighor.com/templates/hugue-theme-main/img/logo-primary.png 2x"
                    alt="Logo" style={{width: "100px"}}/>
            </a>
            <nav className="menu_mobile_nav_area" itemType="https://schema.org/SiteNavigationElement">
                <ul id="menu_mobile" className="menu_mobile_nav prepared">
                    {props.menuItems.map((item: any, key: number) => {
                        return <li key={key}
                                   className={`menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-3786${props.active === item.href ? " current-menu-ancestor current-menu-parent" : " "}`}>
                            <Link to={item.href} onClick={() => props.onClickUrl(item.href)}>
                                <span>{item.title}</span>
                                {item.children && <span className="open_child_menu"></span>}
                            </Link>
                            {/*<ul className="sub-menu">*/}
                            {/*    <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-home page_item page-item-594 menu-item-3829 current-menu-item current_page_item">*/}
                            {/*        <a href="https://helpline.impacto-patronus.ancorathemes.com/" aria-current="page">*/}
                            {/*            <span>Helpline</span>*/}
                            {/*        </a>*/}
                            {/*    </li>*/}
                            {/*</ul>*/}
                        </li>
                        {/*<li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-3827">*/
                        }
                        {/*    <a href="https://helpline.impacto-patronus.ancorathemes.com/contacts/">*/
                        }
                        {/*        <span>Contacts</span>*/
                        }
                        {/*    </a>*/
                        }
                        {/*</li>*/
                        }
                    })}
                </ul>
            </nav>
            {/*<div className="search_wrap search_style_normal search_mobile inited">*/}
            {/*    <div className="search_form_wrap">*/}
            {/*        <form role="search" method="get" className="search_form" action="https://helpline.impacto-patronus.ancorathemes.com/">*/}
            {/*            <input type="hidden" onChange={() => {}} value="" name="post_types"/>*/}
            {/*            <input type="text" onChange={() => {}} className="search_field fill_inited" placeholder="Search" value="" name="s"/>*/}
            {/*            <button type="submit" className="search_submit trx_addons_icon-search"></button>*/}
            {/*        </form>*/}
            {/*    </div>*/}
            {/*</div>*/}
            <div className="socials_mobile">
                <a target="_blank" href="https://twitter.com/themes_ancora" className="social_item social_item_style_icons sc_icon_type_icons social_item_type_icons" rel="nofollow">
                    <span className="social_icon social_icon_twitter">
                        <span className="icon-twitter"></span>
                    </span>
                </a>
                <a target="_blank" href="https://www.facebook.com/AncoraThemes/" className="social_item social_item_style_icons sc_icon_type_icons social_item_type_icons" rel="nofollow">
                    <span className="social_icon social_icon_facebook">
                        <span className="icon-facebook"></span>
                    </span>
                </a>
                <a target="_blank" href="https://www.youtube.com/channel/UCdIjRh7-lPVHqTTKpaf8PLA" className="social_item social_item_style_icons sc_icon_type_icons social_item_type_icons" rel="nofollow">
                    <span className="social_icon social_icon_youtube-video">
                        <span className="icon-youtube-video"></span>
                    </span>
                </a>
            </div>

            <a href="/complain" style={{ marginTop: "20px" }}
               className="sc_button sc_button_default sc_button_size_normal sc_button_icon_left color_style_link2 sc_button_hover_slide_left sc_button_hover_style_link2"
               rel="nofollow">
                <span className="sc_button_text">
                    <span className="sc_button_title">Mande yon sèvis</span>
                </span>
            </a>
        </div>
    </div>
    </>
}
export default MobileNav
