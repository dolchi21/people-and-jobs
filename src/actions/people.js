import axios from 'axios'

import * as People from '../modules/People'

export function loadPeople() {
    return dispatch => {
        return axios.get('/api/people/').then(response => response.data.data).then(people => {
            var actions = people.map(person => People.add(person))
            actions.map(dispatch)
        })
    }
}