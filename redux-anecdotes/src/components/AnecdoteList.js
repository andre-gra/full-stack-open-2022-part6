import { useDispatch, useSelector } from "react-redux"
import { addVote } from "../store/store"
import { setVoteNotification } from "../store/store"

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const selector = useSelector(state => state)
  const anecdotes = []
  // eslint-disable-next-line array-callback-return
  selector.anecdotes.map(item => {
    (selector.filters.length > 0) ? (item.content.includes(selector.filters) && anecdotes.push(item)): anecdotes.push(item)
  })

  const addVoteF = (anecdote) => {
    dispatch(addVote(anecdote))
    dispatch(setVoteNotification(anecdote.content, 3))
  }

  return (
    <>
      {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => addVoteF(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

export default AnecdoteList