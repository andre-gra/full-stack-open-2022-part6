import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

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
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    }
  },
})

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const addVote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.addVote(content)
    dispatch(addVoteOf(newAnecdote.id))
  }
}

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

export const setVoteNotification = (content, time) => {
  return async dispatch => {
    dispatch(showVoteMessage(content))
    setTimeout(() => {
      dispatch(resetMessage())
    }, time * 1000) 
  }
}

export const setCreateNotification = (content, time) => {
  return async dispatch => {
    dispatch(showCreateMessage(content))
    setTimeout(() => {
      dispatch(resetMessage())
    }, time * 1000) 
  }
}

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

export const { addVoteOf, setAnecdotes, appendAnecdote } = anecdoteSlice.actions
export const anecdoteReducer = anecdoteSlice.reducer

export const { showVoteMessage, showCreateMessage, resetMessage } = notificationSlice.actions
export const notificationReducer = notificationSlice.reducer

export const { changeValue } = filterSlice.actions
export const filterReducer = filterSlice.reducer
