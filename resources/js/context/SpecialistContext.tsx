import React, {createContext, FC, useReducer} from "react";

const initialState: any = []

const ServiceContext = createContext(initialState)

interface IAction {
    type: string,
    payload: any
}

interface IState {

}
interface IProps {
    children: any
}


const reducer = (state: IState, action: IAction) => {
    if (action.type === "ADD_SERVICES") { // @ts-ignore
        return action.payload
    }
    if (action.type === "ADD_SERVICE") { // @ts-ignore
        return [...state, {...action.payload}]
    }

    return state
}

export const ServiceProvider: FC<IProps> = (props: IProps) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    return <ServiceContext.Provider value={{ state, dispatch }}>
        {props.children}
    </ServiceContext.Provider>
}

export default ServiceContext




