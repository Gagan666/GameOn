const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post('/register', (req, res) => {
  console.log(req.body)
  const { username, password,mobile } = req.body;
  console.log(username,password,mobile)
  const user = new User({ username, password,mobile });

 // Saving a document with a promise
    user.save()
    .then(() => {
      res.status(200).json({ message: 'User registered successfully',status:200 });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Failed to register user',status:409 });
    });

});
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body)
  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    // You may want to add a password hashing/verification step here

    if (user.password === password) {
      return res.status(200).json({ message: 'Login successful',status:200 });
    } else {
      console.log("uhoh")

      res.status(200).json({ message: 'Authentication failed',status:401 });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = router;
