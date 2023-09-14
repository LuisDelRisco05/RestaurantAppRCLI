import { useReducer } from "react"
import { ordersReducer } from "./ordersReducer"
import {Fields, OrdersContext } from "./OrdersContext"
import types from "./types"



type Props = {
    children: JSX.Element
}


export const OrdersState = ({children}: Props) => {


    const initialState = {
        orders: [],
        order: {},
        categoryCurrent: '',
        orderPlaced: ''
    }
 
    const [ state, dispatch ] = useReducer(ordersReducer, initialState )


    const onSelectOrder = (select: {}) => {

        dispatch({
            type: types.selectOrder,
            payload: select
        })
    }

    const onConfirmOrder = (order: {}) => {

        dispatch({
            type: types.confirmOrder,
            payload: order
        })     
    }

    const onCategoryCurrent = (category: string) => {

        dispatch({
            type: types.categoryCurrent,
            payload: category
        })
    }

    const onDeleteItem = (itemId: string) => {

        const newOrders = state.orders.filter( (item:Fields) => item.id !== itemId)

        dispatch({
            type: types.deleteItem,
            payload: newOrders
        })
    }

    const onOrderPlaced = (id: string) => {
        dispatch({
            type: types.orderPlaced,
            payload: id
        })
    }

    const onReset = () => {

        dispatch({
            type: types.reset
        })
    }

  return (
    <OrdersContext.Provider value={{
        state,
        orders: state.orders,
        order: state.order,
        categoryCurrent: state.categoryCurrent,
        orderPlaced: state.orderPlaced,
        onSelectOrder,
        onConfirmOrder,
        onCategoryCurrent,
        onDeleteItem,
        onOrderPlaced,
        onReset
    }}>
        {children}
    </OrdersContext.Provider>
  )
}
