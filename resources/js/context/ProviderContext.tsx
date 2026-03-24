import React, {createContext, FC, useReducer} from "react";

const initialState: any = {

}

const ProviderContext = createContext(initialState)

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
    if (action.type === "SET_PROVIDERS") return action.payload
    if (action.type === "ENABLE_DISABLE") {
        // @ts-ignore
        const providers: any = [...state]
        providers[action.payload.index]['status'] = action.payload.status
        return providers
    }
    if (action.type === "ADD_PROVIDER") {
        // @ts-ignore
        return [...state, action.payload]

        //return providers
    }
    if (action.type === "EDIT_PROVIDER") {
        // @ts-ignore
        const providers: any = [...state]
        providers[action.payload.index] = {...providers[action.payload.index], ...action.payload.update}
        return providers
    }
    if (action.type === "REMOVE_PROVIDER") {
        // @ts-ignore
        return (state as any[]).filter((_: any, i: number) => i !== action.payload)
    }
    return state
}

export const ProviderProvider: FC<IProps> = (props: IProps) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    return <ProviderContext.Provider value={{ providers: state, dispatch }}>
        {props.children}
    </ProviderContext.Provider>
}

export default ProviderContext




