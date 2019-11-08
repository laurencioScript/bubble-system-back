const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser'); // without this module it is not possible to receive json on request
const app = express();

app.use(cors())
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

require('./app/controllers/User')(app);
require('./app/controllers/Client')(app);
require('./app/controllers/Unity')(app);
require('./app/controllers/Login')(app);
require('./app/controllers/Piece')(app);
require('./app/controllers/Color')(app);
require('./app/controllers/Characteristic')(app);
require('./app/controllers/Defect')(app);


app.listen(3000, () => 'listening on', process.env.username);