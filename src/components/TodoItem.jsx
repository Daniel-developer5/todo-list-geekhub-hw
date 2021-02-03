import React from 'react'

const TodoItem = ({ 
	text, completed, markAsComplete,
	removeTodo, editTodo, editing,
	startEditing, newText, endEditing
}) => {
	const doubleClick = e => {
		if (e.target.className !== 'toggle') {
			startEditing()
		}
	}

	const updateText = e => {
		e.preventDefault()
		endEditing()
	}

	const editText = e => editTodo(e.target.value)

	return (
		<li 
			className={`
				${completed ? 'completed' : ''}
				${editing ? 'editing' : ''}
			`}
			onDoubleClick={doubleClick}
		>
			<div className="view">
				<input 
					className="toggle" 
					type="checkbox"
					checked={completed}
					onChange={markAsComplete}
				/>
				<label>{text}</label>
				<button className="destroy" onClick={removeTodo}></button>
			</div>
			<form onSubmit={updateText}>
				<input 
					className="edit" value={newText || ''} 
					onChange={editText}
				/>
			</form>
		</li>
    )
}

export default TodoItem