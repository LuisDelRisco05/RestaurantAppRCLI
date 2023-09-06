import app from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'

import { firebaseConfig } from './config'


class Firebase {
    constructor() {
        app.initializeApp(firebaseConfig)
        this.db = app.firestore()
        // this.storage = app.storage()
    }
}

export const firebase = new Firebase()


