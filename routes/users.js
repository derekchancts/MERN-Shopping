const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');


// REGISTER A NEW USER
router.post('/register', (req, res) => {
  const { name, email, password } = req.body; 

  // Simple validation
  if(!name || !email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  // Check for existing user
  User.findOne({ email })
    .then(user => {
      if(user) return res.status(400).json({ msg: "Email already exist. Please provide another email" })

      const newUser = new User({
        name,
        email,
        password
      })

       // create salt and hash
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if(err) throw err;

          newUser.password = hash;
          newUser.save()
            .then(user => {
              // res.json({
              //   user: {
              //     id: user.id,
              //     name: user.name,
              //     email: user.email
              //   }
              // })

              jwt.sign(
                { id: user.id },
                process.env.JWT_SECRET,
                { expiresIn: 3600 }, 
                (err, token) => {
                  if(err) throw err;
                  res.json({
                    token,
                    user: {
                      id: user.id,
                      name: user.name,
                      email: user.email
                    }
                  });
                }
              );

            });

        });
      });

    })
    .catch(err => {
      res.status(400).json({ 
        // err,
        msg: "Some error occurred"
      })
    });

});




// LOGIN A USER
router.post('/login', (req, res) => {
  const { email, password } = req.body; 

  // Simple validation
  if(!email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  // Check for existing user
  User.findOne({ email })
    .then(user => {
      if(!user) return res.status(400).json({ msg: "User does not exist" });

      // Validate password
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if(!isMatch) return res.status(403).json({ msg: 'Invalid credentials' });

          jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET,
            { expiresIn: 3600 }, 
            (err, token) => {
              if(err) throw err;
              res.json({
                token,
                user: {
                  id: user.id,
                  name: user.name,
                  email: user.email
                }
              });
            }
          );
          
        });

    })
    .catch(err => {
      res.status(400).json({ 
        // err,
        msg: "Some error occurred" 
      })
    });

});



// GET A USER DETAILS
router.get('/user', auth, (req, res) => {
  // console.log(req.user)
  // User.findById({ _id: req.user.id })
  User.findById(req.user.id)
    .select('-password')
    .then(user => {
      if(!user) return res.status(400).json({ msg: "User not found" })

      res.json(user)
    })
})


module.exports = router;