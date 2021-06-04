import mongoose from "mongoose";

const handleError = (res, error) => {
	const errorRes = { success: false, msg: "Internal Server Error" };
	if (error instanceof mongoose.Error.ValidationError) {
		const errors = Object.values(error.errors).map(err => err.message);
		errorRes.msg = errors.join(", ");
		return res.status(422).json(errorRes);
	}
	return res.status(500).json(errorRes);
};
export default handleError;
