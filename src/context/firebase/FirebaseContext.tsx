import { createContext } from "react"

export interface FirebaseStateType {
    menu: any[]
}

export interface FirebaseContextProps extends FirebaseStateType {
    state: FirebaseStateType,
    firebase: any,
    getProducts: () => void,
}

export const FirebaseContext = createContext({} as FirebaseContextProps)
