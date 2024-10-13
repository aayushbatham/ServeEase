// controllers/user.controller.js
import User from '../models/user.model.js'; // Import the User model
import bcrypt from 'bcrypt'; // Import bcrypt for password hashing
import jwt from 'jsonwebtoken'; // Import jwt for token generation

// Register a new user
export const registerUser = async (req, res) => {
    const {name, email, password, role } = req.body;

    // Input validation (you may want to add more checks)
    if (!name || !email || !password || !role) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10); // Hashing with a salt rounds of 10

        // Create the new user
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role, // Ensure that the role is validated (customer, worker, admin)
        });

        // Respond with success message
        res.status(201).json({ message: 'User registered successfully', user: { id: newUser.user_id, name: newUser.name, email: newUser.email, role: newUser.role } });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    // Input validation (you may want to add more checks)
    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Check if user exists
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Compare passwords
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = jwt.sign({ user_id: user.user_id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Respond with success message
        res.status(200).json({ message: 'Login successful', user: { id: user.user_id, name: user.name, email: user.email, role: user.role, token: token } });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
