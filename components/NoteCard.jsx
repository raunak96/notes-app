import Link from "next/link";

const NoteCard = ({ title, id, description }) => {
	return (
		<div className="bg-white shadow-xl p-4 rounded-lg border border-gray-200">
			<div className="border-b border-gray-200 w-full pb-2">
				<Link href={`/${id}`}>
					<a className="text-blue-600 font-bold text-lg transition duration-300 hover:text-2xl">
						{title}
					</a>
				</Link>
			</div>
			<p className="py-2 max-w-full text-base overflow-hidden overflow-ellipsis whitespace-nowrap">
				{description}
			</p>
			<div className="flex space-x-3 mt-3">
				<Link href={`/${id}`}>
					<button className="px-4 py-1 rounded-sm text-white bg-blue-500 focus:outline-none hover:bg-blue-700">
						View
					</button>
				</Link>
				<Link href={`/${id}/edit`}>
					<button className="px-4 py-1 rounded-sm text-white bg-blue-500 focus:outline-none hover:bg-blue-700">
						Edit
					</button>
				</Link>
			</div>
		</div>
	);
};

export default NoteCard;
