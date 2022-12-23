import { useDispatch, useSelector } from "react-redux"
import { addVoteOf } from "../store/anecdoteStore"
import { showVoteMessage, resetMessage } from "../store/notificationStore"

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotesArray = useSelector(state => state.anecdotes)
  const anecdotes = []
  // eslint-disable-next-line array-callback-return
  anecdotesArray.map(item => {
    anecdotes.push(item)
  })

  const addVote = (id, content) => {
    dispatch(addVoteOf(id))
    dispatch(showVoteMessage(content))
    setTimeout(() => {
      dispatch(resetMessage())
    }, 5000);
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
            <button onClick={() => addVote(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

export default AnecdoteList