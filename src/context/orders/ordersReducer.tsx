import { OrdersStateType } from "./ordersContext"
import types from "./types"



export const ordersReducer = (state: OrdersStateType, action: any) => {

    switch(action.type) {
        case types.onSelectOrder : 
            return {
                ...state,
                order: action.payload
            }
        default: 
            return state
    }

}