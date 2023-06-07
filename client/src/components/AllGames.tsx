import { IGame } from '../types/types';
import GameCard from "./GameCard";
import { SERVER_URI } from "../constats";
import useFetch from '../hooks/useFetch';

interface IAllGames {
	fromPanel: boolean;
}

export default function AllGames({ fromPanel }: IAllGames) {
	const url = `${SERVER_URI}catalog/games`;
	const { data: allGames, loading, error } = useFetch<Array<IGame>>(url);
	
	return (
		<>
			{loading && <p>Loading....</p>}
			{allGames ? allGames.map(game => <GameCard game={game} key={game._id} fromPanel={fromPanel} />) : null}
			{error && !allGames && <p>An error has occured, please try again later. Error message: {error}</p>}
		</>
	);
}
