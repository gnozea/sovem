import React, {FC, useEffect, useLayoutEffect, useState} from "react";
import Slide from "./home/Slide";
import Section2 from "./home/Section2";
import Section3 from "./home/Section3";

interface IProps {

}
const Home:FC<IProps> = (props: IProps) => {
    const [size, setSize] = useState([window.innerWidth, window.innerHeight]);
    useLayoutEffect(() => {
        const updateSize = () => {
            setSize([window.innerWidth, window.innerHeight]);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);
    return <>
        <Slide windowSize={size}/>
        <Section2 windowSize={size}/>
        <Section3 windowSize={size}/>
    </>
}
export default Home
