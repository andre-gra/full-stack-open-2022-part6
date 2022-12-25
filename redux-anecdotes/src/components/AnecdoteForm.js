import { useDispatch } from "react-redux"
import { createAnecdote } from "../store/store"
import { showCreateMessage, resetMessage } from "../store/store"

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const createNew = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))
    dispatch(showCreateMessage(content))
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