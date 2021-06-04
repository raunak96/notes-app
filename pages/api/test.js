// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import dbConnect from "../../utils/dbConnect";

const handler = async (req, res) => {
	await dbConnect();
	res.status(200).json({ name: "John Doe" });
};

export default handler;
