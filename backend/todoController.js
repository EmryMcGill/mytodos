const Todo = require('./todoModel')
const mongoose = require('mongoose')


// get all todos
const getTodos = async (req, res) => {
    // find all todos from db
    const todos = await Todo.find({}).sort({createdAt: 1})
    // send them as json in the response
    res.status(200).json(todos)
}

// get single todo
const getTodo = async (req, res) => {
    // get the id from the request params
    const { id } = req.params

    // validate id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "no such workout"})
    }

    // find the target in the db
    const todo = await Todo.findById(id)

    // if not found respond with error
    if (!todo) {
        return res.status(404).json({error: 'todo not found'})
    } 
    // send it as json in the response
    res.status(200).json(todo)
}

// post new todo
const postTodo = async (req, res) => {
    // get the title from the request
    const title = req.body.title
    // try to create a new todo doc using the todo model
    try {
        const todo = await Todo.create({title})
        res.status(200).json(todo)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// delete todo
const deleteTodo = async (req, res) => {
    // get id from request parameters
    const { id } = req.params

    console.log("deleting api");

    //validate id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "todo not found"})
    }

    // find doc to delete
    const todo = await Todo.findOneAndDelete({ _id: id })

    if (!todo) {
        // todo not found so return error response
        return res.status(404).json({error: "todo not found"})
    }

    // return deleted todo
    res.status(200).json(todo)
}

// update todo
const updateTodo = async (req, res) => {
    // get id from request parameters
    const { id } = req.params

    //validate id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "todo not found"})
    }

    // find doc to update
    const todo = await Todo.findOneAndUpdate({ _id: id }, {
        ...req.body
    })

    if (!todo) {
        // todo not found so return error response
        return res.status(404).json({error: "todo not found"})
    }

    // return updated todo
    res.status(200).json(todo)
}


// export functions

module.exports = {
    getTodos,
    getTodo,
    postTodo,
    deleteTodo,
    updateTodo
}