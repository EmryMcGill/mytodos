import react from 'react'
import styles from '../styles/Main.module.css'

// components
import { useState, useEffect } from 'react'
import { GoPlus } from "react-icons/go"


// my components
import Header from './Header.js'
import TodoCard from './TodoCard.js'
import TodoInput from './TodoInput.js'



const Main = () => {

  // states
  const [todos, setTodos] = useState([])
  const [todoInput, setTodoInput] = useState(false)

  // on mount we fetch the todos from the db
  useEffect(() => {
    const fetchTodos = async () => {
        const response = await fetch('/api/todo')
        const json = await response.json()

        if (response.ok) {
          setTodos(json)
        }
    }

    fetchTodos()
}, [])

  // my functions
  const toggleTodoInput = () => {
    setTodoInput(!todoInput)
  }

  const addTodoLocally = (todo) => {
    setTodos([...todos, todo])
  } 

  const deleteTodoLocally = (todo) => {
    setTodos(todos.filter((t) => !(t._id == todo._id)))
  }


  return (
      <div className={styles.container}>
      
        <Header />

        <div className={styles.contentContainer}>
          <div className={styles.todoContainer}>
            <div className={styles.addTodoContainer}>
              {todoInput ?
                <TodoInput 
                toggleInput={toggleTodoInput}
                addTodoLocally={addTodoLocally} />
                :
                <div onClick={toggleTodoInput} className={styles.addTodoBtn}>
                  <GoPlus className={styles.addTodoBtnIcon} />
                  <div>Add todo</div>
                </div>
              }
            </div>
            
            { todos.length ?
            <div></div>
            :
            <div className={styles.mssg}>Add some Todos!</div>
            }

            {todos && todos.map((todo) => (
              <TodoCard 
              key={todo._id} 
              todo={todo}
              deleteTodoLocally={deleteTodoLocally} />
            ))}
          </div>
        </div>
    </div>    
  );
}
  
export default Main;