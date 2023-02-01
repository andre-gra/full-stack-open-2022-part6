import { createContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "NEW":
      const contentNew = action.payload
      return `you created '${contentNew}'`
    case "VOTE":
      const contentVote = action.payload
      return `you voted '${contentVote}'`
    case "SHORT":
      return action.payload
    case "RESET":
      return null
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, null)

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext