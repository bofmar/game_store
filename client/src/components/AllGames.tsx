import { IGame } from '../types/types';
import GameCard from "./GameCard";
import { useSearchParams } from 'react-router-dom';

interface IAllGames {
	fromPanel: boolean;
	games: Array<IGame>;
}

export default function AllGames({ fromPanel, games }: IAllGames) {
	const [searchParams] = useSearchParams();
	const isFiltered = searchParams.get('title') !== null;
	const filtered = isFiltered ? games.filter(game => game.title.toLowerCase().includes(searchParams.get('title')?.toLowerCase() as string)) : games;
	
	console.log(filtered);

	return (
		<>
			{filtered.length > 0 ? filtered.map(game => <GameCard game={game} key={game._id} fromPanel={fromPanel} />) : <p>No game found matching the criteria Title: ${searchParams.get('title')}</p>}
		</>
	);
}
