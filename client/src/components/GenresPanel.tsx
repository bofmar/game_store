import { SERVER_URI } from "../constats";
import { handlePost } from "../hooks/handlePost";
import useFetch from "../hooks/useFetch";
import { IGenre } from "../types/types";
import GenreCard from "./GenreCard";
import { FormEvent, useState } from "react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function GenrePanel() {
	const url = `${SERVER_URI}catalog/genres`;
	const { data: genres, loading } = useFetch<Array<IGenre>>(url);
	const [formData, setData] = useState({name: ''})

	const handleSubmit = (event: FormEvent) => {
		event.preventDefault();
		// validate data TODO

		const sendData: IGenre = {...formData, kind: 'genre', _id:''};

		handlePost(url, sendData);
	}

	return (
		<>
			<form method="POST" action={url} onSubmit={event => handleSubmit(event)}>
				<label htmlFor="name">Name</label>
				<input type="text" id="name" name="name" required value={formData.name} onChange={e => setData({...formData, name: e.target.value})}/>
				<button type="submit">Submit</button>
			</form>
			{loading && <p>'Loading....'</p>}
			{genres && genres.map(genre => <GenreCard genre={genre} key={genre._id} />)}
			<ToastContainer theme="dark"/>
		</>
	);
}
