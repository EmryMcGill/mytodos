import styles from '../styles/TodoCard.module.css'

import { useState } from 'react';

// components
import { GoCheckCircle } from "react-icons/go";
import { IoTrashOutline } from "react-icons/io5";

const TodoCard = ({ todo, deleteTodoLocally }) => {

    const [checkHover, setCheckHover] = useState(false);

    const toggleCheckHover = () => {
        setCheckHover(!checkHover);
    }

    const handleDelete = async () => {
        const response = await fetch('/api/todo/' + todo._id, {
            method: 'DELETE',
        })

        const json = await response.json()

        if (response.ok) {
            deleteTodoLocally(json);
            console.log('todo deleted');
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.leftContainer}>
                <button 
                className={styles.checkBtn}
                onClick={handleDelete}>
                    <div className={styles.checkBox}></div>
                </button>
                <div className={styles.title}>{todo.title}</div>
            </div>
            
            <button className={styles.delBtn} onClick={handleDelete}>
                <IoTrashOutline />
            </button>
        </div>
    )
}

export default TodoCard