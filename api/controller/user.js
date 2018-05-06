const express = require('express')
const bcrypt = require('bcrypt')
const jwt    = require('jsonwebtoken')
const _ = require('lodash');
const bson = require('bson');

const User = require('../models/user')
const Notes = require('../models/note')
const config = require('../config/config')

const userRoutes = express.Router();

var throwFailed = function (res, message) {
  return res.json({ success: false, message: message });
}

var generateToken = function (username) {
  return jwt.sign({ name: username }, config.secret, { expiresIn: '100m' })
}

userRoutes.post('/authenticate', function(req, res) {
  const username = req.body.name
  const password = req.body.password

  if (_.isUndefined(username) || _.isUndefined(password)) {
    return throwFailed(res, 'Authentication failed. User not found.');
  }

  User
    .findOne({ name: username })
    .exec()
    .then(function(user) {
      if (!user) {
        return throwFailed(res, 'Authentication failed. User not found.');
      }

      bcrypt.compare(password, user.password, function(errBcrypt, resBcrypt) {
        if (resBcrypt == false) {
          return throwFailed(res, 'Authentication failed. Wrong password.');
        }

        setTimeout(function() {
          return res.json({
            token: generateToken(username),
            userId: user._id
          });
        }, config.delay);
      });
    });
});

userRoutes.post('/register', function(req, res) {
  const username = req.body.name
  const password = req.body.password
  const surname = req.body.surname
  const email = req.body.email

  if (!username || !password) {
    return throwFailed(res, 'Cannot register. Provide username or password.');
  }

  User
    .findOne({ name: username })
    .exec()
    .then(function(user) {
      if (user) {
        return throwFailed(res, 'There is already user with such username.');
      }

      const saltRounds = 10;
      bcrypt.hash(password, saltRounds, function(err, hash) {
          var user = new User({
            name: username,
            surname: surname,
            email: email,
            password: hash,
            admin: false
          });

          user.save(function(err) {
            if (err) throw err;
            return res.json({ success: true, message: 'User registered successfully.' });
          });
      });
    });
});

const tokenVerifier = require('../auth/token-verifier')
userRoutes.use(tokenVerifier);

userRoutes.get('/users/:id', function(req, res) {
  var userId = req.params.id;

  if (!bson.ObjectId.isValid(userId)) {
    return res.json({error: 'There is no id defined'});
  }

  User
    .findOne({ _id: userId })
    .exec()
    .then(function(user) {
        setTimeout(function() {
          res.json({
            name: user.name,
            email: user.email,
            surname: user.surname
          })
        }, config.delay);
    });
});

userRoutes.post('/users/:id', function(req, res) {
  const userInfo = {
      name: req.body.name,
      surname: req.body.surname,
      email: req.body.email
  };

  User.update({ _id: req.params.id }, { $set: userInfo}, function (err, user) {
    if (err) throw err;
    setTimeout(function() {
      res.json(user)
    }, config.delay);
  });
});

userRoutes.get('/getNote/:noteId/:id', function(req, res) {
  var userId = req.params.id;
  var noteId = req.params.noteId;
  // Function to check if the user has access to the Specific Note:

  User
  .findOne({ _id: userId })
  .exec()
  .then(function(user) {
        var obj = _.find(user.notes, function (obj) { return obj.id === noteId; });
        if(obj) {
        console.log("The note is not Accessible to the user");
        } else {
          Notes
          .findOne({ _id: noteId })
          .exec()
          .then(function(note) {
              setTimeout(function() {
                res.json({
                  name: note.name,
                  heading: note.heading || "",
                  content: note.content || "",
                  lastModifiedTime: note.lastModifiedTime || "",
                  lastModifiedUser: note.lastModifiedUser || ""
                })
              }, config.delay);
          });
        }
    }
  );
});

userRoutes.get('/getallnotes/:id', function(req, res) {
  var userId = req.params.id;
  // Function to check if the user has access to the Specific Note:

  User
  .findOne({ _id: userId })
  .exec()
  .then(function(user) {
    setTimeout(function() {
      res.json(user.notes)
    }, config.delay);
  }
  );
});



userRoutes.post('/addnote/:id', function(req, res) {
  const name = req.body.name;

  Notes
    .findOne({ name: name })
    .exec()
    .then(function(note) {
      if (note) {
        return throwFailed(res, 'There is already Note with same name already existing.');
      }
      var noteAdded = new Notes({
        name: name,
      });
      
      noteAdded.save(function(err, note) {
        if (err) throw err;
        const note1 = { name: name, id: note._id }
        User.findByIdAndUpdate(req.params.id,
          {$push: {notes: note1}},
          {safe: true, upsert: true},
          function(err, doc) {
              if(err){
              console.log(err);
              }else{
                console.log("added successfully in user");
              }
          }
        );

        return res.json({ success: true, message: 'Note added successfully.', noteId: note._id });
      });
    });
});

userRoutes.post('/updatenote/:noteid/:id', function(req, res) {
  const noteDetails = {
    heading: req.body.heading,
    content: req.body.content,
    lastModifiedTime: req.body.lastModifiedTime,
    lastModifiedUser: req.body.lastModifiedUser,
  };

  Notes.update({ _id: req.params.noteid }, { $set: noteDetails}, function (err, note) {
    if (err) throw err;

    setTimeout(function() {
      res.json(note)
    }, config.delay);
  });
});

userRoutes.get('/users', function(req, res) {
  User.find({}, function(err, users) {
    res.json(users);
  });
});


userRoutes.post('/sharenote/:noteid/:id', function(req, res) {
  const shareId = req.body.shareId;
  const noteId = req.params.noteid;
  let noteObject = {};
  console.log(shareId);
  // Find note Object
  Notes
    .findOne({ _id: noteId })
    .exec()
    .then(function(note) {
      noteObject.name = note.name;
      noteObject.id = note._id;
        // Find User and push note Object into it
      User
      .findOne({ name: shareId })
      .exec()
      .then(function(user) {
          if (!user) {
            return throwFailed(res, 'There is already Note with same name already existing.');
          }
          User.findByIdAndUpdate(user.id,
            {$push: {notes: noteObject}},
            {safe: true, upsert: true},
            function(err, doc) {
                if(err){
                console.log(err);
                }else{
                  console.log("Success shared");
                }
            }
          );
          return res.json({ success: true, message: 'Shared successfully.' });
      });
  });
});



module.exports = userRoutes;
