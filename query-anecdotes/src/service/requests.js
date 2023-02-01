import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () =>
  axios.get(baseUrl).then(res => res.data)

export const createAnecdote = newAnecdote =>
  newAnecdote.toString().length > 4 && axios.post(baseUrl, newAnecdote).then(res => res.data)

export const updateAnecdote = updatedAnecdote =>
  axios.put(`${baseUrl}/${updatedAnecdote.id}`, {
    content: updatedAnecdote.content,
    votes: updatedAnecdote.votes + 1
  }).then(res => res.data)