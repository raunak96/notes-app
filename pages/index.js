// import axios from "axios";
import NoteCard from "../components/NoteCard";
import Note from "../models/Note";
import dbConnect from "../utils/dbConnect";

export default function Home({ notes }) {
	return (
		<main className="w-full flex flex-col pb-6 my-6 space-y-10">
			<h1 className="text-center text-2xl">Notes</h1>
			<div className="max-w-5xl w-5/6 mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto">
				{notes?.map(note => (
					<NoteCard
						key={note._id}
						title={note.title}
						id={note._id}
						description={note.description}
					/>
				))}
			</div>
		</main>
	);
}

export async function getServerSideProps() {
	await dbConnect();
	const notes = await Note.find({});
	return {
		props: { notes: JSON.parse(JSON.stringify(notes)) },
	};
}
