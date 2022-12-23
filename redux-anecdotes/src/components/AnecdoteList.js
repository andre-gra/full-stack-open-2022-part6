import { useDispatch, useSelector } from "react-redux"
import { addVoteOf } from "../store/store"

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotesArray = useSelector(state => state.anecdotes)
  const anecdotes = []
  // eslint-disable-next-line array-callback-return
  anecdotesArray.map(item => {
    anecdotes.push(item)
  })

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

export default AnecdoteList