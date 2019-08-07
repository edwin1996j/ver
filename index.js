const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mevn-crud');

app.set('port', process.env.PORT || 3000);


app.use(morgan('dev'));
app.use(express.json());


app.use('/api/tasks', require('./routes/tasks'));


app.use(express.static(path.join(__dirname, 'public')));;


app.listen(app.get('port'), () => {
  console.log(`server on port ${app.get('port')}`);
});
