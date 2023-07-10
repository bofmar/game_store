import { useParams } from "react-router-dom";
import { SERVER_URI } from "../constats";
import useFetch from "../hooks/useFetch";
import { FormEvent, useEffect, useState } from "react";
import { IGenre } from "../types/types";
import { ToastContainer, toast } from "react-toastify";
import { handleUpdate } from "../hooks/handleUpdate";

export default function GenreDetail() {
	const { genreId } = useParams();
	const getUrl = `${SERVER_URI}catalog/genres/${genreId}`
	const postUrl = `${SERVER_URI}catalog/genres/${genreId}/update`
	const { data: genre } = useFetch<IGenre>(getUrl);
	const [formData, setData] = useState({ name: ''});

	useEffect(() => {
		setData((prevData) => { return {...prevData, name: genre? genre.name : ''} });
	},[genre]);

	const handleSubmit = (event: FormEvent) => {
		event.preventDefault();
		const payload = formData.name.trim();
		if(payload === '') {
			toast('Name cannot be only spaces', {type:'error'})
			return
		}

		const sendData: IGenre = {...formData, _id:''};

		handleUpdate(postUrl, sendData);
	}

	return (
		<div>
			<form method="POST" action={postUrl} onSubmit={event => handleSubmit(event)}>
				<label htmlFor="name">Name</label>
				{genre && <input type="text" id="name" name="name" required value={formData.name} onChange={e => setData({...formData, name: e.target.value})}/> }
				{genre && <button className='orange-button' type="submit">Submit</button>}
			</form>
			<ToastContainer theme="dark" />
		</div>
	);
}
