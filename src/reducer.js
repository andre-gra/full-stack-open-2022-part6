const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD': {
      const changedCounterGood = {
        good: state.good + 1,
        ok: state.ok,
        bad: state.bad 
      }
      return changedCounterGood
    }
    case 'OK':
      const changedCounterOk = {
        good: state.good,
        ok: state.ok + 1,
        bad: state.bad 
      }
      return changedCounterOk
    case 'BAD':
      const changedCounterBad = {
        good: state.good,
        ok: state.ok,
        bad: state.bad + 1 
      }
      return changedCounterBad
    case 'ZERO':
      const changedCounterZero = {
        good: 0,
        ok: 0,
        bad: 0 
      }
      return changedCounterZero
    default: return state
  }
  
}

export default counterReducer