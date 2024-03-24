const express = require('express')
const app = express()
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/Tourism')
  .then(() => console.log('database connected'))

const cors = require('cors');
app.use(express.json())
app.use(cors())
const bcrypt = require('bcrypt')
const User = require('./Models/User')
const Booking=require('./Models/Customer')
const saltrounds = 10;
const jwt = require('jsonwebtoken')

app.post('/insert', async (req, res) => {
  try {
    let hashpassword = await bcrypt.hash(req.body.password, saltrounds)
    console.log(hashpassword);
    let newuserr = new User({ ...req.body, password: hashpassword })
    console.log(newuserr);
    let response = await newuserr.save()
    console.log(response);
    res.json(response)
  }
  catch (error) {
    console.log('error', error);
  }

})

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email })
    console.log('userrr', user);
    if (!user) {                  
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    
    const token = jwt.sign({ id: user.id, username: user.username }, 'abc');
    console.log(token);
    res.json({user,token });

  }
  catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error' });
  }
})

app.post('/booking',async(req,res)=>{
  try{
     const booking=new Booking({...req.body})
     console.log("booking",booking);
     let response=await booking.save()
     res.json(response)
  }
  catch(error){
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error' });
  }
})


app.get('/viewprofile/:userid', async (req, res) => {
  try {
      const userId = req.params.userid;
      const user = await User.findById(userId);
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
  } catch (error) {
      console.error('Error fetching profile:', error);
      res.status(500).json({ error: 'Server error' });
  }
});





app.listen(7000, () => {
  console.log('connected');
})