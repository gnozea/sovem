import React, {createContext, FC, useReducer} from "react"

const initialState: any = []

const UserContext = createContext(initialState)

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
    if (action.type === "ADD_USERS") { // @ts-ignore
        return [ ...action.payload ]
    }
    if (action.type === "REMOVE_USER") { // @ts-ignore
        return (state as any[]).filter((_: any, i: number) => i !== action.payload)
    }
    return state
}


export const UserProvider: FC = (props: IProps) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    return <UserContext.Provider value={{ users: state, dispatch }}>
        { props.children }
    </UserContext.Provider>
}
export default UserContext


