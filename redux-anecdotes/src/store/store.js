import { createSlice } from '@reduxjs/toolkit'

const anecdotesAtStart = []

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const anecdoteInitialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: anecdoteInitialState,
  reducers: {
    createAnecdote(state, action) {
      const content = action.payload
      state.push({
        content,
        id: getId(),
        votes: 0
      })
    },
    addVoteOf(state, action) {
      const id = action.payload
      const anecdoteToChange = state.find(n => n.id === id)
      const changedNote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedNote
      )
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  },
})

const notificationInitialState = { content: '' }

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: notificationInitialState,
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
      return notificationInitialState
    }
  }
})

const filterInitialState = { value: '' }

const filterSlice = createSlice({
  name: 'filters',
  initialState: filterInitialState,
  reducers: {
    changeValue(state, action) {
      return action.payload
    }
  }
})

export const { createAnecdote, addVoteOf, setAnecdotes } = anecdoteSlice.actions
export const anecdoteReducer = anecdoteSlice.reducer

export const { showVoteMessage, showCreateMessage, resetMessage } = notificationSlice.actions
export const notificationReducer = notificationSlice.reducer

export const { changeValue } = filterSlice.actions
export const filterReducer = filterSlice.reducer
