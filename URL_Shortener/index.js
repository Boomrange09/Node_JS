const express = require('express');
const urlRoute = require('./routes/url');
const connectMongoDB = require('./connection');
const app = express();
const PORT = 8080;

//Connection
connectMongoDB("mongodb+srv://priyank:MongoDB@users.b4b3a.mongodb.net/short_url?retryWrites=true&w=majority&appName=users")
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log("MongoDB Error", err));

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use("/url", urlRoute);

app.listen(PORT, () => console.log(`Server Started at PORT:${PORT} `));