const express = require("express");
const userRouter = require("./route/userRoutes");
const noteRouter = require("./route/noteRoutes");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());

app.use((req, res,next)=>{
    console.log("HTTP Method - "  +req.method + " , URL - " +req.url);
    next();
});

app.use("/users", userRouter);
app.use("/notes", noteRouter)

app.get("/", (req, res)=>{
    res.send("hello");
});

mongoose.connect("mongodb+srv://admin:admin@cluster0.qmglfej.mongodb.net/?retryWrites=true&w=majority")
.then(()=> {
     app.listen(5000, () => {
    console.log("Server started on port 5000!");
   });
})
.catch((error)=>{
    console.log(error);
});

