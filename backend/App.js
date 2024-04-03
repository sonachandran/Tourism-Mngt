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
const Booking = require('./Models/Customer')
const Package=require('./Models/Package')
const saltrounds = 10;
const jwt = require('jsonwebtoken');
const multer=require('multer')
const path = require('path');
const Agency=require('./Models/Agency')
app.use('/uploads', express.static('uploads'));
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname)
  }
});
const upload = multer({ storage: storage });


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
    res.json({ user, token });

  }
  catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error' });
  }
})



app.post('/booking', async (req, res) => {
  try {
    const booking = new Booking({ ...req.body })
    console.log("booking", booking);
    let response = await booking.save()
    res.json(response)
  }
  catch (error) {
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
})

  app.put('/updateprofile/:userid', async (req, res) => {
    try {
      console.log('jfj',req.body);
      const id = req.params.userid;
      console.log('id',id);
      const updateprofile = await User.findByIdAndUpdate(id, req.body, { new: true });
      console.log('updated profile', updateprofile);
      if (!updateprofile) {
        return res.status(404).json({ message: 'profile not found' });
      }
      res.json(updateprofile);
    } catch (error) {
      console.error('Error fetching profile:', error);
      res.status(500).json({ error: 'Server error' });
    }

});

app.get('/viewbookings/:userid',async(req,res)=>{
  try {
    const userId = req.params.userid;
    console.log('userid',userId);
    const user = await Booking.find({userid:userId});
    console.log('user',user);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ error: 'Server error' });
  }
  
});


app.get('/viewpackages',async(req,res)=>{
  let response=await Package.find()
  res.json(response)
})


app.get('/packagedetail/:id',async(req,res)=>{
  const id=req.params.id;
  let response=await Package.findById(id)
  console.log('response',response);
  res.json(response)
})


app.post('/agencyform', async (req, res) => {
  try {
    let hashpassword = await bcrypt.hash(req.body.password, saltrounds)
    console.log(hashpassword);
    let newagency = new Agency({ ...req.body, password: hashpassword })
    console.log(newagency);
    let response = await newagency.save()
    console.log(response);
    res.json(response)
  }
  catch (error) {
    console.log('error', error);
  }

})



app.post('/agencylogin', async (req, res) => {
  try {
    const { email, password } = req.body;
    const agency = await Agency.findOne({ email })
    console.log('agencies', agency);
    if (!agency) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, agency.password);

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: agency.id, agencyname: agency.agencyname }, 'abc');
    console.log("token",token);
    res.json({ agency, token });

  }
  catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error' });
  }
})


app.get('/agencyprofile/:userid', async (req, res) => {
  try {
    const userId = req.params.userid;
    console.log("userid",userId);
    const agency = await Agency.findById(userId);
    console.log('agency',agency);
    if (!agency) {
      return res.status(404).json({ message: 'agency not found' });
    }
    res.json(agency);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ error: 'Server error' });
  }
})

app.put('/editagencyprofile/:userid', async (req, res) => {
  try {
    console.log('snsn',req.body);
    const id = req.params.userid;
    console.log('id',id);
    const updateprofile = await Agency.findByIdAndUpdate(id, req.body, { new: true });
    console.log('updated profile', updateprofile);
    if (!updateprofile) {
      return res.status(404).json({ message: 'profile not found' });
    }
    res.json(updateprofile);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ error: 'Server error' });
  }

});



app.post('/addpackage',upload.single('image'),async(req,res)=>{
  try {     
    const imagepath = req.file ? req.file.filename : ''
    const packages=new Package({...req.body,image: imagepath})
    console.log('package details',packages);
    let response=await packages.save()
    res.json(response)
}
catch (error) {
    console.error("Error inserting blog:", error);
    res.status(500).json({ error: 'Server error' });
}
})

// app.get('/viewpackagelist', async (req, res) => {  
//   let response = await Package.find()
//   console.log("response",response);
//   res.json(response)
// })

app.get('/viewpackagelist/:userid',async(req,res)=>{
  try {
    const userId = req.params.userid;
    console.log(userId, 'jkk');

    const viewpackage = await Package.find({ userid: userId });
    console.log('viewpackage', viewpackage);
    if (!viewpackage) {
        return res.status(404).json({ message: 'User blog not found' });
    }
    res.json(viewpackage);
}
catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ error: 'Server error' });
}

});


app.put('/updatepackage/:id',upload.single('image'),async(req,res)=>{
  try{
     const id=req.params.id;
     const{destination,description,price,image}=req.body
     const imagepath = req.file ? req.file.filename : ''
     console.log('gfy',imagepath);

     let response=await Package.findByIdAndUpdate(id,{description: description, image: imagepath,price:price ,destination:destination}, { new: true })
     console.log("updtated package",response);
     res.json(response)
  }
  catch{
   console.error(error);
   res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.delete('/deletepackage/:id',async(req,res)=>{
 try{
    const id=req.params.id;
    const response=await Package.findByIdAndDelete(id)
    console.log('deletepackage',response);
    res.json(response)
 }
 catch{
   console.error(error);
   res.status(500).json({ message: 'Internal Server Error' });
  }

});

app.get('/viewbookingdata',async(req,res)=>{
 let response=await Booking.find()
 console.log("booking data",response);
 res.json(response)

})




app.get('/detailpackage/:id',async(req,res)=>{
  const id=req.params.id;
  let response=await Package.findById(id)
  console.log('response',response);
  res.json(response)
})






app.listen(7000, () => {
  console.log('connected');
})