import { createSlice } from '@reduxjs/toolkit'

const initialState = {content: 'Notification message'}

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    
  }
})

// export const { showdefaultMessage } = notificationSlice.actions
export default notificationSlice.reducer