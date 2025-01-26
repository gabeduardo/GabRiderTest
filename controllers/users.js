const User = require('../models/Users');

module.exports.controller = (app) => {
  // get all users
  app.get('/users', async (req, res) => {
    try {
      const users = await User.find({}, 'name email');
      res.send(users);
    } catch (error) {
      console.log(error);
      res.status(500).send('Error retrieving users');
    }
  });
};
