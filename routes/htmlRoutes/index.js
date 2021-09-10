const path = require('path'); 
const router = require('express').Router(); 

// Returns the index.html file
// The / route brings us to the root route of the server
// sendFile is an Express method that serves a static file if given an absolute path. The path.join method joins given path segments together. __dirname tells us the absolute path of the directory containing the currently executing file 
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/index.html'));
});

// Returns the notes.html file
router.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/notes.html'));
});

router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/index.html'));
});

module.exports = router; 