import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { SERVER_URI } from "../constats";
import { IConsole, IGameForm, IGenre, IPublisher } from "../types/types";
import GameForm from "./GameForm";
import { FormEvent } from "react";
import { handleUpdate } from "../hooks/handleUpdate";
import { ToastContainer } from "react-toastify";

export default function GameEdit() {
	const { gameId } = useParams();
	const getUrl = `${SERVER_URI}catalog/games/${gameId}`;
	const postUrl = `${SERVER_URI}catalog/games/${gameId}/update`;

	const { data: game } = useFetch<IGameForm>(getUrl);
	const {data: allPublishers} = useFetch<Array<IPublisher>>(`${SERVER_URI}catalog/publishers`);
	const {data: allGenres} = useFetch<Array<IGenre>>(`${SERVER_URI}catalog/genres`);
	const {data: allConsoles} = useFetch<Array<IConsole>>(`${SERVER_URI}catalog/consoles`);

	const handleSubmit = async (event: FormEvent, formData: IGameForm) => {
		event.preventDefault();

		// Prepare data
		const payload = new FormData();
		payload.append('_id', gameId as string);
		payload.append('title', formData.title.trim());
		payload.append('release_date', formData.release_date.trim());
		payload.append('description', formData.description.trim());
		payload.append('copies_in_stock', formData.copies_in_stock.trim());
		payload.append('price', formData.price.trim());
		payload.append('publisher', JSON.stringify(formData.publisher));
		payload.append('consoles', JSON.stringify(formData.consoles));
		payload.append('genres', JSON.stringify(formData.genres));
		payload.append('image', formData.image);

		handleUpdate(postUrl, payload);
	}

	return (
		<>
			{game &&
			allPublishers &&
			allGenres &&
			allConsoles &&
			<GameForm url='test' handleSubmit={handleSubmit} allGenres={allGenres} allPublishers={allPublishers} allConsoles={allConsoles} game={game}/>
			} 
			<ToastContainer theme="dark" />
		</>
	);
}
