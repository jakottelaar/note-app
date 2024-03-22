const Router = require('express').Router;
const router = Router();
const { createNote, getNoteById, getAllNotes, updateNote, deleteNote } = require('./note-controller');

router.post("/note", createNote);
router.get("/note/:id", getNoteById);
router.get("/note", getAllNotes);
router.put("/note/:id", updateNote);
router.delete("/note/:id", deleteNote);

module.exports = router;