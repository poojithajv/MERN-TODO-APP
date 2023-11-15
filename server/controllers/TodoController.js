const asyncHandler = require("express-async-handler");
const {TodoModel,validate1}=require('../models/TodoModel')
const Joi = require("joi"); // Import Joi

const createTodo=asyncHandler(async (req, res)=>{
    try{
        const {error}=validate1(req.body)
        console.log(error)
        if (error){
            return res.status(400).send({message:error.details[0].message})
        }
       const todo= await new TodoModel(req.body).save()
    // Send a success response
        return res.status(201).send({ message: 'Todo created successfully', todo });
    }catch(error){
        console.log(error)
        return res.status(500).send({message:'Internal Server Error'})
    }
})

const getAllTodos=asyncHandler(async(req,res)=>{
    try{
        const {userId}=req.params
        console.log(userId)
        const todos = await TodoModel.find({userId});
        if (!todos || todos.length===0) {
            res.status(404).send({message:"todos not found"})
            return 
        }
            res.status(200).json(todos);
                return 
    }catch(error){
        console.log(error)
        return res.status(500).send({message:'Internal Server Error'})
    }
})

const getTodoOfUser=asyncHandler(async(req,res)=>{
    try{
        const {userId,todoId}=req.params
        console.log(userId)
        const todo = await TodoModel.find({userId,todoId});
        if (!todo ) {
            res.status(404).send({message:"tods not found"})
            return 
        }
            res.status(200).json(todo);
            return 
    }catch(error){
        console.log(error)
        return res.status(500).send({message:'Internal Server Error'})
    }
})

const markTodo=asyncHandler(async(req,res)=>{
    try{
        const {todoId}=req.params
        const todo = await TodoModel.findOne({todoId});
        if (!todo) {
            res.status(404).send({message:"todo not found"})
            return 
        }
        const updatedTodo = await TodoModel.findOneAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        return res.status(200).json({message:'todo updated successfully',updatedTodo})
    }catch(error){
        console.log(error)
        return res.status(500).send({message:'Internal Server Error'})
    }
})
const deleteTodo=asyncHandler(async(req,res)=>{
    try{
        const {todoId}=req.params
        const todo = await TodoModel.findOne({todoId});
        if (!todo) {
            res.status(404).send({message:"todo not found"})
            return 
        }
        await TodoModel.deleteOne({ todoId: req.params.todoId });
        return res.status(200).json({message:"Todo Deleted successfully"});
    }catch(error){
        console.log(error)
        return res.status(500).send({message:'Internal Server Error'})
    }
})
module.exports={createTodo,getAllTodos,markTodo,deleteTodo,getTodoOfUser}