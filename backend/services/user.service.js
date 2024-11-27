// const userModel = require('../models/user.model');


// module.exports.createUser = async ({
//     firstname, lastname, email, password
// }) => {
//     if (!firstname || !email || !password) {
//         throw new Error('All fields are required');
//     }
//     const user = userModel.create({
//         fullname: {
//             firstname,
//             lastname
//         },
//         email,
//         password
//     })

//     return user;
// }
const userModel = require('../models/user.model');

module.exports.createUser = async ({
    firstname,
    lastname,
    email,
    password
}) => {
    if (!firstname || !email || !password) {
        throw new Error('All fields are required');
    }
    
    // Ensure all required fields are present
    const userData = {
        fullname: { 
            firstname,
            lastname 
        },
        email,
        password
    };

    try {
        const createdUser = await userModel.create(userData);
        return createdUser;
    } catch (error) {
        console.error('Error creating user:', error);
        throw new Error('Failed to create user');
    }
};
