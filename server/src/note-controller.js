const db = require('./db');

const createNote = async (req, res) => {
    const { title, content } = req.body;

    const newNote = {
        title,
        content,
    };

    try {
        const insertedNote = await db.one(
            'INSERT INTO notes(title, content) VALUES($1, $2) RETURNING *',
            [newNote.title, newNote.content]
        );

        res.status(201).json({
            status: 'success',
            message: 'New note created',
            data: insertedNote,
        });
    } catch (error) {
        console.error('Error creating note:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getNoteById = async (req, res) => {
    const { id } = req.params;

    try {
        const note = await db.one('SELECT * FROM notes WHERE id = $1', id);

        res.status(200).json({
            status: 'success',
            message: 'Note retrieved',
            data: note
        });
    } catch (error) {
        console.error('Error getting note by id:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const getAllNotes = async (req, res) => {
    try {
        const notes = await db.any('SELECT * FROM notes');

        res.status(200).json({
            status: 'success',
            message: 'All notes retrieved',
            data: notes,
        });
    } catch (error) {
        console.error('Error getting all notes:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const updateNote = async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;

    const updatedNote = {
        title,
        content,
    };

    try {
        const note = await db.oneOrNone(
            'UPDATE notes SET title = $1, content = $2 WHERE id = $3 RETURNING *',
            [updatedNote.title, updatedNote.content, id]
        );

        res.status(200).json({
            status: 'success',
            message: 'Note updated',
            data: note,
        });
    } catch (error) {
        console.error('Error updating note:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const deleteNote = async (req, res) => {
    const { id } = req.params;

    try {
        await db.none('DELETE FROM notes WHERE id = $1', id);

        res.status(200).json({
            status: 'success',
            message: 'Note deleted',
            data: null,
        });
    } catch (error) {
        console.error('Error deleting note:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = {
    createNote,
    getNoteById,
    getAllNotes,
    updateNote,
    deleteNote,
};