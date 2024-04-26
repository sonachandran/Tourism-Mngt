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
const Package = require('./Models/Package')
const Admin = require('./Models/Admin')
const Review = require('./Models/Review')
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


const spotImageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'spotimages/') // Destination directory for spot images
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname) // Generate a unique filename for spot images
  }
});

const spotImageUpload = multer({ storage: spotImageStorage }); // Multer middleware for spot images




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
    const token = jwt.sign({ id: user.id, username: user.username }, 'abc');

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
//     const imagepath = req.file ? req.file.filename : ''
//     const packages = new Package({ ...req.body, image: imagepath })
//     console.log('package details', packages);
//     let response = await packages.save()
//     res.json(response)
//   }
//   catch (error) {
//     console.error("Error inserting blog:", error);
//     res.status(500).json({ error: 'Server error' });
//   }
// })

// Import multer configuration for file uploads


// app.post('/addpackage', upload.single('image'), async (req, res) => {
//   try {
//     const imagepath = req.file ? req.file.filename : '';

//     const { destination, description, price, userid } = req.body; 
//     const spotImages = req.files ? req.files : [''];
//     console.log("spotimage",spotImages);
    

//     // Map spot data to get spot names and images
//     const parsedSpots = spotImages.map((spot, index) => ({
//       name: req.body[`spotName${index}`], // Retrieve spot name from req.body using the indexed key
//       image:spot.filename // Use the filename provided by multer for the spot image
//     }));

//     // Upload spot images and update spot objects with image paths
//     const spotsWithImages = await Promise.all(parsedSpots.map(async (spot) => {
//       if (spot.image) {
//         const imagePath = await uploadImage(spot.image); // Implement uploadImage function to upload spot images
//         return { ...spot, image: imagePath };
//       }
//       return spot;
//     }));

//     const package = new Package({
//       image: imagepath,
//       destination,
//       description,
//       price,
//       userid,
//       spots: spotsWithImages
//     });

//     const savedPackage = await package.save();

//     res.json(savedPackage);
//   } catch (error) {
//     console.error("Error adding package:", error);
//     res.status(500).json({ error: 'Server error' });
//   }
// });




 
// Assuming multer middleware is configured correctly
// Update the route handler for '/addpackage'

app.post('/addpackage', upload.single('image'), spotImageUpload.array('spotimages', 5), async (req, res) => {
  try {
    const mainImagePath = req.file ? req.file.filename : '';
    const spotImages = req.files.map(file => file.filename);

    const { destination, description, price, userid } = req.body;

    const spotNames = req.body.names; // Extract spot names from request body

    const spots = spotImages.map((image, index) => ({
      image,
      name: spotNames[index] // Match each image with its corresponding name
    }));

    const package = new Package({
      image: mainImagePath,
      destination,
      description,
      price,
      userid,
      spots
    });

    const savedPackage = await package.save();

    res.json(savedPackage);
  } catch (error) {
    console.error("Error adding package:", error);
    res.status(500).json({ error: 'Server error' });
  }
});




app.get('/viewpackagelist/:userid', async (req, res) => {
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






app.put('/updatepackage/:id', upload.single('image'), async (req, res) => {
  try {
    const id = req.params.id;
    const { destination, description, price, image } = req.body
    const imagepath = req.file ? req.file.filename : ''
    console.log('gfy', imagepath);

    let response = await Package.findByIdAndUpdate(id, { description: description, image: imagepath, price: price, destination: destination }, { new: true })
    console.log("updtated package", response);
    res.json(response)
  }
  catch {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error'});
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






app.listen(7000, () => {
  console.log('connected');
})