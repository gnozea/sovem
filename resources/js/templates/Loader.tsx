import React, {FC, useContext, useEffect} from "react";
import axios from "axios";
import Public from "./Public";
import Login from "./Login";
import AccountContext from "../context/AccountContext";
import Admin from "./Admin";

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
