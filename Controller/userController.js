import UserModel from "../Models/userModel.js";
import bcrypt, { genSalt } from 'bcrypt';


// register user 

export const registerUser = async(req, res) => {
           
            const salt = await bcrypt.genSalt(10);
            const HashedPass = await bcrypt.hash(req.body.password, salt);
             req.body.password = HashedPass;
            const newUser = new UserModel(req.body)
            const {username} = req.body;

    try {
        const oldUser = await UserModel.findOne({username:username})

        if(oldUser){
            res.status(403).json("User is Already Exists...")
        }
        else{
            const user = await newUser.save();
            const {password, ...otherDetials} = user._doc;
            res.status(200).json(otherDetials );
        }



        
    } catch (error) {
        console.log(error);
    }
};


// for user login 

export const userLogin = async(req, res) => {

    const {username} = req.body;


    try {
        const user = await UserModel.findOne({username:username})
        if(!user){
            res.status(404).json("This username is Not Exists...")
        }else{
            const isMatchPass = await bcrypt.compare(req.body.password, user.password);

            if(isMatchPass){
                const {password, ...otherDetials} = user._doc;
                res.status(200).json(otherDetials);
            }
            else{
                res.status(404).json("password is not match.. Please input a Write Password.")
            }

        }

        
    } catch (error) {
        console.log(error);
    }
}


// update user 

export const updateUser = async(req, res) => {

    const id = req.params.id;
    const { _id, password} = req.body;

    if (id===_id) {

        if(password){
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(password, salt);

        }


        try {
            const updateUser = await UserModel.findByIdAndUpdate(id, req.body, {new:true});
            res.status(200).json(updateUser)

        
        } catch (error) {
            console.log(error);
        }
        
    } else {
        res.status(403).json("your are not able to update this account firstly singin")
        
    }

    
};



// delete user 

export const deleteUser = async(req, res) => {
    const id = req.params.id;
    const {_id} = req.body;

    if(id === _id){

        try {
            const user = await UserModel.findByIdAndDelete(id);
            res.status(200).json("Accout Deleted successfully")
            
        } catch (error) {
            console.log(error);
        }

    }else{
        res.status(403).json("account has not deleted")
    }
};



// get alluser 

export const getAllUsers = async(req, res) => {

    try {
        let users = await UserModel.find();
        users = users.map((user) => {
            const {password, ...otherDetials} = user._doc;
            return otherDetials;
        })

        res.status(200).json(users.sort((a, b)=>{
            return new Date(b.updatedAt) - new Date(a.createdAt)
        }));
        
    } catch (error) {
        console.log(error);
    }
};

// get user 

export const getUser = async(req, res) => {
    const id = req.params.id;

    try {
        let user = await UserModel.findById(id);
        
        if(user){
            const  { password, ...otherDetials} = user._doc;
            res.status(200).json(otherDetials);

        }else{
            res.status(400).json("no such a user..")
        }
            
        } catch (error) {
        console.log(error);
    }
}
