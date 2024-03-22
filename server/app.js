const express = require('express');
const app = express();
const cors = require('cors');
const port = 8080;

const noteRoutes = require('./src/note-routes');

app.use(express.json());

const corsOptions = {
    origin: 'http://localhost:5173'
}

app.use(cors(corsOptions));

app.use(noteRoutes);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})

module.exports = app;