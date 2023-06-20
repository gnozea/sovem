import React, {FC} from "react";
import BrowserTitle from "../utils/BrowserTitle";
import {SectionI} from "./about/SectionI";
import {Banner} from "./about/Banner";
import {SectionII} from "./about/SectionII";
import {SectionIII} from "./about/SectionIII";
import {SectionIV} from "./about/SectionIV";
import {SectionV} from "./about/SectionV";
import {SectionVI} from "./about/SectionVI";

interface IProps {
    size: any
}

const About: FC<IProps> = (props: IProps) => {
    return <>
      <BrowserTitle title={"Kiyès nou ye"}/>
      <Banner size={props.size}/>
      <SectionI size={props.size}/>
      <SectionII size={props.size}/>
        <div className="vighor-element vighor-element-c55b0b8 sc_height_huge sc_fly_static vighor-widget vighor-widget-spacer">
            <div className="vighor-widget-container">
                <div className="vighor-spacer">
                    <div className="vighor-spacer-inner" />
                </div>
            </div>
        </div>
      <SectionIII size={props.size}/>
        <div className="vighor-element vighor-element-c55b0b8 sc_height_huge sc_fly_static vighor-widget vighor-widget-spacer">
            <div className="vighor-widget-container">
                <div className="vighor-spacer">
                    <div className="vighor-spacer-inner" />
                </div>
            </div>
        </div>
      <SectionIV size={props.size}/>
        <div className="vighor-element vighor-element-c55b0b8 sc_height_huge sc_fly_static vighor-widget vighor-widget-spacer">
            <div className="vighor-widget-container">
                <div className="vighor-spacer">
                    <div className="vighor-spacer-inner" />
                </div>
            </div>
        </div>
        <SectionV size={props.size}/>

        <div className="vighor-element vighor-element-c55b0b8 sc_height_huge sc_fly_static vighor-widget vighor-widget-spacer">
            <div className="vighor-widget-container">
                <div className="vighor-spacer">
                    <div className="vighor-spacer-inner" />
                </div>
            </div>
        </div>
        <SectionVI size={props.size}/>
  </>
}
export default About
