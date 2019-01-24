import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import models from './models/index';
import auth from './routes/auth';
import spending from './routes/spending';

const app = express();

app.set('secretKey', 'nodeRestApi'); // jwt secret token

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.json({ 'tutorial': 'Build REST API with node.js' });
});

// public route
app.use('/', auth);
// todo: make this route private
// todo: create refresh tokens
app.use('/users', spending);

// express doesn't consider not found 404 as an error so we need to handle 404 explicitly
// handle 404 error
app.use(function (req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});
// handle errors
app.use(function (err, req, res, next) {
  console.log(err);

  if (err.status === 404)
    res.status(404).json({ message: 'Not found' });
  else
    res.status(500).json({ message: 'Something looks wrong :( !!!' });
});


models.sequelize.sync({force: false}).then(() => {
  app.listen(process.env.PORT || 5000, () => {
    console.log('Your Server is up and running');
  });
});