import { SERVER_URI } from "../constats";
import { handlePost } from "../hooks/handlePost";
import useFetch from "../hooks/useFetch";
import { IGenre } from "../types/types";
import GenreCard from "./GenreCard";
import { FormEvent, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function GenrePanel() {
	const url = `${SERVER_URI}catalog/genres`;
	const { data: genres } = useFetch<Array<IGenre>>(url);
	const [formData, setData] = useState({name: ''})

	const handleSubmit = (event: FormEvent) => {
		event.preventDefault();
		const payload = formData.name.trim();
		if(payload === '') {
			toast('Name cannot be only spaces', {type:'error'})
			return
		}

		const sendData: IGenre = {name:payload, _id:''};

		handlePost(url, sendData);
	}

	return (
		<>
			<form className='center-wrapper-column controls-form' method="POST" action={url} onSubmit={event => handleSubmit(event)}>
				<div>
					<label htmlFor="name">Name</label>
					<input type="text" id="name" name="name" required value={formData.name} onChange={e => setData({...formData, name: e.target.value})}/>
				</div>
				<button className='orange-button' type="submit">Submit</button>
			</form>
			<div className="center-wrapper-column genre-cards-wrapper">
				{genres && genres.map(genre => <GenreCard genre={genre} key={genre._id} />)}
			</div>
			<ToastContainer theme="dark"/>
		</>
	);
}
