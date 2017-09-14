import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

var Person = props => {
    console.log('Person.render')
    var person = props.person
    if (!person) return null
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
                <Link to={'/people/' + person.id}>{person.name}</Link>
            </div>
            <div>{person.ssn}</div>
        </div>
    )
}

export default connect((state, ownProps) => {
    return {
        person: state.people.find(p => {
            return p.id === ownProps.id
        })
    }
})(Person)
