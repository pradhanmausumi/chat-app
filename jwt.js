const express=require('express');
const app=express();
const jwt=require('jsonwebtoken');
const secretkey="secretkey" //hidden

app.get("/",(req,resp)=>{
resp.json({
message:"a simple api"

})

});

app.post("/login",(req,resp)=>{
    const user={
        id:1,
        username:"anil",
        email:"abc@test.com"
    }
    jwt.sign({user},secretkey,{expiresIn:'600s'},(err,token)=>{
        resp.json({token})
    })
})


app.post("/profile",verifyToken,(req,resp)=>{  //jab profile api hit karenga
jwt.verify(req.token,secretkey,(err,authData)=>{
    if(err){
        resp.send({result:"invalid token"})
    }else{
        resp.json({message:"profile acesed", authData})
    }
     
})
})

function verifyToken(req,resp,next) {   //jab dubra token wapas ayega use verify karne ke liye //next middleware
    const bearerHeader=req.headers['authorization'];  //jese hi profile api se token ko request send karoge token ko verify karne ke
    if(typeof bearerHeader !=='undefined'){
const bearer=bearerHeader.split("");  //space ke basis me spli karege
const token=bearer[1];//o index me bearer likha he 1st index me token he
req.token=token;
next()//next function verify token ka control profile ko de dega
    }else{
        resp.send({result:"token invalid"})
    }
}  //profile access karne ke liye
app.listen(5000,()=>{
    console.log("app is running")
})