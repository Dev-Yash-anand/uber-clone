const userModel = require('../models/user.model');
const captainModel = require('../models/captain.model');
const blackListModel = require('../models/blackListToken.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports.auth = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[ 1 ];


    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const isBlackListToken = await blackListModel.findOne({ token });
    if (isBlackListToken) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await userModel.findById(decoded.id);

        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        req.user = user;
        next();
    }catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}

// module.exports.captainAuth = async (req, res, next) => {
//     const token = req.cookies.token || req.headers.authorization?.split(' ')[ 1 ]


//     if (!token) {
//         return res.status(401).json({ message: 'Unauthorized no token' })
//     }

//     const isBlackListToken = await blackListModel.findOne({ token })
//     if (isBlackListToken) {
//         return res.status(401).json({ message: 'Unauthorized blacklisted' })
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
//         const captain = await captainModel.findById(decoded.id)

//         if (!captain) {
//             return res.status(401).json({ message: 'Unauthorized' })
//         }

//         req.captain = captain
//         next()
//     }catch (error) {
//         return res.status(401).json({ message: 'Unauthorized' })
//     }
// }

module.exports.captainAuth = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized no token' });
    }

    const isBlackListToken = await blackListModel.findOne({ token });

    if (isBlackListToken) {
        return res.status(401).json({ message: 'Unauthorized blacklisted' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        const captain = await captainModel.findById(decoded._id);

        if (!captain) {
            return res.status(401).json({ message: 'Unauthorized captain not found' });
        }

        req.captain = captain;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized invalid token' });
    }
};
