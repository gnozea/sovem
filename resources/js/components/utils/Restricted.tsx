import React, {FC} from "react";
import Popup from "./Popup";
import styled from "styled-components";
import BrowserTitle from "./BrowserTitle";
import {Link} from "react-router-dom";

const PermissionWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    margin-top: 10px;
`

const ImgWrapper = styled.div`
    width: 300px;
`

const BackButton = styled.button`
    border: none;
    background: none;
`

interface IProps {
    children?: React.ReactNode
}


const Restricted: FC<IProps> = (props: IProps) => {
    return <Popup onPopupClose={() => {}} options={{closable: false}} parentId={20943} closable={false}>
        <BrowserTitle title="Permission denied"/>
        <PermissionWrapper>
            <div className="mx-auto text-center">
                <h2>Accès refusé</h2>
                <p>Désolé, vous ne disposez pas des autorisations nécessaires pour accéder à cette page.</p>
            </div>
            <div className="mt-3 mb-3">
                <Link to={"/dashboard"} className="btn btn-dark btn-sm">Aller au tableau de bord</Link>
            </div>
        </PermissionWrapper>
    </Popup>
}

export default Restricted
