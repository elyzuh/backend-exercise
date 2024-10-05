const users = require('../data/users.json');
const jwt = require('jsonwebtoken');


const JWT_SECRET = 'mysecretkey';

//user registration
exports.register = (req, res) => {
    const { username, password, email } = req.body;

    if (!username || !password || !email) {
        return res.status(400).json({ message: 'Please provide all required fields.' });
    }
    //incase duplicaet information
    const userExists = users.find(user => user.email === email);
    if (userExists) {
        return res.status(400).json({ message: 'User already exists.' });
    }

    const newUser = {
        id: users.length + 1,
        username,
        password,
        email
    };

    users.push(newUser);
    res.status(201).json({ message: 'User registered successfully', user: newUser });
};

//login
exports.login = (req, res) => {
    const { email, password } = req.body;

    //validation
    if (!email || !password) {
        return res.status(400).json({ message: 'Please provide email and password.' });
    }

    //if user exists
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials.' });
    }

    //token generation
    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET);

    res.status(200).json({ message: 'Login successful', token });
};

//get user prof
exports.getProfile = (req, res) => {
    const user = users.find(u => u.id === req.user.id);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ profile: user });
};
