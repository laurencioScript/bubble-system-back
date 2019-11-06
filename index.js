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

app.listen(3000, () => 'listening on', process.env.username);