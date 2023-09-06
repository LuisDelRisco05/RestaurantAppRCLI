import { createContext } from "react"

export interface Fields {
    category: string,
    description: string,
    exist: boolean,
    image: string,
    name: string,
    price: number
}

export interface OrdersStateType {
    orders: any[],
    order: Fields
}

export interface OrdersContextProps extends OrdersStateType{
    state: OrdersStateType,
    onSelectOrder: (select:Fields) => void,
}

export const OrdersContext = createContext({} as OrdersContextProps)
