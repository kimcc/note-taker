const fs = require("fs");
const path = require("path");

// Create a new note and write it to the json file
function createNewNote(body, notes) {
  const note = body;
  notes.push(note);
  fs.writeFileSync(
    path.join(__dirname, "../db/db.json"),
    JSON.stringify({notes}, null, 2)
  );
  return note;
}

// Check the note content
function validateNote(note) {
  if (!note.title || typeof note.title !== "string") {
    return false;
  }
  if (!note.text || typeof note.text !== "string") {
    return false;
  }
  return true;
}

// Delete a note in the json file based on id
function deleteNote(notes, id) {
  const note = notes.find(item => item.id === id);
  const noteIndex = notes.indexOf(note);
  notes.splice(noteIndex, 1);

  fs.writeFileSync(
    path.join(__dirname, "../db/db.json"),
    JSON.stringify({notes}, null, 2)
  )
  return notes;
}

module.exports = { createNewNote, validateNote, deleteNote };