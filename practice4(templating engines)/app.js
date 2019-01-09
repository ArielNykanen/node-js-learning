const path = require('path');
const express = require('express');
const indexData = require('./routes/index')
const usersRoute = require('./routes/users')
const bodyParser = require('body-parser');
const app = express();
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({extended: false}))
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(indexData.route);
app.use('/users', usersRoute);
app.listen(3000);