const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Mock database (for demonstration only)
const users = [];

// Signup route
app.post('/api/signup', (req, res) => {
    const { fullName, email, password, mobile } = req.body;

    // Check if user already exists
    const userExists = users.find(user => user.email === email);
    if (userExists) {
        return res.status(400).json({ error: 'User already exists. Please log in.' });
    }

    // Add user to "database"
    users.push({ fullName, email, password, mobile });
    res.json({ message: 'Signup successful! Please log in.' });
});

// Login route
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    // Find user
    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
        res.json({ message: 'Login successful!' });
    } else {
        res.status(401).json({ error: 'Invalid email or password.' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
