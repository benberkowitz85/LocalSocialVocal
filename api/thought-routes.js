const router = require('express').Router();

// Thought Controllers Requirements
const {
    getAllThoughts,
    getThoughtsById,
    createThoughts,
    updateThoughts,
    deleteThoughts,
    addReaction,
    deleteReaction

} = require('../controllers/thoughts-controller');

// Following Routes Should Direct to API
router
    .route('/')
    .get(getAllThoughts);

router
    .route('/:id')
    .get(getThoughtsById)
    .put(updateThoughts)
    .delete(deleteThoughts);

router
    .route('/:userId')
    .post(createThoughts);

// Routers for Posting and Deleting 
router
    .route('/:thoughtId/reactions')
    .post(addReaction);
router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction);


module.exports = router;