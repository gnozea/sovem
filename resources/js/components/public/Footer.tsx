import React, {FC} from "react"
import styled from "styled-components";
import {Link} from "react-router-dom";


interface IProps {

}

const Footer: FC<IProps> = (props: IProps) => {
  return <>
        <div style={{ width: "100%", height: "80px" }}/>
        <FooterStyled className="footer_wrap footer_custom footer_custom_626 footer_custom_main-footer scheme_dark">
          <div className="vighor vighor-626">
              <div className="vighor-inner">
                  <div className="vighor-section-wrap">
                      <section className="vighor-section vighor-top-section vighor-element vighor-element-8c173b5 vighor-section-full_width vighor-section-content-middle sc_layouts_row sc_layouts_row_type_compact vighor-section-height-default vighor-section-height-default">
                          <div className="vighor-container vighor-column-gap-no">
                              <div className="vighor-row">
                                  <div
                                      className="vighor-column vighor-col-33 vighor-top-column vighor-element vighor-element-e74a8cd sc-mobile_content_align_center sc_layouts_column_align_left sc_layouts_column sc_inner_width_none sc_content_align_inherit sc_layouts_column_icons_position_left">
                                      <div className="vighor-column-wrap vighor-element-populated">
                                          <div className="vighor-widget-wrap">
                                              <div
                                                  className="sc_layouts_item vighor-element vighor-element-46f24b5 sc_fly_static vighor-widget vighor-widget-trx_sc_layouts_logo">
                                                  <div className="vighor-widget-container">
                                                      <Link to="/" className="sc_layouts_logo sc_layouts_logo_default trx_addons_inline_1267794613">
                                                          <img className="logo_image"
                                                              src="//helpline.impacto-patronus.ancorathemes.com/wp-content/uploads/2019/03/tree-logo.png"
                                                              srcSet="//helpline.impacto-patronus.ancorathemes.com/wp-content/uploads/2019/03/tree-logo-retina.png 2x"
                                                              alt="Impacto Patronus"
                                                              width={80}
                                                              height={80}
                                                          />
                                                      </Link>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                                  <div className="vighor-column vighor-col-33 vighor-top-column vighor-element vighor-element-51becc2 sc_layouts_column_align_center sc_layouts_column sc-mobile_content_align_center sc_inner_width_none sc_content_align_inherit sc_layouts_column_icons_position_left">
                                      <div className="vighor-column-wrap vighor-element-populated">
                                          <div className="vighor-widget-wrap align-content-center">
                                              <div className="sc_layouts_item vighor-element vighor-element-3996780 sc_fly_static vighor-widget vighor-widget-text-editor">
                                                  <div className="vighor-widget-container">
                                                      <div className="vighor-text-editor vighor-clearfix">
                                                          <p>© { new Date().getFullYear() } Rapha haiti&nbsp;
                                                              <a href="https://glcomm-agency.com/" target="_blank" rel="nofollow">
                                                                  website by Global communication
                                                              </a>
                                                          </p>
                                                      </div>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                                  <div className="vighor-column vighor-col-33 vighor-top-column vighor-element vighor-element-d509875 sc_layouts_column_align_right sc_layouts_column sc-mobile_content_align_center sc_inner_width_none sc_content_align_inherit sc_layouts_column_icons_position_left">
                                      <div className="vighor-column-wrap vighor-element-populated">
                                          <div className="vighor-widget-wrap">
                                              <div className="sc_layouts_item vighor-element vighor-element-8734a06 sc_fly_static vighor-widget vighor-widget-trx_sc_socials">
                                                  <div className="vighor-widget-container">
                                                      <div className="sc_socials sc_socials_default sc_align_none">
                                                          <div className="socials_wrap">
                                                              <Link
                                                                  target="_blank"
                                                                  to="#"
                                                                  className="social_item social_item_style_icons sc_icon_type_icons social_item_type_icons"
                                                                  rel="nofollow">
                                                                  <span className="social_icon d-flex align-items-center justify-content-center">
                                                                      <svg xmlns="http://www.w3.org/2000/svg" height="1em" fill="#fff" viewBox="0 0 448 512">
                                                                          <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/>
                                                                      </svg>
                                                                  </span>
                                                              </Link>
                                                              <Link target="_blank" to="#" className="social_item social_item_style_icons sc_icon_type_icons social_item_type_icons" rel="nofollow">
                                                                  <span className="social_icon d-flex align-items-center justify-content-center">
                                                                      <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                                                                          <path fill="#fff" d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"/>
                                                                      </svg>
                                                                  </span>
                                                              </Link>
                                                              <Link target="_blank" to="/" className="social_item social_item_style_icons sc_icon_type_icons social_item_type_icons" rel="nofollow">
                                                                  <span className="social_icon d-flex align-items-center justify-content-center">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" height="1em" viewBox="0 0 576 512">
                                                                        <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"/>
                                                                    </svg>
                                                                  </span>
                                                              </Link>
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
          </div>
      </FooterStyled>
  </>

}
export default Footer

const FooterStyled = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
`
