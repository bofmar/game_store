import { useEffect, useState } from "react";

interface IPublisher {
	name: string;
    date_founded: Date;
	bio: string;
	logo?: string;
}

interface IGenre {
	name: string;
}

interface IConsole {
	name: string;
	developer_name: string;
	description: string;
	release_date: Date;
	discontinued_date?: Date;
	image?: string;
}


interface IGame {
	title: string;
	release_date: Date;
	description: string;
	copies_in_stock: number;
	price: number;
	publisher: IPublisher;
	genres: Array<IGenre>;
	consoles: Array<IConsole>;
	image?: string;
}

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
			<h1>Price: {allGames ? allGames[0].price : 'null'}</h1>
		</>
	);
}
