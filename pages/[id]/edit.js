import NoteForm from "../../components/NoteForm";
import Note from "../../models/Note";
import dbConnect from "../../utils/dbConnect";

const EditNote = ({ note }) => {
	return <NoteForm formTitle={`Edit Note: ${note.title}`} note={note} />;
};

export default EditNote;

export async function getServerSideProps({ params }) {
	await dbConnect();
	const note = await Note.findById(params.id).lean();
	note._id = note._id.toString();
	return {
		props: { note },
	};
}
