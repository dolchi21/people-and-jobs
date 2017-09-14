import React from 'react'
import { connect } from 'react-redux'

import Person from './Person'

var PeopleList = props => {
    console.log('PeopleList.render')
    var people = props.people
    return (
        <div>
            <div>Home</div>
            {people.map(person => {
                return <Person key={person.ssn} id={person.id} />
            })}
        </div>
    )
}

export default connect(state => {
    return {
        people: state.people || []
    }
})(PeopleList)
