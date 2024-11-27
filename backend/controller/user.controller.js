const userModel = require('../models/user.model');
const userService = require('../services/user.service');
const { validationResult } = require('express-validator');
const blackListModel = require('../models/blackListToken.model');
const bcrypt = require('bcrypt');

module.exports.register = async (req, res, next) => {
    const error = validationResult(req);
    if(!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }
    
    const {fullname, password, email} = req.body;

    const isUserAlready = await userModel.findOne({ email });

    if (isUserAlready) {
        return res.status(400).json({ message: 'User already exist' });
    }

    // const hashedPass = await userModel.hashPassword(password);
    const hashedPass = await bcrypt.hash(password, 10);
    const user = await userService.createUser({firstname:fullname.firstname , lastname:fullname.lastname, password: hashedPass, email});
    const token = user.generateToken();
    return res.status(201).json({ user, token });
}

module.exports.loginUser = async (req, res, next) => {
    const error = validationResult(req);
    if(!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }
    const { email, password } = req.body;
    const user = await userModel.findOne({ email }).select('+password');
    if (!user) {
        return res.status(400).json({ message: 'Incorrect email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Incorrect email or password' });
    }
    const token = user.generateToken();
    res.cookie('token', token, { httpOnly: true });
    return res.status(200).json({ user, token });
}

module.exports.getUserProfile = async (req, res, next) => {
    res.status(201).json(req.user);
}

module.exports.logoutUser = async (req, res, next) => {
    res.clearCookie('token');
    const token = req.cookies.token || req.header('Authorization').split(' ')[1];

    await blackListModel.create({ token });
    
    res.status(200).json({ message: 'Logout successful' });
}