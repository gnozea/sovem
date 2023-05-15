import React, {FC, useContext, useEffect} from "react";
import AccountContext from "../context/AccountContext";
import Public from "./Public";
import Admin from "./Admin";
import Login from "./Login";
import axios from "axios";

interface IProps {
    account: any
}
const Loader: FC<IProps> = (props: IProps) => {
    const { dispatch } = useContext(AccountContext),
        url = window.location.pathname
    useEffect(() => {
        dispatch({ type: "SET_ACCOUNT", payload: props.account })
    }, [])
    if (url.indexOf('dashboard') === -1) return <Public/>
    if (!Object.keys(props.account).length) return <Login/>
    axios.defaults.params = {}
    axios.defaults.params['provider_id'] = props.account.provider_id
    return <Admin/>
}
export default Loader
