const router = require('express').Router();

// User Controller Requirements 
const {
    getAllUsers,
    getUsersById,
    createUsers,
    updateUsers,
    deleteUsers,
    addFriend,
    deleteFriend
} = require('../controllers/users-controller');

//  Direct Router For APIs to Post/Delete
router
    .route('/')
    .get(getAllUsers)
    .post(createUsers);

router
    .route('/:id')
    .get(getUsersById)
    .put(updateUsers)
    .delete(deleteUsers);

router
    .route('/:id/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend);


module.exports = router;