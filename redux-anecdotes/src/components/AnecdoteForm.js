import { useDispatch } from "react-redux"
import { addVoteOf } from "../reducers/anecdoteReducer"

const AnecdoteForm = ({ anecdotes }) => {
  const dispatch = useDispatch()

  return (
    <>
      {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => dispatch(addVoteOf(anecdote.id))}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

export default AnecdoteForm