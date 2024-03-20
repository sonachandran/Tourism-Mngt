const express=require('express')
const app=express()
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/Tourism')
    .then(() => console.log('database connected'))

const cors = require('cors');
app.use(express.json())
app.use(cors())
const bcrypt=require('bcrypt')
const User=require('./Models/User')

app.post('/insert',async(req,res)=>{


})
app.listen(7000,()=>{
   console.log('connected');
})