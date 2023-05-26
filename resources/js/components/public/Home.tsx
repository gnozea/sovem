import React, {FC, useEffect, useLayoutEffect, useState} from "react";
import Slide from "./home/Slide";
import Section2 from "./home/Section2";
import Section3 from "./home/Section3";

interface IProps {
    size: any
}
const Home:FC<IProps> = (props: IProps) => {

    return <>
        <Slide windowSize={props.size}/>
        <Section2 windowSize={props.size}/>
        <Section3 windowSize={props.size}/>
    </>
}
export default Home
