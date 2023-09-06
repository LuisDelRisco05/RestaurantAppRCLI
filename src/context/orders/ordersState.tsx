import { useReducer } from "react"
import { ordersReducer } from "./ordersReducer"
import {Fields, OrdersContext } from "./ordersContext"
import types from "./types"



type Props = {
    children: JSX.Element
}


export const OrdersState = ({children}: Props) => {


    const initialState = {
        orders: [],
        order: {}
    }
 
    const [ state, dispatch ] = useReducer(ordersReducer, initialState )


    const onSelectOrder = (select: {}) => {

        dispatch({
            type: types.onSelectOrder,
            payload: select
        })
    }

  return (
    <OrdersContext.Provider value={{
        state,
        orders: state.orders,
        order: state.order,
        onSelectOrder,
    }}>
        {children}
    </OrdersContext.Provider>
  )
}
