import { configureStore } from '@reduxjs/toolkit'
import pasteReducer from '../src/redux/pasteSlice'

export default configureStore({
    reducer: {
        paste: pasteReducer,
    },
})