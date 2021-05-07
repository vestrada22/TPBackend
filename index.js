const express = require('express')
const cors = require('cors');
const { databaseConnection } = require('./db/config');
require('dotenv').config()

// Express server
const app = express();

// Database connection
databaseConnection()

// CORS
app.use( cors() )

// Data parser
app.use( express.json() )

// App routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/', require('./routes/movies'))
app.use('/api/', require('./routes/tv-shows'))

app.listen(process.env.PORT || 3000, () => console.log(`Server on port ${process.env.PORT || 3000}`))