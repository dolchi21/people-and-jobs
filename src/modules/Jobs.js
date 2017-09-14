export const ADD = 'ADD_JOB'

export default function reducer(state = [], action) {
    var { type, payload } = action
    switch (type) {
        case ADD: {
            return handleAdd(state, payload)
        }
        default: return state
    }
}

function handleAdd(entities, entity) {
    var ids = entities.map(entity => entity.id)
    if (ids.indexOf(entity.id) === -1) return entities.concat(entity)
    return entities.map(p => (p.id === entity.id) ? entity : p)
}

export function add(job) {
    return {
        type: ADD,
        payload: job
    }
}
