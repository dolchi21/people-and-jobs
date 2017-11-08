import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { HashRouter as Router, Route, Link } from 'react-router-dom'

import { Card } from 'antd'

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
					<div className="c-App">
						<div className="c-Header">
							<HomeLink to="/" md>Home</HomeLink>
						</div>
						<Route exact path={'/'} render={props => {
							return (
								<div className="c-MainLinks">
									<LargeHomeLink to="/people" label="People" />
									<HomeLink to="/jobs" label="Jobs" />
									<HomeLink to="/snapshots" label="Snapshots" />
									<LargeHomeLink to="/jobs" label="Jobs" style={{ gridColumn: '1/3' }} />
									<HomeLink to="/people" label="People" />
									<Card title="People">content</Card>
									<Card title="People">content</Card>
									<Card title="People">content</Card>
									<Card title="People">content</Card>
									<Card title="People" style={{ gridColumn: '2/4' }}>content</Card>
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

var ButtonLink = ({ children, to, style }) => {
	return (
		<Link to={to} style={style}>
			{children}
		</Link>
	)
}
var HomeLink = ({ children, label, md, to, size, style }) => {
	var style = Object.assign({
		height: (md && '3rem') || HomeLink.size2rem(size)
	}, style)
	return (
		<Link to={to} style={style} className="main-btn">
			<span>{label}</span>
		</Link>
	)
}
HomeLink.size2rem = str => {
	switch (str) {
		case 'large': return '6rem'
		//default: return '3rem'
	}
}
var LargeHomeLink = props => <HomeLink size="large" {...props} />

var SnapshotMenu = props => {
	return (
		<div>
			<h4>SnapshotMenu</h4>
			<div>

			</div>
		</div>
	)
}