export const ADD = 'ADD_PERSON'

export default function reducer(state = [], action) {
    var { type, payload } = action
    switch (type) {
        case ADD: {
            return handleAdd(state, payload)
        }
        default: return state
    }
}

function handleAdd(people, person) {
    var ids = people.map(person => person.id)
    if (ids.indexOf(person.id) === -1) return people.concat(person)
    return people.map(p => (p.id === person.id) ? person : p)
}

export function add(person) {
    return {
        type: ADD,
        payload: person
    }
}
