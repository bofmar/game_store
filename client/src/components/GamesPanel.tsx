import { FormEvent, useState } from "react";
import AllGames from "./AllGames";
import { SERVER_URI } from "../constats";
import { ToastContainer} from "react-toastify";
import { IConsole, IGameForm, IGenre, IPublisher } from "../types/types";
import useFetch from "../hooks/useFetch";
import { v4 } from "uuid";
import { handlePost } from "../hooks/handlePost";
import GameForm from "./GameForm";

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


	return (
		<>
			{allPublishers && allGenres && allConsoles && <GameForm url={url} handleSubmit={handleSubmit} allPublishers={allPublishers} allGenres={allGenres} allConsoles={allConsoles}/>}
			<AllGames fromPanel={true} />
			<ToastContainer theme="dark"/>
		</>
	);
}
