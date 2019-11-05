const express = require('express');
const bodyParser = require('body-parser'); // without this module it is not possible to receive json on request
const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

require('./app/controllers/User')(app);
require('./app/controllers/Client')(app);

app.listen(3000, () => 'listening on', process.env.username);