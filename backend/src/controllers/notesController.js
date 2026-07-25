import Note from "../../models/Note.js";

export async function getAllNotes(req,res){
    try{
        const notes = await Note.find().sort({createdAt:-1});
        res.status(200).json(notes);
        //res.status(200).send("you just fetched the notes");
    } catch(error)
    {
        console.error("error in getAllNotes controller", error);
        res.status(500).json({message:"internal server error"});
    }
}

export async function getNoteByID(req,res){
    try{
        const note = await Note.findById(req.params.id);
        if(!note) return res.status(404).json({message:"note not found"});
        res.json(note);
        //res.status(200).json(notes);
        //res.status(200).send("you just fetched the notes");
    } catch(error)
    {
        console.error("error in getNoteByID controller", error);
        res.status(500).json({message:"internal server error"});
    }
}

export async function createNote(req,res){
    try{
        const {title, content} = req.body;
        //console.log(title, content);
        const newNote = new Note({title:title, content: content});

        const savedNote = await newNote.save();
        res.status(201).json(savedNote);
        //res.status(201).json({message:"note created successfully!"});
    }   catch(error){
        console.error("error in createNote controller",error);
        res.status(500).json({message:"internal server error"});
    }
}

export async function updateNote(req,res){
    try{
        const{title, content} = req.body;
        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            {title,content},
            {
                new: true,
            }
        );
        if(!updatedNote) return res.status(404).json({message:"note not found"});
        //res.status(200).json({message})
        res.status(200).json(updatedNote);
    } catch(error)
    {
        console.error("error in updateNote controller",error);
        res.status(500).json({message:"internal server error"});
    }
}

export async function deleteNote(req,res){
    try{
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        if(!deletedNote) return res.status(404).json({message:"note not found"});
        res.status(200).json({message:"note deleted!"}) ;
    } catch(error){
        console.error("error in deleteNote controller",error);
        res.status(500).json({message:"internal server error"});
    }
}

