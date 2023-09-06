import { useReducer } from "react"
import { firebaseReducer } from "./firebaseReducer"
import {FirebaseContext, FirebaseStateType} from "./FirebaseContext"
import { firebase } from "../../firebase"
import _ from 'lodash'



type Props = {
    children: JSX.Element
}


export const FirebaseState = ({children}: Props) => {

    const initialState: FirebaseStateType = {
        menu: []
    }

    const [ state, dispatch ] = useReducer(firebaseReducer, initialState )

    const getProducts = () => {

        firebase.db
            .collection('products')
            .where('exist', '==', true) // traer solo los que esten en existencia
            .onSnapshot(handleSnapshot)

        function handleSnapshot(snapshot: any) {
            let dishs = snapshot.docs.map( (doc:any) => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            })

            // Order with lodash
            dishs = _.sortBy(dishs, 'category')

            dispatch({
                type: 'getProducts',
                payload: dishs
            })
        }
    }

  return (
    <FirebaseContext.Provider value={{
        state,
        menu: state.menu,
        firebase,
        getProducts
    }}>
        {children}
    </FirebaseContext.Provider>
  )
}
