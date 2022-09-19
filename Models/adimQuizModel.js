import mongoose from "mongoose";

const QuizSchema = mongoose.Schema({
    subject:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    question:{
        type:String,
        required:true
    },
    option1:{
        type:String,
        required:true
    },
    option2:{
        type:String,
        required:true
    },
    option3:{
        type:String,
        required:true
    },
    option4:{
        type:String,
        required:true
    },
    answer:{
        type:String,
        required:true
    },
    
},
    {timestamps:true}

);

const QuizModel = mongoose.model("quizQues", QuizSchema);

export default QuizModel ;