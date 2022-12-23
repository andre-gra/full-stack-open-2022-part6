import { createSlice } from '@reduxjs/toolkit'

const initialState = {content: ''}

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    showVoteMessage(state, action) {
      const content = action.payload
      const message = {
        content: `you voted '${content}'`
      }
      return message
    },
    showCreateMessage(state, action) {
      const content = action.payload
      const message = {
        content: `you created '${content}'`
      }
      return message
    },
    resetMessage() {
      return initialState
    }
  }
})

export const { showVoteMessage, showCreateMessage, resetMessage } = notificationSlice.actions
export default notificationSlice.reducer