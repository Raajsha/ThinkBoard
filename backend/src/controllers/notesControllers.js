import Note from '../models/Note.js';
export async function getNotes(_, res){
    try {
        const notes = await Note.find().sort({ createdAt: -1 }); // Sort by createdAt in descending order
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
        console.error("Error fetching notes:", error);
    }
}

export async function getNoteByID(req,res) {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }
        res.status(200).json(note);
    } catch (error) {
        res.status(500).json({ message: "Error fetching note by ID" });
        console.error("Error fetching note by ID:", error);
    }
}
export async function createNote(req, res){
    try {
        const { title, content } = req.body;
        const note = new Note({
            title,
            content
        });
        const savedNote = await note.save();
        res.status(201).json({ message: "Note created successfully", note: savedNote });
    } catch (error) {
        res.status(500).json({ message: "Error in createNote controller" });
        console.error("Error fetching notes:", error);
    }
}
export async function updateNote(req, res){  
   try {
    const updates = {};
    const { id } = req.params;

    if(req.body.title !== undefined) updates.title = req.body.title;
    if(req.body.content !== undefined) updates.content = req.body.content;
    const updatedNote = await Note.findByIdAndUpdate(id, updates, { new: true });

    if(!updatedNote) return res.status(404).json({ message: "Note not found" });

    res.status(200).json({ message: "Note updated successfully" , note: updatedNote });

   } catch (error) {

    res.status(500).json({ message: "Error in updateNote controller" });
    console.error("Error updating note:", error);

   }
}
export async function deleteNote(req, res){
    try {
        const { id } = req.params;
        const deletedNote = await Note.findByIdAndDelete(id);

        if(!deletedNote) {
            return res.status(404).json({ message: "Note not found" });
        }

        res.status(200).json({ message: "Note deleted successfully" });
    } catch (error) {

        res.status(500).json({ message: "Error in deleteNote controller" });

        console.error("Error deleting note:", error);
    }
}