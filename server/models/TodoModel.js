const mongoose=require('mongoose')
const Schema=mongoose.Schema
const Joi=require('joi')

const TodoSchema=new Schema({
    todoId:{type:String},
    userId:{
        type:String,
        ref:'All Users',
        required:true
    },
    description:{
        type:String,
        required:true
    },
    isCompleted:{
        type:Boolean,
        default:false,
        required:true
    },
    date:{
        type:Date,
        default:Date.now,
    }

})
TodoSchema.pre('save', async function (next) {
    if (!this.isNew) {
      return next();
    }
    try {
      const highestTodoIdDocument = await this.constructor.findOne({}, { todoId: 1 }, { sort: { todoId: -1 } });
      let nextTodoId = 1;
      if (highestTodoIdDocument && highestTodoIdDocument.todoId) {
        nextTodoId = parseInt(highestTodoIdDocument.todoId.slice(5,)) + 1;
      }
      const formattedTodoId = nextTodoId.toString().padStart(4, '0');
      this.todoId = 'todo_'+formattedTodoId;
      next();
    } catch (error) {
      next(error);
    }
  });

const validate1=(data)=>{
    const schema=Joi.object({
        userId:Joi.string().required().label("UserId"),
        description:Joi.string().required().label("Description"),
        isCompleted:Joi.boolean().required().label("Is Completed"),
        date:Joi.date().required().label('Date'),
    })
    console.log(schema.validate(data))
    return schema.validate(data)
}


const TodoModel=mongoose.model("All Todos",TodoSchema)
module.exports={TodoModel,validate1}