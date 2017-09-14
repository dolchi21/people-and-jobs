import React from 'react'
import { connect } from 'react-redux'

var JobsMenu = props => {
    console.log('JobsMenu.render')
    var { jobs } = props
    return (
        <div>
            <h4>Jobs</h4>
            {jobs.map(job => {
                return <Job id={job.id} />
            })}
        </div>
    )
}
var Job = connect((state, ownProps) => {
    var job = state.jobs.find(j => j.id === ownProps.id)
    return { ...job }
})(props => {
    return (
        <div>{props.id} {props.name}</div>
    )
})

export default connect(state => {
    return {
        jobs: state.jobs || []
    }
})(JobsMenu)
