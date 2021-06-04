import Note from "../../../models/Note";
import dbConnect from "../../../utils/dbConnect";
import handleError from "../../../utils/errorHandler";
import mongoose from "mongoose";

const handler = async (req, res) => {
	await dbConnect();
	const {
		method,
		query: { id },
	} = req;
	switch (method) {
		case "GET":
			try {
				const note = await Note.findById(id);
				if (!note)
					return res
						.status(404)
						.json({ success: false, msg: "Note not found" });
				res.status(200).json({ success: true, data: note });
			} catch (error) {
				if (!mongoose.Types.ObjectId.isValid(id))
					return res
						.status(404)
						.json({
							success: false,
							msg: "Id not in proper format",
						});
				handleError(res, error);
			}
			break;
		case "PUT":
			try {
				const updatedNote = await Note.findOneAndUpdate(
					{ _id: id },
					req.body,
					{ new: true, runValidators: true }
				);
				if (!updatedNote)
					return res
						.status(404)
						.json({ success: false, msg: "Note not found" });
				res.status(200).json({ success: true, data: updatedNote });
			} catch (error) {
				handleError(res, error);
			}
			break;
		case "DELETE":
			try {
				const deletedNote = await Note.deleteOne({ _id: id });
				if (!deletedNote.deletedCount)
					return res
						.status(404)
						.json({ success: false, msg: "Note not found" });
				res.status(200).json({ success: true, data: {} });
			} catch (error) {
				handleError(res, error);
			}
			break;
		default:
			res.status(405).json({ success: false });
			break;
	}
};

export default handler;
