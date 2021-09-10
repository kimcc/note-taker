const router = require('express').Router(); 

const { createNewNote, validateNote, deleteNote } = require('../../lib/notes');
const { notes } = require('../../db/db.json');
const { v4: uuidv4 } = require('uuid');

// Read the db.json file and return saved notes as JSON
router.get('/notes', (req, res) => {
  res.json(notes);
});

// Takes in a new note, adds it to the db.json file and returns the new note. Each note will get a unique id
router.post('/notes', (req, res) => {
  req.body.id = uuidv4();

  if(!validateNote(req.body)) {
    res.status(400).send("Please enter a title and text for your note.");
  } else {
    const note = createNewNote(req.body, notes);
    res.json(note);
  }
});

// Deletes a note
router.delete("/notes/:id", (req, res) => {
  const deletedNote = deleteNote(notes, req.params['id']);
  res.json(deletedNote);
});

module.exports = router; 