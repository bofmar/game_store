import { useParams } from "react-router-dom";
import { SERVER_URI } from "../constats";
import useFetch from "../hooks/useFetch";
import { FormEvent, useEffect, useState } from "react";
import { IGenre } from "../types/types";
import { handlePost } from "../hooks/handlePost";

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
		// validate data TODO

		const sendData: IGenre = {...formData, _id:''};

		handlePost(postUrl, sendData);
	}

	return (
			<form method="POST" action={postUrl} onSubmit={event => handleSubmit(event)}>
				<label htmlFor="name">Name</label>
				{genre && <input type="text" id="name" name="name" required value={formData.name} onChange={e => setData({...formData, name: e.target.value})}/> }
				{genre && <button type="submit">Submit</button>}
			</form>
	);
}
