const router = require('express').Router();

const {
    getUser,
    getSingleUser,
    createUser,
    deleteUser,
    addReaction,
    removeReaction,
} = require('../../controllers/userController');


router.route('/').get(getUser).post(createUser);

router.route('/:userId').get(getSingleUser).delete(deleteUser);

router.route('/:userId/reactions').post(addReaction);

router.route('/:userId/reactions/:reactionId').delete(removeReaction);

module.exports = router;
