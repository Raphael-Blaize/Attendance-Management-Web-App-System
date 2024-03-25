const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;
const jsonParser = bodyParser.json();
const fileName = 'students.json';

// Load data from file
let rawData = fs.readFileSync(fileName);
let data = JSON.parse(rawData);

app.set('views', 'views');
app.set('view engine', 'hbs');
app.use(express.static('public'));

// Route to serve attendance.html page
app.get('/', (req, res) => {
    const filePath = path.join(__dirname, 'public', 'attendance.html');
    res.sendFile(filePath);
});

// Route to serve home.hbs page for user input
app.get('/home', (req, res) => {
    res.render('home');
});

// Route to fetch student data
app.get('/students', (req, res) => {
    res.json(data); // Send back the student data as JSON
});

// This is a RESTful POST web service for adding a new student
app.post('/students', jsonParser, (request, response) => {
    const newStudent = request.body;
    data.push(newStudent);
    fs.writeFileSync(fileName, JSON.stringify(data, null, 2));
    response.json(newStudent); // Send back the newly added student
});


app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
