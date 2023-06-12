import { FormEvent, useEffect, useState } from "react";
import { IConsole, IGame, IGameForm, IGenre, IPublisher } from "../types/types";
import PublisherDropdown from "./PublisherDropdown";
import GenreCheckbox from "./GenreCheckbox";
import ConsoleCheckbox from "./ConsoleCheckbox";
import { ChangeEvent } from "react";
import { SERVER_URI } from "../constats";

interface IFormProps {
	url: string;
	handleSubmit: (event: FormEvent, data: IGameForm) => void;
	allPublishers: Array<IPublisher>;
	allGenres: Array<IGenre>;
	allConsoles: Array<IConsole>;
	game?: IGameForm;
}

export default function GameForm({url, handleSubmit, allPublishers, allGenres, allConsoles, game}: IFormProps) {
	const [formData, setData] = useState<IGameForm>({
		_id: game?._id || '',
		title: game?.title || '',
		release_date: game?.release_date ? game?.release_date.slice(0,10) : '',
		description: game?.description || '',
		copies_in_stock: game?.copies_in_stock.toString() || '0',
		price: game?.price.toString() || '0',
		publisher: game?.publisher || {_id: ''},
		genres: game?.genres || [],
		consoles: game?.consoles || [],
		image: game?.image || ''
	});
	const imageUrl = `${SERVER_URI}images/${game?._id}.jpeg`

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
			<form method="POST" action={url} onSubmit={event => handleSubmit(event, formData)}>
				<div>
					{!game && <label htmlFor="title">Name</label>}
					<input type="text" id="title" name="title" required value={formData.title} onChange={e => setData({...formData, title: e.target.value})}/>
				</div>
				<div>
					{!game && <label htmlFor="description">Description</label>}
					<textarea id="description" name="description" required value={formData.description} onChange={e => setData({...formData, description: e.target.value})}/>
				</div>
				<div>
					{!game && <label htmlFor="releaseDate">Release Date</label>}
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
					<img src={imageUrl} id="image"/>
					<input type="file" id="files" name="image" required accept="image/*" onChange={e => { 
						const imageDisplay = document.getElementById('image') as HTMLImageElement;
						const src = URL.createObjectURL(e.target.files![0]);
						imageDisplay.src = src;
						setData({...formData, image: e.target.files![0]
					})}}/>
				</div>
				<PublisherDropdown allPublishers={allPublishers} handlePubSelection={handlePubSelection} game={game ? game : undefined}/>
				<GenreCheckbox allGenres={allGenres} handleCheckbox={handleCheckbox} game={game ? game : undefined}/>
				<ConsoleCheckbox allConsoles={allConsoles} handleGenreCheckbox={handleConsoleCheckbox} game={game ? game: undefined} />
				<button type="submit">Submit</button>
			</form>
	);
}
