import React from 'react'
import { render } from 'react-dom'

import App from './App'
import { configureStore } from '@reduxjs/toolkit'
import { todosSlice } from './redux/todosSlice'
import { Provider } from 'react-redux'

export const store = configureStore({
    reducer: todosSlice.reducer,
})

render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.querySelector('#root')
)