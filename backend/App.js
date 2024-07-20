const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv').config()


// mongoose.connect('mongodb://localhost:27017/Tourism')
//   .then(() => console.log('database connected'))



  // mongoose.connect(process.env.MONGO_URL)
  // .then(() => console.log('database connected'))
  // const port=process.env.PORT || 7000



mongoose.connect(process.env.MONGO_URL, {
 
  ssl: true
})
.then(() => console.log('Database connected'))
.catch((err) => console.error('Database connection error:', err));

const port = process.env.PORT || 7000;


const cors = require('cors');
app.use(express.json())
app.use(cors())


const bcrypt = require('bcryptjs')
const User = require('./Models/User')
const Booking = require('./Models/Customer')
const Package = require('./Models/Package')
const Admin = require('./Models/Admin')
const Review = require('./Models/Review')
const Day1=require('./Models/Day1')
const saltrounds = 10;
const jwt = require('jsonwebtoken');
const multer = require('multer')
const path = require('path');
const Agency = require('./Models/Agency');
const { log } = require('console');


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
    let newuserr = new User({ ...req.body, password: hashpassword, verified: false })
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
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    if (!user.verified) {
      return res.status(401).json({ error: 'Admin has not approved your account yet' });
    }

    // Fetch the latest user profile details from the database
    // This ensures that any updates made to the user's profile are included in the response
    const updatedUser = await User.findOne({ email:email });
    console.log("bhhuhduh",updatedUser);

    // Generate JWT token with user ID and any other necessary data
    const token = jwt.sign({ id: user.id, username: user.username },process.env.SECRET_KEY);

    // Return the updated user profile data and token in the response
    res.json({ user:updatedUser, token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});



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
    console.log('jfj', req.body);
    const id = req.params.userid;
    console.log('id', id);
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

app.get('/viewbookings/:userid', async (req, res) => {
  try {
    const userId = req.params.userid;
    console.log('userid', userId);
    const user = await Booking.find({ userid: userId });
    console.log('user', user);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ error: 'Server error' });
  }

});


app.get('/viewpackages', async (req, res) => {
  let response = await Package.find()
  res.json(response)
})


app.get('/packagedetail/:id', async (req, res) => {
  const id = req.params.id;
  let response = await Package.findById(id)
  console.log('response', response);
  res.json(response)
})



app.post('/addreview', upload.single('image'), async (req, res) => {
  try {
    const imagepath = req.file ? req.file.filename : ''
    const review = new Review({ ...req.body, image: imagepath })
    console.log('package details', review);
    let response = await review.save()
    res.json(response)
  }
  catch (error) {
    console.error("Error inserting blog:", error);
    res.status(500).json({ error: 'Server error' });
  }
})


app.delete('/deletebookings/:id',async(req,res)=>{
  try{
  const id=req.params.id;
  console.log("id",id);
  let response=await Booking.findByIdAndDelete(id)
  console.log('response',response);
  res.json(response)
  }
  catch {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
   
})


app.post('/agencyform', async (req, res) => {
  try {
    let hashpassword = await bcrypt.hash(req.body.password, saltrounds)
    console.log(hashpassword);
    let newagency = new Agency({ ...req.body, password: hashpassword, verified: false })
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

    if (!agency.verified) {
      return res.status(401).json({ error: 'Admin has not approved your account yet' });
    }


    const token = jwt.sign({ id: agency.id, agencyname: agency.agencyname }, 'abc');
    console.log("token", token);
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
    console.log("userid", userId);
    const agency = await Agency.findById(userId);
    console.log('agency', agency);
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
    console.log('snsn', req.body);
    const id = req.params.userid;
    console.log('id', id);
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



// app.post('/addpackage', upload.single('image'), async (req, res) => {
//   try {
//     console.log(req.file);
//     const mainImagePath = req.file ? req.file.filename : '';

//     const { destination, description, price, userid, names, spotimage } = req.body;
//     console.log(req.body,'=-=-');
    
//     const spots = names.map((spot, index) => ({
//       name: spot,
//       spotimage: spotimage[index] || '' // Use spotimage or empty string if not provided
//     }));

//     // Assuming userid is a valid ObjectId
//     const package = new Package({
//       image: mainImagePath,
//       destination,
//       description,
//       price,
//       userid,
//       spots // Array of spots
//     });

//     const savedPackage = await package.save();
//     console.log("packagedetails",savedPackage);

//     res.json(savedPackage);
//   } catch (error) {
//     console.error("Error adding package:", error);
//     res.status(500).json({ error: 'Server error' });
//   }
// });



app.post('/addpackage', upload.single('image'), async (req, res) => {
  try {
    console.log(req.file);
    const mainImagePath = req.file ? req.file.filename : '';

    const { destination, description, price, userid, names, spotimage,namess,hotelimage,rating,days } = req.body;
    console.log(req.body,'=-=-');
    
    const spots = names.map((spot, index) => ({
      name: spot,
      spotimage: spotimage[index] || '' // Use spotimage or empty string if not provided
    }));
    

    const hotels = namess.map((hotel, index) => ({
      name: hotel,
      hotelimage: hotelimage[index] || '' // Use spotimage or empty string if not provided
    }));

    



    // Assuming userid is a valid ObjectId
    const package = new Package({
      image: mainImagePath,
      destination,
      description,
      price,
      days,
      rating,
      userid,
      spots,
      hotels,
       // Array of spots
    });

    const savedPackage = await package.save();
    console.log("packagedetails",savedPackage);

    res.json(savedPackage);
  } catch (error) {
    console.error("Error adding package:", error);
    res.status(500).json({ error: 'Server error' });
  }
});






app.get('/viewpackagelists/:userid', async (req, res) => {
  try {
      const id = req.params.userid;
      console.log(id, 'jkk');

      const viewpackages = await Package.find({userid:id});
      console.log('userr', viewpackages);
      if (!viewpackages) {
          return res.status(404).json({ message: 'User package not found' });
      }
      res.json(viewpackages);
  }
  catch (error) {
      console.error('Error fetching profile:', error);
      res.status(500).json({ error: 'Server error' });
  }

});


app.post('/updatepackage/:id', upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'spotimage', maxCount: 10 }, // Assuming you allow up to 10 spot images
  { name: 'hotelimage', maxCount: 10 } // Assuming you allow up to 10 hotel images
]), async (req, res) => {
  try {
    const id = req.params.id;
    const { destination, description, price, userid, names, spotimage, namess, hotelimage,days ,rating} = req.body;
    const { image, spotImages, hotelImages } = req.files;

    // Construct spots array
    const spots = names.map((spot, index) => ({
      name: spot,
      spotimage: spotimage[index] || '' // Use spotimage or empty string if not provided
    }));

    // Construct hotels array
    const hotels = namess.map((hotel, index) => ({
      name: hotel,
      hotelimage: hotelimage[index] || '' // Use hotelimage or empty string if not provided
    }));

    // Update package fields based on provided data
    let packageUpdate = {
      destination,
      description,
      price,
      userid,
      spots,
      hotels,
      rating,
      days
    };

    // Update image if provided
    if (image) {
      packageUpdate.image = image[0].filename;
    }

    // Update spotImages if provided
    if (spotImages) {
      packageUpdate.spotImages = spotImages.map(file => file.filename);
    }

    // Update hotelImages if provided
    if (hotelImages) {
      packageUpdate.hotelImages = hotelImages.map(file => file.filename);
    }

    // Update the package in the database
    const updatedPackage = await Package.findByIdAndUpdate(id, packageUpdate, { new: true });

    res.json(updatedPackage);
  } catch (error) {
    console.error("Error updating package:", error);
    res.status(500).json({ error: 'Server error' });
  }
});





app.delete('/deletepackage/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const response = await Package.findByIdAndDelete(id)
    console.log('deletepackage', response);
    res.json(response)
  }
  catch {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }

});

// app.get('/viewbookingdata', async (req, res) => {
//   let response = await Booking.find()
//   console.log("booking data", response);
//   res.json(response)

// })

app.get('/viewbookingdata', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Get the page number from the query parameters, default to 1 if not provided
    const limit = parseInt(req.query.limit) || 10; // Get the limit from the query parameters, default to 10 if not provided
    const skip = (page - 1) * limit; // Calculate the number of documents to skip

    const bookings = await Booking.find().skip(skip).limit(limit);
    res.json(bookings);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});







app.get('/detailpackage/:id', async (req, res) => {
  const id = req.params.id;
  let response = await Package.findById(id)
  console.log('response', response);
  res.json(response)
})



app.get('/viewdaydetails', async (req, res) => {
  let response = await Day1.find()
  res.json(response)
})


app.get('/viewpackage/:id', async (req, res) => {
  const id = req.params.id;
  let response = await Package.findById(id)
  console.log('response', response);
  res.json(response)
})



app.post('/adminform', async (req, res) => {
  try {
    let hashpassword = await bcrypt.hash(req.body.password, saltrounds)
    console.log(hashpassword);
    let newadmin = new Admin({ ...req.body, password: hashpassword })
    console.log(newadmin);
    let response = await newadmin.save()
    console.log(response);
    res.json(response)
  }
  catch (error) {
    console.log('error', error);
  }

})



app.post('/adminlogin', async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email })
    console.log('admin', admin);
    if (!admin) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: admin.id, fullname: admin.fullname }, 'abc');
    console.log("token", token);
    res.json({ admin, token });




  }
  catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error' });
  }
})

app.get('/viewusers', async (req, res) => {
  const users = await User.find()
  res.json(users)
})

app.put('/userverification/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findByIdAndUpdate(userId, { verified: true }, { new: true });
    res.json(user);
  } catch (error) {
    console.error('Error verifying user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }

});

app.delete('/deleteuser/:id', async (req, res) => {
  try {
    const id = req.params.id;
    console.log("id", id);
    let response = await User.findByIdAndDelete(id)
    console.log('response', response);
    res.json(response)
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
})




app.get('/viewagencies', async (req, res) => {
  const agencies = await Agency.find()
  res.json(agencies)
})


app.put('/agencyverification/:agencyid', async (req, res) => {
  try {
    const agencyid = req.params.agencyid;
    const agency = await Agency.findByIdAndUpdate(agencyid, { verified: true }, { new: true });
    res.json(agency);
  } catch (error) {
    console.error('Error verifying user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }

});


app.delete('/deleteagency/:id', async (req, res) => {
  try {
    const id = req.params.id;
    console.log("id", id);
    let response = await Agency.findByIdAndDelete(id)
    console.log('response', response);
    res.json(response)
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
})





app.get('/viewreviews',async(req,res)=>{
  try{
   let response=await Review.find()
   console.log('reviews',response);
   res.json(response)
  }
  catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error:'Internal server error'});
  }
})



app.post('/day1',async(req,res)=>{
  try {
    const { activities, foodOptions, accommodation } = req.body;

    const day1Details = new Day1({
      activities,
      foodOptions,
      accommodation
    });

    await day1Details.save();

    res.status(201).json({ message: 'Day 1 details saved successfully' });
  } catch (error) {
    console.error('Error saving day 1 details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Endpoint for searching tourism places
app.get('/searchplace', async (req, res) => {
  const { q } = req.query;
  try {
    // Your logic to search for places based on the query 'q'
    // For example:
    const places = await Package.find({ destination: { $regex: new RegExp(q, 'i') } });
    res.json(places);
  } catch (error) {
    console.error('Error occurred while searching places:', error);
    res.status(500).json({ error: 'Failed to search places' });
  }
});






app.listen(port, () => {
  console.log('connected');
})