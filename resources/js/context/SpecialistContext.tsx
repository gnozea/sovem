import React, {createContext, FC, useReducer} from "react";

const initialState: any = []

const SpecialistContext = createContext(initialState)

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
    if (action.type === "ADD_SPECIALISTS") { // @ts-ignore
        return action.payload
    }
    if (action.type === "ADD_SPECIALIST") { // @ts-ignore
        return [...state, {...action.payload}]
    }

    return state
}

export const SpecialistProvider: FC<IProps> = (props: IProps) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    return <SpecialistContext.Provider value={{ state, dispatch }}>
        {props.children}
    </SpecialistContext.Provider>
}

export default SpecialistContext




