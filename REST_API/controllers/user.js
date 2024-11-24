const User = require('../models/user');

async function handleGetAllUsers(req,res) {
    const allDBUsers = await User.find({});
    return res.json(allDBUsers);
}

async function handleCreateUser(req,res){
    const body = req.body;
    if(
        !body ||
        !body.first_name ||
        !body.email
    ){
        return res.status(400).json({msg: "All manadotry filed should have some value...!!!"});
    }

    try {
        const result = await User.create({
            first_name: body.first_name,
            last_name: body.last_name,
            gender: body.gender,
            email: body.email,
            job_title: body.job_title
        });
        return res.status(200).json({msg: "Success...!!!"});
    } catch (error) {
        console.error('Error inserting document:', error);
        return res.status(404).json({msg: "Error...!!!"});
    }   
}

async function handleGetUser(req,res){
    const user = await User.findById(req.params.id);
    return res.json(user);
}

async function handleUpdateUser(req,res){
    const body = req.body;
    try {
        await User.findByIdAndUpdate(req.params.id, body);
        return res.status(200).json({msg: "Success...!!!"});
    } catch (error) {
        console.error('Error Updating Document:', error);
        return res.status(404).json({msg: "Error...!!!"});
    }
}

async function handleDeleteUser(req,res){
    try {
        await User.findByIdAndDelete(req.params.id);
        return res.status(200).json({msg: "Success...!!!"});
    } catch (error) {
        console.error('Error Updating Document:', error);
        return res.status(404).json({msg: "Error...!!!"});
    }
}

module.exports = {
    handleGetAllUsers,
    handleCreateUser,
    handleGetUser,
    handleUpdateUser,
    handleDeleteUser
};