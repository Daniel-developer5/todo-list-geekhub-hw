import React from 'react'

import { connect } from 'react-redux'
import { 
    todosAll, todosActive, todosCompleted,
    ALL, ACTIVE, COMPLETED, clearCompleted 
} from '../redux/todosSlice'
import { Link } from 'react-router-dom'

const Footer = ({ 
    todos, todosAll, todosActive, 
    todosCompleted, filterBy, clearCompleted
}) => {
    const itemLeft = todos.filter(({ completed }) => !completed).length
    
    return (
        <footer className="footer">
            <span className="todo-count"><strong>{itemLeft}</strong> item left</span>
            <ul className="filters">
                <li>
                    <Link
                        className={`${filterBy === ALL ? 'selected' : ''}`}
                        to="/"
                        onClick={() => todosAll()}
                    >All</Link>
                </li>
                <li>
                    <Link
                        className={`${filterBy === ACTIVE ? 'selected' : ''}`} 
                        to="/active"
                        onClick={() => todosActive()}
                    >Active</Link>
                </li>
                <li>
                    <Link
                        className={`${filterBy === COMPLETED ? 'selected' : ''}`} 
                        to="/completed"
                        onClick={() => todosCompleted()}
                    >Completed</Link>
                </li>
            </ul>
            <button 
                className="clear-completed"
                onClick={() => clearCompleted()}
            >Clear completed</button>
        </footer>
    )
}

const mapStateToProps = ({ todos, filterBy }) => ({ todos, filterBy, })

const mapDispatchToProps = {
    todosAll, todosActive, 
    todosCompleted, clearCompleted
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer)