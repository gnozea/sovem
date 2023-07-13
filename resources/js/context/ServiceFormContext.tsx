import React, {createContext, FC, useReducer} from "react"
import moment from "moment";
import {violenceTypes, felons, ageRanges} from "../components/utils/constants"

const initialState: any = {
    services: null,
    specialities: null,
    violenceTypes: violenceTypes, //["Vyolans seksyel", "Vyolans Fizik", "Deplasman fòse"],
    felon: felons,//["Yon patenè", "Yon manm fanmi", "Yon otorite", "Yon enkoni"],
    ageRange: ageRanges,//["Mwens ke 12 zan", "12 - 18", "19 - 35", "36 - 49", "50 oswa plis"],
    genders: ["Fi", "Gason"],
    selections: {
        serviceId: [],
        specialistId: [],
        city: null,
        crimeCity: null,
        felon: [],
        violenceType: [],
        incidentLocation: null,
        ageRange: null,
        gender: null,
        incidentDate: moment().format("YYYY-MM-DD"),
    }
}

const ServiceFormContext = createContext(initialState)

interface IAction {
    type: string,
    payload: any
}

interface IState {
    services: any,
    specialities: any,
    felon: [],
    violenceTypes: [],
    ageRange: []
    genders: []
    selections: {
        serviceId: (string|number)[],
        specialistId: (string|number)[],
        city: any,
        crimeCity: any,
        felon: string,
        incidentLocation: any,
        violenceType: string[],
        ageRange: any,
        gender: any,
        incidentDate: Date,
    }
}

interface IProps {
    children?: React.ReactNode
}

const reducer = (state: IState, action: IAction) => {
    if (action.type === "SET_SERVICES") return { ...state, services: action.payload }
    if (action.type === "SET_SPECIALITIES") return { ...state, specialities: action.payload }

    if (action.type === "SET_SELECTED_SERVICE") {
        state.selections.serviceId = action.payload
        return state
    }

    if (action.type === "SET_GENDER") {
        state.selections.gender = action.payload
        return state
    }

    if (action.type === "SET_VIOLENCE_TYPE") {
        state.selections.violenceType = action.payload
        return state
    }

    if (action.type === "SET_AGE") {
        state.selections.ageRange = action.payload
        return state
    }

    if (action.type === "SET_FELON") {
        state.selections.felon = action.payload
        return state
    }

    if (action.type === "SET_SELECTED_SPECIALITIES") {
        state.selections.specialistId = action.payload
        return state
    }

    if (action.type === "SET_CITY") {
        state.selections.city = action.payload
        return state
    }

    if (action.type === "SET_CRIME_CITY") {
        const copy: any = { ...state }
        copy.selections = {...copy.selections, crimeCity: action.payload}
        return copy
    }

    if (action.type === "SET_INCIDENT_LOCATION") {
        state.selections.incidentLocation = action.payload
        return state
    }

    if (action.type === "SET_INCIDENT_DATE") {
        state.selections.incidentDate = action.payload
        return state
    }
    return state
}

export const ServiceFormProvider: FC<IProps> = (props: IProps) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    return <ServiceFormContext.Provider value={{ state, dispatch }}>
        { props.children }
    </ServiceFormContext.Provider>
}

export default ServiceFormContext
