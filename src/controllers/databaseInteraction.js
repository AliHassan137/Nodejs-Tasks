const express = require('express');
const bodyParser = require('body-parser');
require("dotenv").config()
require('../config/connect-mongoose');
const User = require('../models/users.model');
const Task = require('../models/tasks.model');
const responseHelper = require('../helpers/response.helper');
const { getHashValue } = require('../helpers/users.helper');
const jwtHelper = require("../helpers/jwt.helper");
const clientHelper = require("../helpers/users.helper");
const { auth } = require('../middlewares');

async function setupServer() {
  const app = express();
  const PORT = process.env.PORT;

  app.use(bodyParser.json());

  app.post('/signup', async(req, res) => {
    const { firstName, email, password } = req.body;
    try {
      if (!firstName || !email || !password) {
        let err = "Invalid Credentials";
        return responseHelper.requestfailure(res, err);
      }
      const user = await User.findOne({ email: email });
      if (user) {
        let err = "Email already exists";
        return responseHelper.requestfailure(res, err);
      }
      let bodyData = req.body;
      const hashpassword = await getHashValue(password);
      bodyData["password"] = hashpassword;
      const newUser = await User.create(bodyData);
      var message = "User Signup successfully";
      return responseHelper.success(res, newUser, message);
    } catch (error) {
      responseHelper.requestfailure(res, error);
    }
  });

  app.post('/login', async(req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return responseHelper.requestfailure(res, 'Email is required');
    }
    if (!password) {
      return responseHelper.requestfailure(res, 'Password is required');
    }
    const user = await User.findOne({ email });

    if (!user) {
      return responseHelper.requestfailure(res, 'User does not exist');
    }
    const isMatch = await clientHelper.comparePassword(password, user.password);

    if (isMatch) {
      const token = await jwtHelper.signAccessToken(user);
      const responseData = { token: `Bearer ${token}`, user: { ...user.toObject(), password: undefined } };
      const message = 'Successfully Signed In';

      return responseHelper.success(res, responseData, message);
    } else {
      return responseHelper.requestfailure(res, 'Invalid Password');
    }
  } catch (error) {
    return responseHelper.requestfailure(res, error.message || 'Internal Server Error');
  }
    
});

  // Protected Routes are given below

  // Create tasks
  app.post('/tasks', auth.authenticate, async (req, res) => {
    try {
      const response = await Task.create(req.body);
      const message = 'User created successfully!';
      return responseHelper.success(res, response, message)
    } catch (error) {
      console.error('Error creating user:', error.message);
      return responseHelper.requestfailure(res, error);
    }
  });

  // Get
  app.get('/tasks-list', auth.authenticate, async (req, res) => {
    try {
      const response = await Task.find();
      const message = 'Success';
      return responseHelper.success(res, response, message)
    } catch (error) {
      console.error('Error fetching users:', error.message);
    return responseHelper.requestfailure(res, error);
    }
  });

  // Update
  app.put('/tasks/:id', auth.authenticate, async (req, res) => {
    const userId = req.params.id;

    try {
      const response = await Task.findByIdAndUpdate(userId, {...req.body}, { new: true });
      const message = 'Updated successfully!';
      return responseHelper.success(res, response, message)
    } catch (error) {
      console.error('Error updating user:', error.message);
      return responseHelper.requestfailure(res, error);
    }
  });

  // Delete
  app.delete('/tasks/:id', auth.authenticate, async (req, res) => {
    const userId = req.params.id;

    try {
      await Task.findByIdAndDelete(userId);
      const message = 'Deleted successfully!'
      return responseHelper.success(res, null, message)
    } catch (error) {
      console.error('Error deleting user:', error.message);
      return responseHelper.requestfailure(res, error)
    }
  });

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

module.exports = { setupServer };
