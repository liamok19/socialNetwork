const router = require('express').Router();

    const {
        getThought,
        getSingleThought,
        createThought,
        updateThought,
        deleteThought,
        createReaction,
} = require('../../controllers/thoughtController.js');

router.route('/').get(getThought).post(createThought);

router
    .route('/:thoughtId')
    .get(getSingleThought)
    .put(updateThought)
    .create(createReaction)
    .delete(deleteThought);


module.exports = router;