const User = require('./../models').User;
const crypto = require('crypto');
const sjcl = require('../../lib/sjcl.js');
const jwt = require('jsonwebtoken');

module.exports = {
  addUser: (req, res, next) => {
    let { username, email, password } = req.body;
    let salt = sjcl.codec.hex.fromBits(crypto.randomBytes(16));
    let passwordHash = sjcl.hash.sha512.hash(password + salt);
    let passwordHex = sjcl.codec.hex.fromBits(passwordHash);

    new User({ username, email, password: passwordHex, salt})
      .save((err, user) => {
        if(err) {
          res.send(err);
        }
        else if (!user) {
          res.status(400);
        }
        else {
          res.json();
        }
      });
  },
  checkUserExists: (req, res, next) => {
    let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (emailRegex.test(req.params.userIdentifier)) {
      whereClause = {where: {email: req.params.userIdentifier}};
    }
    else {
      whereClause = {where: {username: req.params.userIdentifier}};
    }

    return User
      .findOne(whereClause)
      .then(user => res.status(201).send(user))
      .catch(error => res.status(400).send(error));
  },

  loginUser: (req, res, next) => {
    let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    let { userIdentifier, password } = req.body;
    let whereClause;
    if (emailRegex.test(userIdentifier)) {
      whereClause = {where: {email: userIdentifier}};
    }
    else {
      whereClause = {where: {username: userIdentifier}};
    }
       
    User
      .findOne(whereClause)
      .then(user => {
        let passwordHash = sjcl.hash.sha512.hash(password + user.salt);
        let passwordHex = sjcl.codec.hex.fromBits(passwordHash);

        if (passwordHex === user.password) {
          return res.json(
          {
            // Generate token.
            token: jwt.sign(
            {
              userId: user.id,
              username: user.username
            }, 'v3rys3cr3t')
          });
        } else { 
          return res.json({});
        }
      })
      .catch(error => res.status(400).send(error));
  },

  getUser: (req, res, next) => {
    let token = req.get('Authorization');
    let userId = jwt.verify(token, 'v3rys3cr3t', 'base64').userId;
    User
      .findOne({ where: { id: userId } })
        .then(user => res.status(200).json({ username: user.username }));
  },

  logoutUser: (req, res, next) => {
  },

  verifyLogin: (req, res, next) => {
    let token = req.get('Authorization');
    let decoded = jwt.verify(token, 'v3rys3cr3t', 'base64');
    if (decoded) 
      return res.status(200).json({ decoded });
    else 
      return res.status(403).json( {} );
  }
};
