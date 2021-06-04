import Note from "../../../models/Note";
import dbConnect from "../../../utils/dbConnect";
import handleError from "../../../utils/errorHandler";

const handler = async (req, res) => {
	await dbConnect();
	switch (req.method) {
		case "GET":
			try {
				const notes = await Note.find({});
				res.status(200).json({ success: true, data: notes });
			} catch (error) {
				handleError(res, error);
			}
			break;
		case "POST":
			try {
				const note = await Note.create(req.body);
				res.status(201).json({ success: true, data: note });
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
