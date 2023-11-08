//allows us to process html requests
const express = require('express');
//allows us to read cookies
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();
const PORT = 3000;

//get all chunks of bodies, cookies, http form and turn them to js readables
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded());

/*********************CONTROLLER IMPORTS**************************************** */
const users = require('./controllers/userController');
const problems = require('./controllers/problemController');

/*********************ROUTER IMPORTS**************************************** */
const videosRouter = require('./routers/videoRouter')


//statically serve the build folder which contains the bundle
app.use('/build', express.static(path.join(__dirname, '../build')));

/*********************LOAD PAGES**************************************** */
//main page get. send them the html file
app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../index.html'));
});

//get database page
app.get('/data', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../index.html'));
});

/*********************ACTIONS**************************************** */
//handle login request
app.post('/login', users.verifyUser, users.addUser, (req, res) => {
  return res.redirect('/data');
});

//get problem lists
app.get('/problemList', problems.getList, (req, res) => {
  return res.status(200).json(res.locals.problemsList);
});

//handle everything in the router
app.use('/video', videosRouter)

/*********************ERROR HANDLERS**************************************** */
// //404 ERROR HANDLER
app.use('*', (req, res) => {
  return res.status(404).send('WHERE ARE YOU GOING?!?!?!');
});

// //global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'some unknow error occured in application',
    status: 500,
    message: { err: 'unknown error occured' },
  };
  const errorObj = Object.assign(defaultErr, err);
  //internal use log to see where error occured
  console.log(errorObj.log);
  //send status back to client with error message
  return res.status(errorObj.status).json(errorObj.message);
});

//start up server on PORT
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;
