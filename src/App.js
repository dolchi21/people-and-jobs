import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { HashRouter as Router, Route, Link } from 'react-router-dom'
import './App.css';

import store from './store'

import PeopleList from './containers/PeopleList'
import PersonProfile from './containers/PersonProfile'

store.$init()
class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Router>
					<div>
						<div>
							<Link to="/">App</Link>
						</div>
						<Route exact path={'/'} render={props => {
							return (
								<div>
									<Link to="/people">People</Link>
								</div>
							)
						}} />
						<Route exact path={'/people'} component={PeopleList} />
						<Route path={'/people/:id'} render={props => {
							var { id } = props.match.params
							return <PersonProfile id={parseInt(id)} />
						}} />
					</div>
				</Router>
			</Provider>
		)
	}
}

export default App;
