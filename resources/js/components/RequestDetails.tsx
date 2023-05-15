import React, {FC} from "react";
import Popup from "./utils/Popup";
import styled from "styled-components";
import Moment from "react-moment";
import GoogleMapReact from 'google-map-react';

const Left = styled.div`
    @media all and (max-width: 768px){
        margin-top: 0;
    }
`

const Wrapper = styled.div`
    flex-direction: column;
    @media all and (min-width: 768px){
        flex-direction: row;
    }
`
const Content = styled.div`
    .ant-picker{
        width: 100%;
    }
    @media all and (min-width: 768px){
        flex: 2;
        margin-left: 5%;
    }
`
const calendarStrings = {
    lastDay : '[Yè v`] LT',
    sameDay : '[Jodi a vè] LT',
    nextDay : '[Demen vè] LT',
    lastWeek : 'dddd [dènye] [vè] LT',
    nextWeek : 'dddd [vè] LT',
    sameElse : 'L'
};
interface IProps {
    item: any,
    onClose: any
}

const handleShowDetail: FC<IProps> = (props: IProps) => {
    const defaultProps = {
        center: {
            lat: 10.99835602,
            lng: 77.01502627
        },
        zoom: 11
    };
    console.log(props.item);
    return <Popup onPopupClose={() => props.onClose()} parentId={18273}>
        <Wrapper className="flex justify-content-between">
            <Left>
                {/*<GoogleMapReact*/}
                {/*    bootstrapURLKeys={{ key: "" }}*/}
                {/*    defaultCenter={defaultProps.center}*/}
                {/*    defaultZoom={defaultProps.zoom}*/}
                {/*>*/}
                {/*</GoogleMapReact>*/}
            </Left>
            <Content className="">
                <h4 className="mt-0 mb-4">Détails</h4>
                <strong>Type de violence</strong>
                <ul>
                    {props.item.violence_type.map((request: any, key: number) => <li key={key}>{request}</li>)}
                </ul>
                <p style={{ lineHeight: '.8' }}>
                    <strong>Lieu d'incident</strong>: {props.item.incident_location}
                </p>
                <p style={{ lineHeight: '.8' }}>
                    <strong>Date d'incident</strong>: <Moment calendar={calendarStrings}>{props.item.incident_date}</Moment>
                </p>
                <p className="mt-3" style={{ lineHeight: '.8' }}>
                    {/*<strong>Lieu de résidence</strong>: {`${props.item.city.name.trim()}, ${props.item.city.zip}`}*/}
                </p>

            </Content>
        </Wrapper>
    </Popup>
}
export default handleShowDetail
