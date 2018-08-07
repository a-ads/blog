import { createStore as reduxCreateStore } from "redux"

const reducer = (state, action) => {
  if (action.type === `SEARCH_QUERY_CHANGE`) {
    return Object.assign({}, state, {
      search: {
        ...state.search,
        query: action.payload
      }
    })
  }
  return state
}

const initialState = {
  search: {
    query: ''
  } 
}

const createStore = () => reduxCreateStore(reducer, initialState)
export default createStore
