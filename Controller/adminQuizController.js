import QuizModel from '../Models/adimQuizModel.js';
import UserModel from '../Models/userModel.js';


// special case for admin Delete the user ---

export const deleteUser = async(req, res) => {

    const id = req.params.id;

    try {
        const user = await UserModel.findById(id);
        
        if(user){
            await UserModel.findByIdAndDelete(id);
            res.status(200).json("user Deleted successfully")
        }
        else{
            res.status(404).json("user not Found")
        }
        
    } catch (error) {
        console.log(error);
    }

}

// getAll quiz

export const getAllQuiz = async(req, res) => {

    try {
        const allQuiz = await QuizModel.find();
        res.status(200).json(allQuiz.sort((a, b) => {
            return new Date (b.updatedAt) - new Date (a.updatedAt);
        }));
        
    } catch (error) {
        console.log(error);
    }
}


// Add the Quiz

export const addQuiz = async(req, res) => {
    
    // const {quiz} = req.body;

    try {
        const quiz = new  QuizModel(req.body);
        const addQuiz = await quiz.save();
        res.status(201).json(addQuiz);
        
    } catch (error) {
        console.log(error);
    }

}

// update the quiz 

export const updateQuiz = async(req, res) => {

    const id = req.params.id;


    try {
        const quiz = await QuizModel.findById(id);

        if(quiz){
            const updatedQuiz = await QuizModel.findByIdAndUpdate(id, req.body, {new:true}) ;

            res.status(201).json(updatedQuiz);


        }
        else{
            res.status(404).json("quiz not found .!")
        }

        
    } catch (error) {
        console.log(error);
    }
};


// for the Deleting of Quizes 

export const deleteQuiz = async(req, res) =>{
    const id = req.params.id;

    try {
        const quiz = await QuizModel.findByIdAndDelete(id);

        res.status(200).json("quiz deleted successfully")
        
    } catch (error) {
        console.log(error);
    }
};