const { Users } = require('../models');

// Set up New User Controller
const usersController = {

    // Create a new User
    createUsers({body}, res) {
        Users.create(body)
            .then(dbUsersData => res.json(dbUsersData))
            .catch(err => res.status(400).json(err));
    },

    // Retrieve All Users
    getAllUsers(req, res) {
        Users.find({})
        // Populate User Thought
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            // Populate Friend 
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .select('-__v')
            // .sort({_id: -1})
            .then(dbUsersData => res.json(dbUsersData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // Find User ID
    getUsersById({params}, res) {
        Users.findOne({_id: params.id })
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .select('-__v')
            // Alert If No User Is Located
            .then(dbUsersData => {
                if(!dbUsersData) {
                    res.status(404).json({message: 'This individual does not exist! Go Make A New Friend, Read A Book, or Try Spelling Their Name Correctly.'});
                    return;
                }
                res.json(dbUsersData)
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err)
            })
    },

    // Update User Info
    updateUsers({params, body}, res) {
        Users.findOneAndUpdate({_id: params.id}, body, {new: true, runValidators: true})
            .then(dbUsersData => {
                if(!dbUsersData) {
                    res.status(404).json({message: 'This individual does not exist! Go Make A New Friend, Read A Book, or Try Spelling Their Name Correctly.'});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err))
    },

    deleteUsers({params}, res) {
        Users.findOneAndDelete({_id: params.id})
            .then(dbUsersData => {
                if(!dbUsersData) {
                    res.status(404).json({message: 'This individual does not exist! Go Make A New Friend, Read A Book, or Try Spelling Their Name Correctly.'});
                    return;
                }
                res.json(dbUsersData);
            })
            .catch(err => res.status(400).json(err));
    },

    addFriend({params}, res) {
        Users.findOneAndUpdate({_id: params.id}, {$push: { friends: params.friendId}}, {new: true})
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .select('-__v')
            .then(dbUsersData => {
                if (!dbUsersData) {
                    res.status(404).json({message: 'This individual does not exist! Go Make A New Friend, Read A Book, or Try Spelling Their Name Correctly.'});
                    return;
                }
                res.json(dbUsersData);
            })
            .catch(err => res.json(err));
    },

    // Delete Former Friend
    deleteFriend({ params }, res) {
        Users.findOneAndUpdate({_id: params.id}, {$pull: { friends: params.friendId}}, {new: true})
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .select('-__v')
            .then(dbUsersData => {
                if(!dbUsersData) {
                    res.status(404).json({message: 'This individual does not exist! Go Make A New Friend, Read A Book, or Try Spelling Their Name Correctly.'});
                    return;
                }
                res.json(dbUsersData);
            })
            .catch(err => res.status(400).json(err));
    }

};


module.exports = usersController;