const express = require('express');
const fs = require('fs');
const mongoose = require('mongoose');
const users = require('./MOCK_DATA.json');

const app = express();
const PORT = 8080;

//Connection
mongoose.connect("mongodb+srv://priyank:MongoDB@users.b4b3a.mongodb.net/Users?retryWrites=true&w=majority&appName=users")
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log("MongoDB Error", err));

//Schema
const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name:{
        type: String,
    },
    job_title:{
        type: String,
    },
    gender:{
        type: String,
    },
    email:{
        type: String,
        required: true,
        unique: true
    }
},{timestamps: true});

//Model
const User = mongoose.model("Users", userSchema);

app.use(express.urlencoded({extended: false}));
//Routes
app.get('/users', async (req,res) => {
    const allDBUsers = await User.find({});
    const html = `
    <ul>
        ${allDBUsers.map((user) => `<li>${user.first_name}</li>`).join('')}
    </ul>
    `
    return res.send(html);
});

app.route('/api/users').get( async (req,res) => {
    const allDBUsers = await User.find({});
    return res.json(allDBUsers);
}).post( async (req,res) => {
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
});

app.route('/api/users/:id').get(async (req,res) => {
    const user = await User.findById(req.params.id);
    return res.json(user);
}).patch(async (req,res) => {
    const body = req.body;
    try {
        await User.findByIdAndUpdate(req.params.id, body);
        return res.status(200).json({msg: "Success...!!!"});
    } catch (error) {
        console.error('Error Updating Document:', error);
        return res.status(404).json({msg: "Error...!!!"});
    }
}).delete(async (req,res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        return res.status(200).json({msg: "Success...!!!"});
    } catch (error) {
        console.error('Error Updating Document:', error);
        return res.status(404).json({msg: "Error...!!!"});
    }
});

app.listen(PORT, () => console.log(`server started at port:${PORT}`));