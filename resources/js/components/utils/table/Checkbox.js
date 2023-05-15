import React, { useEffect } from "react";
import styled from "styled-components";


export const CheckBox = props => {
    let attr = { }
    if (props.forTable) attr = { ...attr, checked: props.checked}
    if (!props.forTable) attr = { ...attr, defaultChecked: props.checked}
    return(
        <span>
            <input key={props.id} disabled={props.disabled === undefined ? false : props.disabled } id={`checkbox-${props.id}`} onChange={props.onSelect} type="checkbox" className="inp-cbx"
                   { ...attr } value={props.value || ''} style={{opacity: '0'}}/>
            <label className="cbx" htmlFor={`checkbox-${props.id}`}>
                <span>
                    <svg width="9px" height="10px" viewBox="0 0 12 10">
                        <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                    </svg>
                </span>
                { props.title ? <span className="">&nbsp;{props.title}</span> : '' }
            </label>
        </span>
    )
}

export const Radio = props => {
    let attr = { }
    if (props.forTable) attr = { ...attr, checked: props.checked}
    if (!props.forTable) attr = { ...attr, defaultChecked: props.checked}
    return(
        <span>
            <input key={props.id} disabled={props.disabled === undefined ? false : props.disabled } id={`checkbox-${props.id}`} onChange={props.onSelect} type="radio" className="inp-cbx"
                   { ...attr } value={props.value || ''} style={{opacity: '0'}} name={props.name}/>
            <label className="cbx" htmlFor={`checkbox-${props.id}`}>
                <span style={{ borderRadius: "50%" }}>
                    <svg width="10px" height="10px" className="m-0" viewBox="0 0 100 100">
                        <circle r="50" cx="50" cy="50" fill="#fff"></circle>
                    </svg>
                </span>
                { props.title ? <span className="">&nbsp;{props.title}</span> : '' }
            </label>
        </span>
    )
}

export const CheckBoxHead = props => {
    const id = Math.random().toString(36).substring(7).toString()
    return(
        <span>
            <input key={props.key} disabled={props.disabled} checked={props.checked} onChange={props.onSelectAll} id={id} style={{opacity: '0'}} type="checkbox" className="inp-cbx"/>
            <label className="cbx" htmlFor={id}>
                <span>
                    <svg width="9px" height="10px" viewBox="0 0 12 10">
                        <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                    </svg>
                </span>
                { props.title ? <span className=""></span> : '' }
            </label>
        </span>
    )
}

export const ToggleSwitch = props => {
    return <ToggleWrapper>
        <input disabled={props.disabled} checked={ props.checked || false } onChange={props.onToggle} onClick={props.onToggle} type="checkbox" className="sw" name={props.name ? props.name : props.id} id={props.id ? props.id : undefined}/>
        <label tabIndex={0} htmlFor={props.id ? props.id : undefined}>
            <span></span>
        </label>
        {props.label && <span>{props.label}</span>}
    </ToggleWrapper>
}

const ToggleWrapper = styled.div`
    display: flex;
    gap: 1rem;
`

export default {CheckBox, CheckBoxHead, ToggleSwitch, Radio}
