import React from 'react'

import { connect } from 'react-redux'
import { toggleAll } from '../redux/todosSlice'

const ToggleAll = ({ toggleAll, todos }) => {
    const checked = todos.every(({ completed }) => completed)

    return <>
        <input 
            id="toggle-all" 
            className="toggle-all" 
            type="checkbox" 
            onChange={() => toggleAll()}
            checked={todos.length ? checked : false}
        />
		<label htmlFor="toggle-all">Mark all as complete</label>
    </>
}

const mapStateToProps = ({ todos }) => ({ todos, })

const mapDispatchToProps = { toggleAll, }

export default connect(mapStateToProps, mapDispatchToProps)(ToggleAll)