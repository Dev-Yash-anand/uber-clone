const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.service');
const blackListModel = require('../models/blackListToken.model');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.createCaptain = async (req, res, next) => {

    const error = validationResult(req);
    if(!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }

    const {fullname, email, password, vehicle} = req.body;

    const isCaptainAlready = await captainModel.findOne({ email });

    if (isCaptainAlready) {
        return res.status(400).json({ message: 'Captain already exist' });
    }

    const hashedPass = await bcrypt.hash(password, 10);
    const captain = await captainService.createCaptain({firstname:fullname.firstname , lastname:fullname.lastname, email, password: hashedPass, color:vehicle.color, plate:vehicle.plate, vehicleType:vehicle.vehicleType, capacity:vehicle.capacity});
    const token = captain.generateAuthToken();
    return res.status(201).json({ captain, token });
}

module.exports.loginCaptain = async (req, res, next) => {

    const error = validationResult(req);
    if(!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }

    const { email, password } = req.body;

    const captain = await captainModel.findOne({ email }).select('+password');

    if (!captain) {
        return res.status(400).json({ message: 'Incorrect email or password' });
    }

    const isMatch = await bcrypt.compare(password, captain.password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Incorrect email or password' });
    }

    const token = captain.generateAuthToken();
    res.cookie('token', token, { httpOnly: true });    
    return res.status(200).json({ captain, token });
}

module.exports.getCaptainProfile = async (req, res, next) => {
    res.status(201).json(req.captain);
}

module.exports.logoutCaptain = async (req, res, next) => {

    const token = req.cookies.token || req.header('Authorization').split(' ')[1];
    
    await blackListModel.create({ token });

    res.clearCookie('token');

    res.status(201).json({ message: 'Logout successfully' });
}