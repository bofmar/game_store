import { ChangeEvent, FormEvent, useState } from "react";
import AllGames from "./AllGames";
import { SERVER_URI } from "../constats";
import { ToastContainer, toast } from "react-toastify";
import { IConsole, IGameForm, IGenre, IPublisher } from "../types/types";
import PublisherDropdown from "./PublisherDropdown";
import useFetch from "../hooks/useFetch";
import GenreCheckbox from "./GenreCheckbox";
import ConsoleCheckbox from "./ConsoleCheckbox";


export default function GamePanel() {
	const url = `${SERVER_URI}catalog/games`;
	const [formData, setData] = useState<IGameForm>({kind: 'game', _id: '', title: '', release_date: '', description: '', copies_in_stock: '0', price: '0', publisher: {_id: ''}, genres: [], consoles: [], image: ''});
	const {data: allPublishers} = useFetch<Array<IPublisher>>(`${SERVER_URI}catalog/publishers`);
	const {data: allGenres} = useFetch<Array<IGenre>>(`${SERVER_URI}catalog/genres`);
	const {data: allConsoles} = useFetch<Array<IConsole>>(`${SERVER_URI}catalog/consoles`);

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault();
		const delay = 2000;
		const loadToast = toast.loading('Please wait....');

		const submitData = new FormData();
		submitData.append('_id', '1');
		submitData.append('name', formData.title);
		submitData.append('image', formData.image);

		// TODO Frontend data validation

		const response = await fetch(url, {
			method: 'POST',
			mode: 'cors',
			body: submitData,
		});

		if(response.status === 400){ // The genre already exists
			toast.update(loadToast, { render: `${formData.title} already exists in the database`, type: 'warning', isLoading: false, autoClose: delay });
		} else if(response.status === 201) { // The genre was created successfully
			toast.update(loadToast, { render: `${formData.title} was created`, type: 'success', isLoading: false, autoClose: delay});
			setTimeout(() => window.location.reload(), delay);
		} else { // something went wrong
			toast.update(loadToast, { render: 'Something went wrong. Please try again later', type: 'error', isLoading: false, autoClose: delay});
		}
	}

	const handlePubSelection = (event: ChangeEvent<HTMLSelectElement>) => {
		setData({...formData, publisher : {_id: event.target.value }});
	}

	const handleCheckbox = (event: ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;

		if(formData.genres.includes({_id: value})) { // remove the element
			const newGenres = formData.genres.filter(genre => genre._id !== value);
			setData({...formData, genres: newGenres});
		} else { // add the element
			const newGenres = [...formData.genres];
			newGenres.push({_id: value});
			setData({...formData, genres: newGenres});
		}
	}

	const handleConsoleCheckbox = (event: ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;

		if(formData.consoles.includes({_id: value})) { // remove the element
			const newConsoles = formData.consoles.filter(con => con._id !== value);
			setData({...formData, genres: newConsoles});
		} else { // add the element
			const newConsoles = [...formData.consoles];
			newConsoles.push({_id: value});
			setData({...formData, genres: newConsoles});
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
			<ToastContainer />
		</>
	);
}
