import React, {createContext, FC, useReducer} from "react"

const initialState: any = {

}

const RequestContext = createContext(initialState)

interface IAction {
    type: string,
    payload: any
}

interface IState {

}
interface IProps {
    children: React.ReactNode
}

const reducer = (state: IState, action: IAction) => {
    if (action.type === "SET_REQUESTS") {
        // @ts-ignore
        return [ ...action.payload ]
    }

    if (action.type === "UPDATE_REQUEST_STATUS"){
        // @ts-ignore
        const requests: any = [...state ]
        requests[action.payload.key].requests[0]["status"] = action.payload.status
        return requests
    }

    if (action.type === "UPDATE_RELEASED"){
        const released: any = Object.keys(action.payload).map((key: any) => {
            return key.replace("release-", "")
        })
        // @ts-ignore
        const items = [...state]
        released.forEach((item: any, key: number) => {

        })
        console.log(released);
    }

    return state
}

export const RequestProvider: FC<IProps> = (props: IProps) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    return <RequestContext.Provider value={{ state: state, dispatch }}>
        {props.children}
    </RequestContext.Provider>
}

export default RequestContext
