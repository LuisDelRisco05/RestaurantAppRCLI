import { FirebaseStateType } from "./FirebaseContext"
import FirebaseAction from "./types"

export const firebaseReducer = (state:FirebaseStateType , action: FirebaseAction) : FirebaseStateType => {

    switch(action.type) {
        case 'getProducts' : 
            return {
                ...state,
                menu: action.payload
            }
        default: 
            return state
    }

}