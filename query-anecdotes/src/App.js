import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getAnecdotes, updateAnecdote, createAnecdote } from './service/requests'
import { useContext } from 'react'
import NotificationContext from './context/NotificationContext'

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

const App = () => {
  const [notification, notificationDispatch] = useContext(NotificationContext)
  const queryClient = useQueryClient()
  const updateNoteMutation = useMutation(updateAnecdote, {
    onSuccess: (data) => {
      queryClient.invalidateQueries('anecdotes')
      notificationDispatch({ type: 'NEW', payload: data.content })
      setTimeout(() => {
        notificationDispatch({ type: 'RESET' })
      }, 5000);
    },
  })
  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (data) => {
      queryClient.invalidateQueries('anecdotes')
      notificationDispatch({ type: 'NEW', payload: data.content })
      setTimeout(() => {
        notificationDispatch({ type: 'RESET' })
      }, 5000);
    },
    onError: (data) => {
      notificationDispatch({ type: 'SHORT', payload: data.response.data.error })
      setTimeout(() => {
        notificationDispatch({ type: 'RESET' })
      }, 5000);      
    }
  })

  const result = useQuery(
    'anecdotes',
    getAnecdotes,
    {
      retry: false
    }
  )
  console.log(result)

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  if (result.isError) {
    return <span>Error: {result.error.message}</span>
  }

  const anecdotes = result.data

  const handleVote = (anecdote) => {
    updateNoteMutation.mutate(anecdote)
  }

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification message={notification !== null ? notification : null} />
      <AnecdoteForm onCreate={onCreate} />

      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
