import express from "express"
import { addQuiz, deleteQuiz, deleteUser, getAllQuiz, updateQuiz } from "../Controller/adminQuizController.js";

const adminRoute = express.Router();

adminRoute.get('/', (req, res) => {
    res.send("this is the admint Route Bro................")

})


adminRoute.get('/quiz', getAllQuiz);

adminRoute.post('/quiz', addQuiz);

adminRoute.put('/quiz/:id', updateQuiz);

adminRoute.delete('/quiz/:id', deleteQuiz);

adminRoute.delete('/user/:id', deleteUser);





export default adminRoute;