import React from 'react'
import ReactDOM from 'react-dom/client'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import App from './App'
import anecdoteStore from './store/anecdoteStore'
import notificationStore from './store/notificationStore'

const store = configureStore({
  reducer: {
    anecdotes: anecdoteStore,
    notifications: notificationStore
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
