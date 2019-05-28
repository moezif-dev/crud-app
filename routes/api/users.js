/* TODO: 
	add validations
*/

const express = require('express');
const gravatar = require('gravatar');
const { userValidator } = require('../../lib/');

// Load routes utils
const STATUS = require('../utils').STATUS_CODES;

// Load User modal
const User = require('../../models/User');

const router = express.Router();

// @route 	GET api/users/test
// @desc 		Test user route
// @access	Public
router.get('/test', (req, res) => res.json({ msg: "Users works!" }));

// @route   GET api/users/all
// @desc    Get all users
// @access  Public
router.get('/all', (req, res) => {
  const errors = {};
  User.find()
    .then(users => {
      if (!users) {
        return res.status(STATUS.NOT_FOUND).json(errors);
      }
      res.json(users);
    }).catch(err => {
      res.status(STATUS.NOT_FOUND).json(err)
    });
});

// @route   GET api/users/:id
// @desc    Get user by id
// @access  Public
router.get('/:_id', (req, res) => {
  const errors = {};
  const { _id } = req.params;

  User.findOne({ _id })
    .then(user => {
      if (!user) {
        return res.status(STATUS.NOT_FOUND).json(errors);
      }

      res.json(user);
    }).catch(err => {
      res.status(STATUS.NOT_FOUND).json(errors)
    });
});

// @route 	POST api/users/create
// @desc 		Create, or update users profile
// @access	Public
router.post('/', (req, res) => {
  // check validation
  const {errors, isValid} = userValidator(req.body);

  if(!isValid){
    return res.status(STATUS.BAD_REQUEST).json(errors);
  };

  // get user fields
  const userFields = {
    ...req.body,
  };

  // add gravater if users do not provide picture
  if (!userFields.picture) {
    const avatar = gravatar.url(userFields.email, {
      s: '32', // Size
      r: 'pg', // Rating
      d: 'mm' // Default
    });

    userFields.picture = avatar;
  }

  const userQuery = { _id: userFields._id };

  User.findOne(userQuery)
    .then(user => {
      if (user) {
        // update
        User.findOneAndUpdate(userQuery, {
          $set: userFields
        }, {
          new: true
        }).then(updatedUser => {
          res.json(updatedUser)
        });
      } else {

        // create/save user
        new User(userFields).save().then(newUser => {
          res.json(newUser);
        }).catch( errors => res.status(STATUS.SERVER_ERROR).json({errors, msg: "can't save"}) );
      }
    }).catch(errors => res.status(STATUS.SERVER_ERROR).json(errors));
});

// @route   DELETE api/users/:id
// @desc    Delete user
// @access  Public
router.delete('/:_id', (req, res) => {
  const errors = {};
  const { _id } = req.params;

  User.findOneAndRemove({ _id })
    .then(() => {
      res.json({ success: true })
    }).catch(errors => res.status(STATUS.SERVER_ERROR).json(errors));
});

module.exports = router;