const path = require('path');
const rootDir = require('./util/path')
const express = require('express');
  // routing exports dont need to be in order unless you use "use" in the routes
const userRouting = require('./routes/user');
const homeRouting = require('./routes/home');
app = express();
app.listen(3000);
app.use(express.static(path.join(__dirname, 'public')));
app.use('/user', userRouting);
app.use(homeRouting);
app.use((req, res, next) => {
  res.sendFile(path.join(rootDir, 'views', '404.html'))
});
 