import React, {FC} from "react";
import BrowserTitle from "../utils/BrowserTitle";

interface IProps {
    size: any
}

const About: FC<IProps> = (props: IProps) => {
    return <>
      <BrowserTitle title={"Kiyès nou ye"}/>
      <section
          className="vighor-section vighor-top-section vighor-element vighor-element-8fa36ae vighor-section-stretched vighor-section-boxed vighor-section-height-default vighor-section-height-default"
          data-id="8fa36ae"
          data-element_type="section"
          data-settings='{"stretch_section":"section-stretched","background_background":"classic"}'
          style={{ width: `${props.size[0]}px`, backgroundColor: "#fff" }}
      >
          <div className="vighor-container vighor-column-gap-extended">
              <div className="vighor-row">
                  <div className="vighor-column vighor-col-100 vighor-top-column vighor-element vighor-element-e7753de sc_inner_width_none sc_content_align_inherit sc_layouts_column_icons_position_left">
                      <div className="vighor-column-wrap vighor-element-populated">
                          <div className="vighor-widget-wrap">
                              <div
                                  className="vighor-element vighor-element-e3f96be sc_height_huge sc_fly_static vighor-widget vighor-widget-spacer"
                                  data-id="e3f96be" data-element_type="widget" data-widget_type="spacer.default">
                                  <div className="vighor-widget-container">
                                      <div className="vighor-spacer">
                                          <div className="vighor-spacer-inner"></div>
                                      </div>
                                  </div>
                              </div>

                              <div className="vighor-element vighor-element-865664b sc_fly_static vighor-widget vighor-widget-trx_sc_title animated fadeIn">
                                  <div className="vighor-widget-container">


                                      <div
                                          className="vighor-element vighor-element-865664b sc_fly_static vighor-widget vighor-widget-trx_sc_title animated fadeIn"
                                          data-id="865664b" data-element_type="widget"
                                          data-settings="{&quot;_animation&quot;:&quot;fadeIn&quot;,&quot;_animation_mobile&quot;:&quot;none&quot;,&quot;_animation_delay&quot;:200}"
                                          data-widget_type="trx_sc_title.default">
                                          <div className="vighor-widget-container">
                                              <div id="trx_sc_title_850374424" className="sc_title sc_title_decoration">
                                                  <span className="sc_item_subtitle sc_title_subtitle sc_align_center sc_item_subtitle_above sc_item_title_style_decoration">
                                                      <span className="subtitle_text">SAW DWE KONNEN SOU POTAY SA.</span>
                                                  </span>
                                                  <h1 className="sc_item_title sc_title_title sc_align_center sc_item_title_style_decoration sc_item_title_tag">
                                                  <span className="sc_item_title_text">Kiyès nou ye?</span>
                                              </h1>
                                                  <div className="sc_item_descr sc_title_descr sc_align_center">
                                                      <p>
                                                          KONEKTEM se yon Platfom ki kreye nan lide pou konekte moun ki viktim zak vyolans tout kalite tankou : <br/> violans seksyèl ak fizik, eksplwatasyon, ak anpil enstitisyon ki bay divès sèvis tankou : swen sikososyal ak medikal, ak bourad lajan.
                                                      </p>
                                                      <ul className="trx_addons_list_dot text-start">
                                                          <li>Platfom sa ebèje yon mekanis katografi ak referesman ki chita sou yon fomil : itilizatè-zanmitay</li>
                                                          <li>Potay la pèmèt itilizatè yo itilize yon fomilè ki bay plizyè opsyon pou sinyale nati sèvis yap chache a</li>
                                                          <li>Se yon demach ki totalman anonym. Pa gen pèson ki ka retrase moun ki mande sèvis la, menm antite kap jere sit la ak enstitisyon kap bay sèvis la</li>
                                                          <li>Systèm referansman ki ebèje sou sit wèb sa itilize yon systèm biyè kote chak itilizatè resevwa yon nimero tikè ki inik. Niméro sa se sèl lyen ki konekte demandè à ak fonisè sèvis la</li>
                                                          <li>Potay la gen yon katografi entè-aktif ki pèmèt itilizatè yo wè ki kote fonisè sèvis yo lokalize</li>
                                                          <li>Katografi a endike ki typ sèvis ki disponib ak ki kote chak fonisè sèvis yo ye</li>
                                                          <li>Potay sa oubyen antite kap jere li-à, pa bay okenn sèvis. Wol li se konekte moun kap chache sèvis ak enstitisyon kap bay sèvis yo. Potay la oubyen antite kap jere li à, pa gen okenn responsabilit nan sa ki gen à wè aka bi ki gen rapo ak itilizasyon sit la ou byen kalite swen sèvis bi bay yo</li>
                                                      </ul>
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
  </>
}
export default About
