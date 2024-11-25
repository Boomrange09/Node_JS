const express = require('express');
const fs = require('fs');
const connectMongoDB = require('./connection');
const userRouter = require('./routes/user');
const users = require('./MOCK_DATA.json');

const app = express();
const PORT = 8080;

//Connection
connectMongoDB("mongodb+srv://priyank:MongoDB@users.b4b3a.mongodb.net/Users?retryWrites=true&w=majority&appName=users")
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log("MongoDB Error", err));


app.use(express.urlencoded({extended: false}));

//Routes
app.use("/api/users", userRouter);

app.listen(PORT, () => console.log(`server started at port:${PORT}`));