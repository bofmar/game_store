import { ChangeEvent, FormEvent, useState } from "react";
import AllGames from "./AllGames";
import { SERVER_URI } from "../constats";
import { ToastContainer} from "react-toastify";
import { IConsole, IGameForm, IGenre, IPublisher } from "../types/types";
import PublisherDropdown from "./PublisherDropdown";
import useFetch from "../hooks/useFetch";
import GenreCheckbox from "./GenreCheckbox";
import ConsoleCheckbox from "./ConsoleCheckbox";
import { v4 } from "uuid";
import { handlePost } from "../hooks/handlePost";

export default function GamePanel() {
	const url = `${SERVER_URI}catalog/games`;
	const [formData, setData] = useState<IGameForm>({kind: 'game', _id: '', title: '', release_date: '', description: '', copies_in_stock: '0', price: '0', publisher: {_id: ''}, genres: [], consoles: [], image: ''});
	const {data: allPublishers} = useFetch<Array<IPublisher>>(`${SERVER_URI}catalog/publishers`);
	const {data: allGenres} = useFetch<Array<IGenre>>(`${SERVER_URI}catalog/genres`);
	const {data: allConsoles} = useFetch<Array<IConsole>>(`${SERVER_URI}catalog/consoles`);

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault();
		const id = v4().split('-').join('').slice(0,12);

		// Prepare data
		const payload = new FormData();
		payload.append('_id', id);
		payload.append('title', formData.title);
		payload.append('release_date', formData.release_date);
		payload.append('description', formData.description);
		payload.append('copies_in_stock', formData.copies_in_stock);
		payload.append('price', formData.price);
		payload.append('publisher', JSON.stringify(formData.publisher));
		payload.append('consoles', JSON.stringify(formData.consoles));
		payload.append('genres', JSON.stringify(formData.genres));
		payload.append('image', formData.image);

		// TODO Frontend data validation
		handlePost(url, payload);
	}

	const handlePubSelection = (event: ChangeEvent<HTMLSelectElement>) => {
		setData(prevData => ({...prevData, publisher : {_id: event.target.value }}));
	}

	const handleCheckbox = (event: ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;

		if(formData.genres.some(genre => genre._id === value)) { // remove the element
			const newGenres = formData.genres.filter(genre => genre._id !== value);
			setData(prevData => ({...prevData, genres: newGenres}));
		} else { // add the element
			const newGenres = [...formData.genres];
			newGenres.push({_id: value});
			setData(prevData => ({...prevData, genres: newGenres}));
		}
	}

	const handleConsoleCheckbox = (event: ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;

		if(formData.consoles.some(con => con._id === value)) { // remove the element
			const newConsoles = formData.consoles.filter(con => con._id !== value);
			setData(prevData => ({...prevData, genres: newConsoles}));
		} else { // add the element
			const newConsoles = [...formData.consoles];
			newConsoles.push({_id: value});
			setData(prevData => ({...prevData, consoles: newConsoles}));
		}
	}

	return (
		<>
			<form method="POST" action={url} onSubmit={event => handleSubmit(event)}>
				<div>
					<label htmlFor="title">Name</label>
					<input type="text" id="title" name="title" required value={formData.title} onChange={e => setData({...formData, title: e.target.value})}/>
				</div>
				<div>
					<label htmlFor="description">Description</label>
					<textarea id="description" name="description" required value={formData.description} onChange={e => setData({...formData, description: e.target.value})}/>
				</div>
				<div>
					<label htmlFor="releaseDate">Release Date</label>
					<input type="date" id="releaseDate" name="releaseDate" required value={formData.release_date} onChange={e => setData({...formData, release_date: e.target.value})}/>
				</div>
				<div>
					<label htmlFor="copies">Copies in stock </label>
					<input type="number" id="copies" name="copies" min='0' required value={formData.copies_in_stock} onChange={e => setData({...formData, copies_in_stock: e.target.value})}/>
				</div>
				<div>
					<label htmlFor="price">Price</label>
					<input type="number" id="price" name="price" step='0.01' min='0' required value={formData.price} onChange={e => setData({...formData, price: e.target.value})}/>
				</div>
				<div>
					<input type="file" id="image" name="image" required accept="image/*" onChange={e => setData({...formData, image: e.target.files![0]})}/>
				</div>
				{allPublishers && <PublisherDropdown allPublishers={allPublishers as Array<IPublisher>} handlePubSelection={handlePubSelection} /> }
				{allGenres && <GenreCheckbox allGenres={allGenres} handleCheckbox={handleCheckbox}/>}
				{allConsoles && <ConsoleCheckbox allConsoles={allConsoles} handleGenreCheckbox={handleConsoleCheckbox}/>}
				<button type="submit">Submit</button>
			</form>
			<AllGames fromPanel={true} />
			<ToastContainer theme="dark"/>
		</>
	);
}
