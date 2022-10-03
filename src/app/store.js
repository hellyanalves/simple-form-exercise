import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import { birthDateReducer } from '../App'

export default configureStore({
    reducer: {
        counter: counterReducer,
        formBirthDate: birthDateReducer
    }
})