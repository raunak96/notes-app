import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema({
	title: {
		type: String,
		required: [true, "Please add a Title"],
		unique: true,
		maxlength: [40, "Title cannot exceed 40 characters"],
	},
	description: {
		type: String,
		required: [true, "Please add description"],
		maxlength: [1000, "Description cannot exceed 1000 characters"],
	},
});

export default mongoose.models.Note || mongoose.model("Note", NoteSchema);
