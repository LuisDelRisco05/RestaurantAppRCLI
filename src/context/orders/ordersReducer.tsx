import { OrdersStateType } from "./OrdersContext"
import types from "./types"



export const ordersReducer = (state: OrdersStateType, action: any) => {

    switch(action.type) {
        case types.selectOrder : 
            return {
                ...state,
                order: action.payload
            }
        case types.confirmOrder : 
            return {
                ...state,
                orders: [...state.orders, action.payload]
            }
        case types.categoryCurrent : 
            return {
                ...state,
                categoryCurrent: action.payload
            }
        case types.deleteItem : 
            return {
                ...state,
                orders: action.payload
            }
        case types.orderPlaced : 
            return {
                ...state,
                orderPlaced: action.payload
            }
        case types.reset: 
            return {
                ...state,
                orders: [],
                order: {},
                categoryCurrent: '',
                orderPlaced: ''
            }
        default: 
            return state
    }

}