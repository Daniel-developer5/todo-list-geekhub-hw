import React from 'react'

import Form from './components/Form'
import TodoList from './components/TodoList'
import Footer from './components/Footer'
import { connect } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import './App.scss'

const App = ({ filterBy, todos, }) => {
	let todosToRender = []

	if (filterBy === 'ALL') {
		todosToRender = todos
	} else if (filterBy === 'ACTIVE') {
		todosToRender = todos.filter(({ completed }) => !completed)
	} else {
		todosToRender = todos.filter(({ completed }) => completed)
	}

	return (
		<BrowserRouter>
			<section className="todoapp">
				<header className="header">
					<h1>todos</h1>
					<Form />
				</header>
				<Switch>
					<Route
						path="/" exact
						render={() => <TodoList todos={todosToRender} />}
					/>
					<Route path="/active" render={() => <TodoList todos={todosToRender} />} />
					<Route path="/completed" render={() => <TodoList todos={todosToRender} />} />
				</Switch>
				<Footer />
			</section>
		</BrowserRouter>
	)
}

const mapStateToProps = ({ filterBy, todos }) => ({ filterBy, todos, })

export default connect(mapStateToProps, null)(App)