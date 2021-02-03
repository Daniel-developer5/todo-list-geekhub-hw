import React, { useState } from 'react'

import { connect } from 'react-redux'
import { addTodo } from '../redux/todosSlice'

const Form = ({ addTodo }) => {
    const [ text, setText ] = useState('')

    const onSubmit = e => {
        e.preventDefault()

        if (text.trim()) addTodo(text)

        setText('')
    }

    const changeText = e => setText(e.target.value)

    return (
        <form onSubmit={onSubmit}>
            <input 
                className="new-todo" 
                placeholder="What needs to be done?"
                value={text}
                onChange={changeText} 
                autoFocus 
            />
        </form>
    )
}

const mapDispatchToProps = { addTodo, }

export default connect(null, mapDispatchToProps)(Form)