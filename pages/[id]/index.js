import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import Note from "../../models/Note";
import dbConnect from "../../utils/dbConnect";

const NoteDetails = ({ note }) => {
	const [openModal, setOpenModal] = useState(false);
	const router = useRouter();
	const deleteNote = async () => {
		try {
			await axios.delete(`/api/notes/${router.query.id}`);
			router.push("/");
		} catch (error) {
			console.log(error);
			setOpenModal(false);
		}
	};
	return (
		<>
			<Head>
				<title>{note?.title ?? "Loading Note"}</title>
			</Head>
			<>
				{!openModal && note && (
					<div className="w-4/5 mx-auto my-6 pb-6">
						<h1 className="text-3xl text-center mb-4 text-blue-600">
							{note?.title}
						</h1>
						<pre className="text-gray-600 font-serif whitespace-normal">
							{note?.description}
						</pre>
						<button
							onClick={() => setOpenModal(true)}
							className="mt-10 bg-red-600 py-2 px-4 rounded text-white focus:outline-none hover:bg-red-700">
							Delete
						</button>
					</div>
				)}
			</>
			<>
				{openModal && (
					<div className="bg-black opacity-80 fixed top-0 bottom-0 right-0 left-0 flex items-center z-40 w-full h-screen overflow-hidden">
						<div className="max-w-96 w-1/2 mx-auto bg-white p-5 rounded-lg">
							<h1 className="text-center text-red-600 border-b border-gray-400 pb-2">
								Confirm Delete
							</h1>
							<p className="text-center text-gray-700 mt-3">
								Are you sure you want to delete Note:{" "}
								<strong>{note.title}</strong>?
							</p>
							<div className="flex justify-end p-5 pb-2 space-x-5">
								<button
									className="bg-gray-400 rounded outline-none px-3 py-2 hover:bg-gray-500"
									onClick={() => setOpenModal(false)}>
									Cancel
								</button>
								<button
									onClick={deleteNote}
									className="bg-blue-700 rounded outline-none px-3 py-2 uppercase text-white hover:bg-blue-800">
									Ok
								</button>
							</div>
						</div>
					</div>
				)}
			</>
		</>
	);
};

export default NoteDetails;

export async function getServerSideProps({ params }) {
	await dbConnect();
	const note = await Note.findById(params.id).lean();
	if (note) note._id = note?._id?.toString();
	return {
		props: { note },
	};
}
