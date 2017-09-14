import axios from 'axios'
import * as Jobs from '../modules/Jobs'
import * as PersonJobs from '../modules/PersonJobs'

export var loadPeople = require('./people').loadPeople
export function loadJobs() {
    return dispatch => {
        return axios.get('/api/jobs/').then(response => response.data.data).then(jobs => {
            var actions = jobs.map(job => Jobs.add(job))
            actions.map(dispatch)
        })
    }
}
export function loadJobsBySSN(ssn) {
    return dispatch => {
        return axios.get('/api/people/' + ssn + '/jobs').then(response => response.data.data).then(jobs => {
            return jobs.map(job => {
                return Object.assign(job, {
                    personId: job.PersonId
                })
            })
        }).then(jobs => {
            var actions = jobs.map(job => PersonJobs.add(job))
            actions.map(dispatch)
        })
    }
}