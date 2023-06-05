import { useEffect, useState } from "react";
import { IGame } from '../types/types';
import GameCard from "./GameCard";

export default function AllGames() {
	const [allGames, setAllGames] = useState<Array<IGame> | null>(null);

	useEffect(() => {
		const abort = new AbortController();

		async function getData() {
			const response = await fetch('http://localhost:5000/catalog/games', { signal: abort.signal} );
			const data = await response.json();

			setAllGames(data);
		}
		getData();

		return () => {
			abort.abort();
		}
	},[]);	
	
	return (
		<>
			{allGames ? allGames.map(game => <GameCard game={game} key={game._id} />) : null}
		</>
	);
}
