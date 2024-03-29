import bcrypt from 'bcrypt';    // for hashing the passwords
import jwt from 'jsonwebtoken';     // safe way to store the users (store the users in the browser for some period of time)

import User from '../models/user.js';


export const signup = async (request, response) => {
    const { email, password, confirmPassword, firstName, lastName } = request.body;

    try {

        const existingUser = await User.findOne({ email });     // need to check, cause we can't create an account if one already exists
        
        if (existingUser) return response.status(400).json({ message: "User alread exists." });

        // if no such user, have to create an account

        // first check if password and confirmPassword are the same
        if (password !== confirmPassword) return response.status(400).json({ message: "Passwords don't match." });

        // we don't want to store the password in a plain text, so we have to hash it first
        const hashedPassword = await bcrypt.hash(password, 12);  // 12 is for the salt parameter - > level of difficulty for the hashing

        // create user
        const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });
        
        // token
        const token = jwt.sign({ email: result.email, id: result._id }, 'test', { expiresIn: '1h' });  // the token that is sent to the frontend

        response.status(200).json({ result: result, token });

    } catch (error) {
       
        response.status(500).json({ message: 'Something went wrong.' });

    }
}

export const signin = async (request, response) => {
    // we need to get email and password from the frontend, how? when we make post request, we get from frontend
    const { email, password } = request.body;

    try {
        // if we are signing in, we first need to find the old user
        const existingUser = await User.findOne({ email });

        if (!existingUser) return response.status(404).json({ message: "User doesn't exist." });

        // if user exist check if the password is the same as the one when the account was created
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) return response.status(400).json({ message: 'Invalid credentials.' });

        // if user exists and password is correct
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'test', { expiresIn: '1h' });  // the token that is sent to the frontend

        response.status(200).json({ result: existingUser, token });

    } catch (error) {
        response.status(500).json({ message: 'Something went wrong.' });
    }

} 
