import styles from '../styles/TodoInput.module.css'

// components
import { useState } from 'react'

const TodoInput = ({ toggleInput, addTodoLocally }) => {

    // states
    const [title, setTitle] = useState('')

    // functions
    const addTodo = async (e) => {
        e.preventDefault()

        const todo = { title }

        const response = await fetch('/api/todo', {
            method: 'POST',
            body: JSON.stringify(todo),
            headers: {
                'Content-type': 'application/json'
            }
        })

        const json = await response.json()

        if (response.ok) {
            addTodoLocally(json)
            setTitle('');
            console.log('new todo added');
        }
    }

    return (
        <form onSubmit={addTodo} className={styles.container}>
            <input
            className={styles.input}
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            autoFocus />

            <button type='button' onClick={toggleInput} className={styles.cnsBtn}>Cancel</button>
            <button type='submit' className={styles.addBtn}>Add todo</button>
        </form>
    )
}

export default TodoInput