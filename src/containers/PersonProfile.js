import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import moment from 'moment'

import { getPersonById, getPersonJobsById } from '../selectors'
import * as Actions from '../actions'

class PersonProfile extends React.Component {
    componentWillMount() {
        console.log('PersonProfile.componentWillMount')
        this.props.loadJobs(this.props.ssn)
    }
    render() {
        console.log('PersonProfile.render')
        var { name, ssn, id, jobs } = this.props
        return (
            <div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                        <Link to={'/people/' + id}>{name}</Link>
                    </div>
                    <div>{ssn}</div>
                </div>
                <div>
                    <table className="table">
                        <tbody>
                            {jobs.map(job => (
                                <tr>
                                    <td>{job.name}</td>
                                    <td>{moment(job.start).format('YYYY-MM-DD')}</td>
                                    <td>{job.end && moment(job.end).format('YYYY-MM-DD')}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default connect((state, ownProps) => {
    var person = getPersonById(state, ownProps.id) || {}
    var jobs = getPersonJobsById(state, ownProps.id) || []
    return {
        person,
        name: person.name,
        ssn: person.ssn,
        jobs
    }
}, dispatch => {
    return {
        loadJobs(ssn) {
            dispatch(Actions.loadJobsBySSN(ssn))
        }
    }
})(props => {
    if (!props.ssn) return null
    return <PersonProfile {...props} />
})
