const PORT=3000;
const http=require("http");
const fs=require("fs");
const url=require("url");
const { log, error } = require("console");
const queryString=require("querystring");
const {MongoClient, ObjectId}=require("mongodb");
const client=new MongoClient("mongodb://127.0.0.1:27017/");
const app=http.createServer(async(req,res)=>{
    const db=client.db("students");
    const collection=db.collection("stdntdetails");
    const path=url.parse(req.url);
    console.log(path);
    if (path.pathname=="/")
    {
        res.writeHead(200,{"Content-Type":"text/html"});
        res.end(fs.readFileSync("../CLIENTSIDE/index.html"));
    }
    else if (path.pathname=="/css/style.css")
        {
            res.writeHead(200,{"Content-Type":"text/css"});
            res.end(fs.readFileSync("../CLIENTSIDE/css/style.css"));
        }
    else if (path.pathname=="/js/main.js")
         {
                res.writeHead(200,{"Content-Type":"text/js"});
                res.end(fs.readFileSync("../CLIENTSIDE/js/main.js"));
        }
    else if (path.pathname=="/add")
            {
                   res.writeHead(200,{"Content-Type":"text/html"});
                   res.end(fs.readFileSync("../CLIENTSIDE/pages/cart.html"));
           }
           else if (path.pathname=="/css/style.css")
            {
                res.writeHead(200,{"Content-Type":"text/css"});
                res.end(fs.readFileSync("../CLIENTSIDE/css/style.css"));
            }
            else if (path.pathname=="/js/add.js")
                {
                       res.writeHead(200,{"Content-Type":"text/js"});
                       res.end(fs.readFileSync("../CLIENTSIDE/js/add.js"));
               }
            console.log(req.method);
if (req.method =="POST" && path.pathname=="/submit")
        {
               let body="";
               req.on("data",(chunks)=>{
                console.log(chunks);
                body+=chunks.toString();
                console.log(body);
               });
            req.on("end",async()=>{
                if(body!=null)
                {
                    const formData=queryString.parse(body);
                    console.log(formData);
                    collection.insertOne(formData).then(() => {
                        console.log("success");
                      }).catch((error) => {
                        console.log(error);
                      });
                }
            });
            res.writeHead(200,{"Content-Type":"text/html"});
        res.end(fs.readFileSync("../CLIENTSIDE/index.html"));
        }
      if(path.pathname=="/getdata"&& req.method=="GET")
        {
            const data=await collection.find().toArray();
            const maindata=JSON.stringify(data);
            res.writeHead(200,{"Content-Type":"text/json"});
        res.end(maindata);
            
        }
        if(path.pathname=="/delete" && req.method=="DELETE"){
            console.log("reached delete route");
            let body="";
            req.on("data",(chunks)=>{
                body+=chunks.toString();
                console.log(body);
            })
            req.on("end",async()=>{
                let _id=new ObjectId(body);
                console.log(_id);
                collection.deleteOne({_id}).then(()=>{
                    res.writeHead(200,{"Content-Type":"text/plain"});
                    res.end("success")
                }).catch(()=>{
                    res.writeHead(200,{"Content-Type":"text/plain"});
                    res.end("fail")
                })
            })
        }
        if(req.method=="PUT" && path.pathname=="/update"){
            console.log("reached to update route");
            let body="";
            req.on("data",(chunks)=>{
                body+=chunks.toString();
                console.log(body);
            });
            req.on("end",async()=>{
                let data=JSON.parse(body)
                console.log(data);
                let _id=new ObjectId(data.id);
                let updateData={
                    name:data.name,
                    email:data.email,
                    phone:data.pno,
                    bgrop:data.bgrp,
                    gender:data.gender
                }
                await collection.updateOne({_id},{$set:updateData}).then(()=>{
                    res.writeHead(200,{"Content-Type":"text/plain"});
                    res.end("success");
                }).catch(()=>{
                    res.writeHead(400,{"Content-Type":"text/plain"});
                    res.end("fail");
                })
            });
        }
});
client.connect().then(()=>{
    console.log("database connected");
    app.listen(PORT,()=>{
        console.log(`http://localhost:${PORT}`);
        
    });
}).catch((error)=>{console.log(error);
})