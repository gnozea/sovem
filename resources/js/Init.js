import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import Loader from "./templates/Loader";
import {AccountProvider} from "./context/AccountContext";
import {BrowserRouter} from "react-router-dom";
import Progress from "./components/utils/Progress";
import styled from "styled-components";

const LoaderWrapper = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
    height: 100vh;
    width: 100%;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: #fff;
`
function Init() {
    const [account, setAccount] = useState(false)
    useEffect(() => {
        axios.get("/api/account/check").then((rep) => setAccount(rep.data))
    }, [])
    if (typeof account === "boolean") return <LoaderWrapper>
        <Progress color="#E89C42" style="skype"/>
    </LoaderWrapper>
    return <AccountProvider>
        <BrowserRouter>
            <Loader account={account}/>
        </BrowserRouter>
    </AccountProvider>
}

export default Init;

if (document.getElementById('app')) {
    ReactDOM.render(<Init />, document.getElementById('app'));
}
