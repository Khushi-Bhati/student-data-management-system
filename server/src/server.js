import express from "express";
import dotenv from "dotenv"
import connectdb from "./db/db.js";
import { app } from "./app.js";





dotenv.config({
    path:"./env"
})


connectdb()
.then(()=>{

    app.listen(process.env.PORT || 8001,()=>{

        console.log(`Server is listen on port:${process.env.PORT}`)

    })

})
.catch((error)=>{
    console.log("Mongodb connection error is",error)

})




