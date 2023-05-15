import React, {createContext, FC, useReducer} from "react"

const initialState: any = {
    user: null
}

const AccountContext = createContext(initialState)

interface IAction {
    type: string,
    payload: any
}

interface IState {
    user: any
}

interface IProps {
    children: React.ReactNode
}

const reducer = (state: IState, action: IAction) => {
    if (action.type === "SET_ACCOUNT") return { ...state, user: action.payload }
    return state
}


export const AccountProvider: FC = (props: IProps) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    return <AccountContext.Provider value={{ ...state, dispatch }}>
        { props.children }
    </AccountContext.Provider>
}
export default AccountContext


