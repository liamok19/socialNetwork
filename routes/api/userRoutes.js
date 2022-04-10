const router = require('express').Router();


const {
    getUser,
    getSingleUser,
    createUser,
    deleteUser,
    addReaction,
    removeReaction,
  } = require('../../controllers/userController');
  