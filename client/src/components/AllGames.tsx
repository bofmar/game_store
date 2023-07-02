import { IFilters, IGame } from '../types/types';
import GameCard from "./GameCard";
// TODO Add better error message


interface IAllGames {
	fromPanel: boolean;
	games: Array<IGame>;
	filters?: IFilters;
}


export default function AllGames({ fromPanel, games, filters }: IAllGames) {

	const filterGames = (): Array<IGame> => {
		let filteredGames = games;

		if (filters) {
			if (filters.title !== '') {
				filteredGames = filteredGames.filter(game => game.title.toLowerCase().includes(filters.title.toLowerCase()))
			}
		}
		
		return filteredGames;
	}

	const displayGames = filterGames();
	
	return (
		<>
			{displayGames.length > 0 ?
			displayGames.map(game => <GameCard game={game} key={game._id} fromPanel={fromPanel} />) :
			<p>No game found matching the search criteria</p>}
		</>
	);
}
