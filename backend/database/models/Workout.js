const mongoose = require('../index.js');

//hhmm-hhmm time range
//yyyymmdd date format allows comparison of dates using numerical comparison operators like >= or <=
const workoutSchema = mongoose.Schema({
  email: String,
  sessionName: String,
  exercise: String,
  description: String,
  calories: Number,
  date: Number,
  checked: Boolean
});

let Workout = mongoose.model('Workout', workoutSchema, 'workouts');


module.exports.add = (entry) => {
  var newWorkout = new Workout(entry);
  return newWorkout.save();
};

module.exports.find = (email, date, sessionName) => {
  return Workout.find({
    email: email,
    date: date,
    sessionName: sessionName
  });
};

module.exports.updateCheck = (_id, checked) => {
  return Workout.findOneAndUpdate({
    _id: _id
  }, {
    checked: checked
  });
};

module.exports.findChecked = (email, date) => {
  return Workout.find({
    email: email,
    date: date,
    checked: true
  });
};
//pass in mongo generated __id
module.exports.delete = (_id) => {
  return Workout.deleteOne({
    _id: _id
  });
};

module.exports.deleteBySession = (sessionName) => {
  return Workout.deleteMany({
    sessionName: sessionName
  });
};