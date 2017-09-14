import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { HashRouter as Router, Route, Link } from 'react-router-dom'
import './App.css';

import store from './store'

import JobsMenu from './containers/JobsMenu'
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
							<Link to="/">Home</Link>
						</div>
						<Route exact path={'/'} render={props => {
							return (
								<div style={{ display: 'flex', justifyContent: 'space-around', paddingTop: '30vh' }}>
									<div className="main-btn">
										<Link to="/people">
											<button>People</button>
										</Link>
									</div>
									<div className="main-btn">
										<Link to="/jobs">
											<button>Jobs</button>
										</Link>
									</div>
									<div className="main-btn">
										<Link to="/snapshots">
											<button>Snapshots</button>
										</Link>
									</div>
								</div>
							)
						}} />
						<Route exact path={'/people'} component={PeopleList} />
						<Route path={'/people/:id'} render={props => {
							var { id } = props.match.params
							return <PersonProfile id={+id} />
						}} />
						<Route exact path="/jobs" component={JobsMenu} />
						<Route path="/snapshots" component={SnapshotMenu} />
					</div>
				</Router>
			</Provider>
		)
	}
}

export default App;

var SnapshotMenu = props => {
	return (
		<div>
			<h4>SnapshotMenu</h4>
			<div>

			</div>
		</div>
	)
}