const express = require('express');
const { notes } = require('./db/db');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const { createNewNote, deleteNote } = require('./lib/notes');

const PORT = process.env.PORT || 3001; //Set the port to use the the environment variable
const app = express();

// Middleware to tell the server to turn these files into static resources so we don't need specific endpoints to access them. This lets us access all our front end code
app.use(express.static('public'));

// Parse incoming JSON data
app.use(express.json());

// Returns the index.html file
// The / route brings us to the root route of the server
// sendFile is an Express method that serves a static file if given an absolute path. The path.join method joins given path segments together. __dirname tells us the absolute path of the directory containing the currently executing file 
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

// Returns the notes.html file
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});

// Read the db.json file and return saved notes as JSON
app.get('/api/notes', (req, res) => {
  //let results = notes;
  res.json(notes);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

// Takes in a new note, adds it to the db.json file and returns the new note. Each note will get a unique id
app.post('/api/notes', (req, res) => {
  req.body.id = uuidv4();
  const note = createNewNote(req.body, notes);
  res.json(note);
});

// Deletes a note
app.delete("/api/notes/:id", (req, res) => {
  const deletedNote = deleteNote(notes, req.params['id']);
  res.json(deletedNote);
});

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});