import React, {useState, useEffect} from 'react'
import postApi from '../../api/posts';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { toast } from 'react-toastify';
import {useUser} from "../../contexts/UserContext"

const EditPost = () => {
	const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
	const [loading, setLoading] =useState(true);
	const {user} = useUser();
	const {id} = useParams()
  const history = useHistory();

	const handleFileChange = (e) => {
		e.preventDefault();
		const selectedFile = e.target.files[0];
		setFile(selectedFile);
	 
		if (selectedFile) {
			const fileReader = new FileReader();
			fileReader.onloadend = () => {
			 const img = new Image();
			 img.src = fileReader.result;
	 
			 img.onload = () => {
				// Optional: Add any maximum width or height constraint logic here
				setImagePreview({
					src: img.src,
					width: img.naturalWidth,
					height: img.naturalHeight,
				});
			 };
			};
			fileReader.readAsDataURL(selectedFile);
		}
	 };

	useEffect(()=>{
		const fetchPost = async () => {
			try {
				const res = await postApi.show(id)
				setTitle(res.data.title);
				setDescription(res.data.content);
				setImagePreview({
					src: res.data.image,
					width: res.data.image.naturalWidth,
					height: res.data.image.naturalHeight
				});
				setLoading(false)
			} catch (error) {
				console.log(error);
			}
		}
		fetchPost();
	},[])

	const handleSubmit = async (e)=>{
		e.preventDefault();
		try {
			const formData = new FormData();
      formData.append("post[title]", title);
      formData.append("post[description]", description);
      formData.append("post[image]", file);
			formData.append("post[user_id]", user.id)

			const response = await postApi.edit(id, formData)
			toast.success(response.data.message);
			history.push("/")
		} catch (error) {
			// toast.error(error.response.data.error[0])
			console.log(error);
		}
	}

	if (loading) {
    return( 
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="w-10 h-10 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    )
  }

	return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-4 space-y-6">
      <div>
        <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">
          Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 dark:bg-gray-800 dark:text-white dark:border-gray-600"
          placeholder="Enter title"
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium text-gray-700 dark:text-gray-200">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 dark:bg-gray-800 dark:text-white dark:border-gray-600"
          placeholder="Enter description"
          rows="3"
          required
        />
      </div>

      <div className="flex items-center justify-center w-full">
			<label
				htmlFor="dropzone-file"
				className="flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
			>
				<div className="flex flex-col items-center justify-center p-4 w-full">
				{imagePreview ? (
					<div
						className="rounded-md overflow-hidden border"
						style={{
							width: `${imagePreview.width}px`,
							height: `${imagePreview.height}px`,
							maxWidth: "100%",
							maxHeight: "500px",
						}}
					>
						<img
							src={imagePreview.src}
							alt="preview"
							className="w-full h-full object-contain"
						/>
					</div>
					) : (
					<>
						<svg
							className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 20 16"
							aria-hidden="true"
						>
							<path
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 
								5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 
								5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
							/>
						</svg>
						<p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
							<span className="font-semibold">Click to upload</span> or drag and drop
						</p>
						<p className="text-xs text-gray-500 dark:text-gray-400">
							SVG, PNG, JPG or GIF (MAX. 800x400px)
						</p>
					</>
					)}
				</div>
				<input
					id="dropzone-file"
					type="file"
					className="hidden"
					onChange={handleFileChange}
					accept=".svg,.png,.jpg,.jpeg,.gif"
					required
				/>
			</label>
			</div>


      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
      >
        Submit
      </button>
    </form>
  );
}

export default EditPost