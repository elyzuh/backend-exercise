const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');
const rateLimiter = require('./middleware/rateLimit');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());


app.use((req, res, next) => {
    console.log(`Received request: ${req.method} ${req.originalUrl}`);
    next();
});

app.use(rateLimiter); 
app.use('/api/users', userRoutes);


app.use((req, res) => {
    res.status(404).json({ message: 'Route not found!!!!' });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
