const mongoose = require("mongoose");

const noteSchema = mongoose.Schema({
    task:String,
    completed:Boolean,
    UserID:String
})

const NoteModel = mongoose.model("note",noteSchema);

module.exports = {NoteModel}