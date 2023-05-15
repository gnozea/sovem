import React, {useEffect, useRef, useState} from "react";
import ReactDOM from "react-dom";
import styled, { keyframes } from "styled-components";
const loader1 = <svg key={1} version="1.1" className="loader-dots" style={{width: "100px",height: "100px",marginLeft: "60px"}} id="L4" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 100 100" enableBackground="new 0 0 0 0">
    <circle fill="#4a4a4a" stroke="none" cx="6" cy="50" r="6">
    <animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin="0.1"/> </circle>
    <circle fill="#4a4a4a" stroke="none" cx="26" cy="50" r="6">
    <animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin="0.2"/> </circle>
    <circle fill="#4a4a4a" stroke="none" cx="46" cy="50" r="6">
    <animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin="0.3"/> </circle>
</svg>
const progress = <svg key={1} width="200" height="200" xmlns="http://www.w3.org/2000/svg" className="circular-loader" viewBox="25 25 50 50"><circle className="loader-path" cx="50" cy="50" r="20" fill="none" stroke="#E3E8EE" strokeWidth="3"/></svg>;

const rotate = keyframes`
  100% {
    transform: rotate(360deg);
  }
`
const dash = keyframes`
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -124;
  }
`

const dotScale = keyframes`
  0%, 10% { width: 16px; height: 16px; margin-left: -8px;  margin-top: -4px; }
  50% { width: 8px; height: 8px; margin-left: -4px; margin-top: 0; }
  90%, 100% { width: 16px; height: 16px;  margin-left: -8px;  margin-top: -4px; }
`;

const dotRotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const SkypeStyle = styled.div`
    width: 80px;
    height: 80px;
    position: relative;
    margin: auto;
    margin-top: 60px;
    margin-bottom: 70px;
`
const First = styled.div`
    background: #fff;
    margin-top: -4px;
    animation: 1.7s ${dotScale} cubic-bezier(0.775, 0.005, 0.310, 1.000) infinite;
    animation-delay: 0.2s;
`

const Dot = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 80px;
    height: 80px;
    animation: 1.7s ${dotRotate} cubic-bezier(0.775, 0.005, 0.310, 1.000) infinite;
   &:nth-child(1) {
        animation-delay: 0.2s;
   }
   &:nth-child(2) {
      animation-delay: 0.35s;
   }
   &:nth-child(3) {
      animation-delay: 0.45s;
  }
  &:nth-child(4) {
    animation-delay: 0.55s;
  }
  &:after, ${First} {
      content: "";
      position: absolute;
      width: 8px;
      height: 8px;
      background: ${(props) => props.color ? props.color: '#fff'};
      border-radius: 50%;
      left: 50%;
      margin-left: -4px;
  }
`

const LoaderWrapper = styled.div`
        height: 100%;
        width: 100%;
        position: absolute;
        z-index: 1;
        left: 0;
        top: 0;
        .circular-loader {
          animation: ${rotate} 2s linear infinite;
          height: 30px;
          transform-origin: center center;
          width: 30px;
          position: absolute;
          top: 0;
          left: 0;
          margin: auto;
          right: 0;
          bottom: 0;
        }
        .loader-path {
          stroke-dasharray: 150, 200;
          stroke-dashoffset: -10;
          animation: ${dash} 1.5s ease-in-out infinite, color 1.5s ease-in-out infinite;
          stroke-linecap: round;
          stroke: #989898;
        }
    `

const Progress = props => {

    const ref = useRef()

    if (props.style === 'skype') return <>
        <SkypeStyle>
            <Dot color={props.color}>
                <First/>
            </Dot>
            <Dot color={props.color}></Dot>
            <Dot color={props.color}></Dot>
            <Dot color={props.color}></Dot>
        </SkypeStyle>
    </>

    return (
        <LoaderWrapper className="text-center" ref={ref} key="myLoader--loader">
            {[progress]}
        </LoaderWrapper>
    )
}

export default Progress
