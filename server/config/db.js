var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/voraciousscroll');
var Schema = mongoose.Schema;
var util = require('./helperFunctions');

var userSchema = new Schema({
  _facebookUniqueID: String,
  firstname: String,
  lastname: String,
  picture: String,
  gender: String
});

var User = mongoose.model('User', userSchema);

User.findOrCreateUser = function(profile, callback) {
  User.findOne({_facebookUniqueID: profile.id}, function (error, user) {
    if (error) {
      console.log('ERROR: ', error);
      callback(error);
    } else if (!user) {
      User.create(util.profile(profile), function(error, user) {
        if (error) {
          console.log('ERROR: ', error);
          callback(error);
        } else {
          console.log('Success added new user: ', user);
          callback(null, user);
        }
      });
    } else {
      callback(null, user);
    } 
  });
};

exports.User = User;
