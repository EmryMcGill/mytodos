const express = require('express')
const {
    getTodos,
    getTodo,
    postTodo,
    deleteTodo,
    updateTodo
} = require('./todoController')


// create a router 
const router = express.Router()

// GET all todos
router.get('/', getTodos)

// GET single todo
router.get('/:id', getTodo)

// POST a new todo
router.post('/', postTodo)

// DELETE a todo
router.delete('/:id', deleteTodo)

// UPDATE a todo
router.patch('/:id', updateTodo)

// export the router so the app can you it 
module.exports = router