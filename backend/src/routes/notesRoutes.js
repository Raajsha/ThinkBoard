import express from 'express';
import { getNotes, createNote, updateNote, deleteNote, getNoteByID } from '../controllers/notesControllers.js';

const router = express.Router();

router.get("/", getNotes);
router.get("/:id", getNoteByID);
router.post("/", createNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

export default router;