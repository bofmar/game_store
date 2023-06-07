import { SERVER_URI } from "../constats";
import useFetch from "../hooks/useFetch";
import { IGenre } from "../types/types";
import GenreCard from "./GenreCard";
import { FormEvent, useState } from "react";

export default function GenrePanel() {
	const url = `${SERVER_URI}catalog/genres`;
	const { data: genres, loading } = useFetch<Array<IGenre>>(url);
	const [formData, setData] = useState({name: ''})

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		const response = await fetch(url, {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(formData),
		});
		// TODO: HANDLE THE TOASTS
		if(response.status === 400){ // The genre already exists
			console.log('show toast');
		} else if(response.status === 201) { // The genre was created successfully
			console.log('show toast, refresh on closing the toast');
			window.location.reload();
		} else { // something went wrong
			console.log('show toast');
		}

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
		</>
	);
}
