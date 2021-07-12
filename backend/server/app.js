const express = require('express');
// const cors = require('cors');
const db = require('../database');
const Models = require('../database/models/index.js');
const app = express();
const port = process.env.PORT || 3000;
const routeSpecs = require('../routeSpecs/tests.js')


// middleware
// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + '/../../dist'));


/*
  While writing your endpoints, please do not remove any of the mongo created
  _id properties
**/

app.get('/test', (req, res) => {
  // Models.User.add({userId: 0, name: 'Tom Marvolo Riddle'});
});

//ENDPOINTS

/****************************
 *
 *        workoutSessions
 *
 ****************************/

//format for 'date' query: yyyymmdd
//format for 'dateRange' query: yyyymmdd-yyyymmdd

app.get('/workoutSession', (req, res) => {
  let {userId, date, dateRange} = req.query
  routeSpecs.handleBadRequest.getWorkoutSession(userId, [date, dateRange])
  /*if a 400 is thrown, client side logic isn't adhering
  to requirements from the server.  This is a stand in for a jest test*/
  .then(() => {
    if (date) {
      Models.WorkoutSession.find(Number(userId), Number(date))
    } else {
      let [startDate, endDate] = dateRange.split('-');
      Models.WorkoutSession.findRange(Number(userId), Number(startDate), Number(endDate));
    }
  })
  .then((results) => {
    res.status(200).json(results)
  })
  .catch((err) => {
    //Delete this conditional when Jest test suite has replaced tests.js in routeSpecs
    Array.isArray(err) ? res.json(err) : res.sendStatus(500);
  });
});


app.post('/workoutSession', (req, res) => {
  let entry = req.body
  routeSpecs.handleBadRequest.postWorkoutSession(entry)
  .then(_ => {
    entry.date = parseInt(entry.date);
    return (entry)
    Models.WorkoutSession.add(entry)
  })
  .then(result => {
    console.log(result)
    res.sendStatus(201);
  })
  .catch(err => {
    Array.isArray(err) ? res.json(err) : res.sendStatus(500);
    res.json(err)
  })
})

app.delete('/workoutSession', (req, res) => {
  let sessionName = req.query.sessionName;
  routeSpecs.handleBadRequest.deleteWorkoutSession(sessionName)
  .then(_=> {
    Models.WorkoutSession.delete(sessionName)
  })
  .then(_=> {
    res.sendStatus(201)
  })
  .catch(err => {
    Array.isArray(err) ? res.json(err) : res.sendStatus(500);
  })
})


/****************************
 *
 *        workout
 *
 ****************************/

//  userId: Number,
//  sessionName: String,
//  exercise: String,
//  description: String,
//  calories: Number,
//  date: Number,
//  checked: Boolean


app.get('/workout', (req, res) => {
  let {userId, date, sessionName} = req.query;
  routeSpecs.handleBadRequest.getWorkout(userId, date, sessionName)
  .then(_=> {
    Models.Workout.find(Number(userId), Number(date), sessionName)
  })
  .then(result => {
    res.status(200).json(result);
  })
  .catch(err => {
    Array.isArray(err) ? res.json(err) : res.sendStatus(500);
  })
})

app.post('/workout', (req, res) => {
  let entry = req.body;
  routeSpecs.handleBadRequest.postWorkout(entry)
  .then(_=>{
    Models.Workout.add(entry)
  })
  .then(result => {
    res.status(200).json(result);
  })
  .catch(err => {
    Array.isArray(err) ? res.json(err) : res.sendStatus(500);
  })
})

app.delete('/workout', (req, res) => {
  let id = req.query.id;
  routeSpecs.handleBadRequest.deleteWorkout(id)
  .then(_=>{
    Models.Workout.delete(Number(id))
  })
})

app.get('/workout/checked', (req, res) => {
  let {userId, date} = req.query;
  routeSpecs.handleBadRequest.getWorkoutChecked(userId, date)
  .then(_=>{
    Models.Workout.findChecked(Number(userId), Number(date))
  })
})

app.put('/workout/checked', (req, res) => {
  let {id, checked} = req.body;
  routeSpecs.handleBadRequest.putWorkoutChecked(id, checked)
  .then(_=>{
    Models.Workout.updateCheck(id, checked)
  })
})

// app.delete('/workout', (req, res) => {
//   let sessionName = req.query.sessionName;
//   Models.Workout.deleteBySession(sessionName)
// })



app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
});
