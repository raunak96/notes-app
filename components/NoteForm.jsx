import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";

const NoteForm = ({ formTitle, note }) => {
	const [formData, setFormData] = useState({
		title: { value: note?.title ?? "", isClean: true },
		description: { value: note?.description ?? "", isClean: true },
	});
	const [errors, setErrors] = useState({});
	const { title, description } = formData;
	const router = useRouter();

	useEffect(() => {
		validateForm();
	}, [title, description]);

	const validateForm = () => {
		const validationErrors = {};
		if (!title.isClean) {
			if (title.value === "")
				validationErrors.title = "Title is required!";
			else if (title.value.length > 15 || title.value.length < 5)
				validationErrors.title =
					"Title has to be between 6 and 14 characters!";
		}
		if (!description.isClean) {
			if (description.value === "")
				validationErrors.description = "Description is required!";
			else if (description.value.length > 1000)
				validationErrors.description =
					"Description cannot exceed 1000 characters!";
		}
		setErrors(validationErrors);
	};
	const isFormDirty = useMemo(() => {
		if (note)
			return (
				Object.keys(errors).length > 0 ||
				(title.isClean && description.isClean)
			);
		return (
			Object.keys(errors).length > 0 ||
			title.isClean ||
			description.isClean
		);
	}, [note, errors, title, description]);

	const handleChange = e => {
		const { name, value } = e.target;
		validateForm();
		setFormData(prev => ({
			...prev,
			[name]: { value, isClean: note?.[name] === value ? true : false },
		}));
	};
	const handleSubmit = e => {
		e.preventDefault();
		if (!isFormDirty) modifyNote();
	};
	const modifyNote = async () => {
		try {
			await axios({
				method: note ? "PUT" : "POST",
				url: note ? `/api/notes/${note._id}` : "/api/notes",
				data: {
					title: title.value,
					description: description.value,
				},
			});
			router.push(`${note ? `/${note._id}` : "/"}`);
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div className="w-4/5 sm:max-w-lg mx-auto mt-8">
			<h1 className="text-center text-3xl text-blue-700 mb-5">
				{formTitle}
			</h1>
			<form onSubmit={handleSubmit}>
				<div className="mb-4">
					<label
						htmlFor="title"
						className="text-sm text-gray-700 block mb-2">
						Title
					</label>
					<input
						className="w-full focus:border-blue-300 p-3 outline-none border border-gray-300 bg-white rounded text-gray-600 placeholder-gray-300 shadow-sm"
						type="text"
						name="title"
						id="title"
						placeholder="What is the note called?"
						onChange={handleChange}
						value={title.value}
					/>
					{errors?.title && (
						<p className="text-red-500">{errors.title}</p>
					)}
				</div>
				<div className="mb-4">
					<label
						htmlFor="description"
						className="text-sm text-gray-700 block mb-2">
						Description
					</label>
					<textarea
						className="w-full focus:border-blue-300 p-3 outline-none border border-gray-300 bg-white resize-none rounded text-gray-600 placeholder-gray-300 shadow-sm"
						name="description"
						id="description"
						rows="10"
						placeholder="What's the note about?"
						value={description.value}
						onChange={handleChange}></textarea>
					{errors?.description && (
						<p className="text-red-500">{errors.description}</p>
					)}
				</div>
				<button
					type="submit"
					disabled={isFormDirty}
					className=" px-4 py-2 bg-black text-white hover:opacity-80 rounded-md disabled:opacity-70 disabled:cursor-not-allowed">
					{note ? "Update" : "Create"}
				</button>
			</form>
		</div>
	);
};

export default NoteForm;
