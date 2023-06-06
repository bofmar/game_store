import { IGame } from '../types/types';
import GameCard from "./GameCard";
import { SERVER_URI } from "../constats";
import useFetch from '../hooks/useFetch';

export default function AllGames() {
	const url = `${SERVER_URI}catalog/games`;
	const { data: allGames, loading, error } = useFetch<Array<IGame>>(url);
	
	return (
		<>
			{loading && 'loading....'}
			{allGames ? allGames.map(game => <GameCard game={game} key={game._id} />) : null}
			{error && !allGames && <p>An error has occured, please try again later. Error message: {error}</p>}
		</>
	);
}
