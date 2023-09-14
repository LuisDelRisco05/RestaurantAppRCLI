import { createContext } from "react"

export interface Fields {
    id: string,
    category: string,
    description: string,
    exist: boolean,
    image: string,
    name: string,
    price: number,
    subtotal?: number,
    quantity?: number
}

export interface OrdersStateType {
    orders: Fields[],
    order: Fields,
    categoryCurrent: string,
    orderPlaced: string
}

export interface OrdersContextProps extends OrdersStateType{
    state: OrdersStateType,
    onSelectOrder: (select:Fields) => void,
    onConfirmOrder: (order:Fields) => void,
    onCategoryCurrent: (category:string) => void,
    onDeleteItem: (itemid:string) => void,
    onOrderPlaced: (id:string) => void,
    onReset: () => void,
}

export const OrdersContext = createContext({} as OrdersContextProps)
