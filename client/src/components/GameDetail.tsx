import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { SERVER_URI } from "../constats";
import { IGame } from "../types/types";

export default function GameDetail() {
	const { gameId } = useParams();
	const url = `${SERVER_URI}catalog/games/${gameId}`;
	console.log(url);
	const { data: game, loading, error} = useFetch<IGame>(url);
	return (
		<>
			{loading && <p>'Loading...'</p>}
			{game && game.title}
			{error && !game && <p>An error has occured, please try again later. Error message: {error}</p>}
		</>
	);
}
