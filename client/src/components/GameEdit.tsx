import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { SERVER_URI } from "../constats";
import { IConsole, IGameForm, IGenre, IPublisher } from "../types/types";
import GameForm from "./GameForm";
import { FormEvent } from "react";

export default function GameEdit() {
	const { gameId } = useParams();
	const getUrl = `${SERVER_URI}catalog/games/${gameId}`;

	const { data: game } = useFetch<IGameForm>(getUrl);
	const {data: allPublishers} = useFetch<Array<IPublisher>>(`${SERVER_URI}catalog/publishers`);
	const {data: allGenres} = useFetch<Array<IGenre>>(`${SERVER_URI}catalog/genres`);
	const {data: allConsoles} = useFetch<Array<IConsole>>(`${SERVER_URI}catalog/consoles`);

	const handleSubmit = async (event: FormEvent, formData: IGameForm) => {
		event.preventDefault();

		console.log(formData);
	}
	return (
		<>
			{game &&
			allPublishers &&
			allGenres &&
			allConsoles &&
			<GameForm url='test' handleSubmit={handleSubmit} allGenres={allGenres} allPublishers={allPublishers} allConsoles={allConsoles} game={game}/>
			} 
		</>
	);
}
