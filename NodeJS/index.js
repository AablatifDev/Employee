const express = require('express');
const { mongoose } = require('./db');
const cors = require('cors');

const employeeController = require('./controllers/employeeController');

let app = express();

app.use(express.json());
app.use(cors({ origin: 'http://localhost:4200' }));

app.listen(3000, () => {
    console.log("Server Started at Port : 3000")
})


app.use('/employees', employeeController);