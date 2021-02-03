import React from 'react'

import { connect } from 'react-redux'
import TodoItem from './TodoItem'
import { 
	markAsComplete, removeTodo, editTodo, 
	startEditing, endEditing,
} from '../redux/todosSlice'
import EmptyBlock from './EmptyBlock'
import ToggleAll from './ToggleAll'

const TodoList = ({ 
	todos, markAsComplete, removeTodo,
	editTodo, startEditing, endEditing
}) => {
    return (
        <section className="main">
			<ToggleAll />
			<ul className="todo-list">
				{ !todos.length && <EmptyBlock /> }
				{ todos.map(({ id, ...todo }) => (
					<TodoItem 
						key={id} {...todo}
						markAsComplete={() => markAsComplete(id)}
						removeTodo={() => removeTodo(id)}
						editTodo={text => editTodo({ id, text })}
						startEditing={() => startEditing(id)}
						endEditing={() => endEditing(id)}
					/>
				))}
			</ul>
		</section>
    )
}

const mapDispatchToProps = { 
	markAsComplete, removeTodo, editTodo,
	startEditing, endEditing,
}

export default connect(null, mapDispatchToProps)(TodoList)