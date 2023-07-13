import React, {FC, useContext, useEffect, useState} from "react";
import axios from "axios";
import AccountContext from "../../../context/AccountContext";
import SpecialistContext from "../../../context/SpecialistContext";
import Restricted from "../../utils/Restricted";
import Progress from "../../utils/Progress";




const Specialist: FC = (props) => {

    const { state, dispatch } = useContext(SpecialistContext),
        {user} = useContext(AccountContext),
        [showAdd, setShowAdd] = useState<boolean>(),
        [showAddSpecialist, setShowAddSpecialist] = useState<any>(),
        [showLinkProvider, setShowLinkProvider] = useState<any>(),
        [loading, setLoading] = useState<boolean>(true),
        [reload, setReload] = useState<boolean>()


    useEffect(() => {
        axios.get("/api/dashboard/specialists").then((rep: any) => {
            const data = [...rep.data.data]
            dispatch({type: "ADD_SPECIALISTS", payload: data})
            setLoading(false)
        })
        if (reload) setReload(false)
    }, [reload])

    if (user?.provider_id) return <Restricted/>
    if (loading && !state.length) return <Progress/>

    return <></>
}
export default Specialist
