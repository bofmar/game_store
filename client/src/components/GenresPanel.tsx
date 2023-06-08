import { SERVER_URI } from "../constats";
import useFetch from "../hooks/useFetch";
import { IGenre } from "../types/types";
import GenreCard from "./GenreCard";
import { FormEvent, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function GenrePanel() {
	const url = `${SERVER_URI}catalog/genres`;
	const { data: genres, loading } = useFetch<Array<IGenre>>(url);
	const [formData, setData] = useState({name: ''})

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		const loadToast = toast.loading('Please wait...');

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
			toast.update(loadToast, { render: `${formData.name} already exists in the database`, type: 'warning', isLoading: false });
			console.log('show toast');
		} else if(response.status === 201) { // The genre was created successfully
			toast.update(loadToast, { render: `${formData.name} was created`, type: 'success', isLoading: false });
			console.log('show toast, refresh on closing the toast');
			setTimeout(() => window.location.reload(), 5000);
		} else { // something went wrong
			toast.update(loadToast, { render: 'Something went wrong. Please try again later', type: 'error', isLoading: false });
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
			<ToastContainer autoClose={5000} theme="dark"/>
		</>
	);
}
