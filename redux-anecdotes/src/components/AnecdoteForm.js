import { useDispatch } from "react-redux"
import { createAnecdote } from "../store/store"
import { showCreateMessage, resetMessage } from "../store/store"
import anecdoteService from "../services/anecdotes"

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const createNew = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(createAnecdote(newAnecdote.content))
    dispatch(showCreateMessage(newAnecdote.content))
    setTimeout(() => {
      dispatch(resetMessage())
    }, 5000);
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={createNew}>
        <div><input name="anecdote" /></div>
        <button type="submit">create</button>
      </form>
    </>
  )
}

export default AnecdoteForm