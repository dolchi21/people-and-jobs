import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import * as Actions from './actions'

import people from './modules/People'
import jobs from './modules/Jobs'
import personJobs from './modules/PersonJobs'

const thunk = store => next => action => {
    return typeof action === 'function' ? action(store.dispatch, store.getState) : next(action)
}

var reducer = combineReducers({
    people, jobs, personJobs
})

const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk))

var store = createStore(reducer, {}, enhancer)
store.$init = () => {

    var loadPeople = Actions.loadPeople()
    store.dispatch(loadPeople)
    var loadJobs = Actions.loadJobs()
    store.dispatch(loadJobs)

    return store

}

export default store
