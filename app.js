const express=require('express')
const app=express()
const PORT = 3000

app.use(express.json());

app.get("/about",(req,res)=>{
    const {name,age}=req.query
    console.log(name,age);

    res.send("hello world")
})

app.get("*",(req,res)=>{
    res.status(404).send("invalid page");
})

mongoose.connect("mongodb://127.0.0.1:27017/BATCH_11:30").then(()=>{
    console.log("database connected");
    app.listen(PORT,()=>{
        console.log(`sever stareted at http://localhost:${PORT}`);
    })
}).catch((error)=>{
    console.log(error);
})