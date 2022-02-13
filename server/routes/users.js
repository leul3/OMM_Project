var express = require('express');
var router = express.Router();
var User = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/users/signin', async function(req, res, next) {
  const body = req.body;
    const email = body.email;
    const password = body.password;

    try {
        const user = await User.findOne({ email });
        if (user && await comparePassword(password, user.password)) {
            const token = generateJWT(user);
            res.status(200).json({ token });
        } else {
            throw new Error("Either email or password are incorrect.");
        }
    } catch (error) {
        res.status(403).json({ message: error.message });
    }
})

router.post('/users/signup', async function(req, res, next) {
  const body = req.body;
    const email = body.email;
    const password = body.password;

    const hash = await generateHash(password);
    const newUser = new User({ email, password: hash });

    try {
        await newUser.save();
        const token = generateJWT(newUser);
        res.status(201).json({ token });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
});

module.exports = router;
