var { createStore, combineReducers, applyMiddleware } = require('redux')
var thunk = require('redux-thunk').default

var middleware = applyMiddleware(thunk)
var reducer = combineReducers({
    jobs: jobsReducer
})

var store = createStore(reducer, {}, middleware)

module.exports = store

function jobsReducer(state = [], action) {
    var { type, payload } = action
    switch (type) {
        case 'SET_JOBS': {
            return [].concat(payload)
        }
        case 'ADD_JOB': {
            var job = state.find(job => job.id === payload.id)
            if (!job) return state.concat(payload)
            return state.map(job => (
                job.id === payload.id ? payload : job
            ))
        }
        default: {
            return state
        }
    }
}