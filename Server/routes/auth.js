const express = require('express');
const User = require('../models/User');
const { query, validationResult, body } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
const router = express.Router();
const dotenv = require("dotenv")


dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
// ROUTE: 1 create a user using : post '/api/auth/createuser'. 

router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'password must be atleast 8 characters').isLength({ min: 8 }),
], async (req, res) => {
    let = success = false;
    // if ther are errors, return Bad request and the errors

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() });
    }

    // check the whether the user with this email exists already

    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ success, error: 'Sorry a user with this already exists' })
        }

        const salt = await bcrypt.genSalt(10);
        const secpass = await bcrypt.hash(req.body.password, salt)

        //create a new user
        user = await User.create({
            name: req.body.name,
            password: secpass,
            email: req.body.email,
        })

        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({success, authtoken })

    } catch (error) {
        console.error(error.massage);
        res.status(500).send("Internal Server Error")
    }
})


// ROUTE : 2  Authenticate a user using : post '/api/auth/login'. 

router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'password cannot be blank').exists()
], async (req, res) => {
    let success = false;

     // Check if JWT_SECRET is defined
     if (!process.env.JWT_SECRET) {
        console.error('JWT_SECRET is not defined in the environment variables.');
        return res.status(500).send('Internal Server Error');
    }

    // if ther are errors, return Bad request and the errors

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({success, error: "please try to login with correct credentials" });
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({success, error: "please try to login with correct credentials" });
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        const success = true
        res.json({ success, authtoken })

    } catch (error) {
        console.error(error.massage);
        res.status(500).send("Internal Server Error")
    }
})

// ROUTE : 3 Get loggedin user Details using  post '/api/auth/getuser'.  
router.post('/getuser', fetchuser , async (req, res) => {

try {
    userId= req.user.id;
const user =  await User.findById(userId).select("password")
res.send(user)
} catch (error) {
    console.error(error.massage);
    res.status(500).send("Internal Server Error")
}
})
module.exports = router