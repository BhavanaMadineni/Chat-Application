const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const {app, server} = require("../backend/socket/socket");
const authRoutes = require("../backend/routes/auth.routes");
const messageRoutes = require("../backend/routes/message.routes");
const userRoutes = require("../backend/routes/user.routes");
const { connectToMongoDb } = require("./db/connectToMongodb");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 5000;

// const __dirname = path.resolve();

dotenv.config();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.use(express.static(path.join(__dirname,"../frontend/dist")))

app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"../frontend/dist","index.html"))
})

// app.get("/",(req,res)=>{
//     res.send("Hellow world!")
// })


server.listen(PORT ,()=> {
    connectToMongoDb();
    console.log(`Server running at port ${PORT}`)
});