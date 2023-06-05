import { useEffect, useState } from "react";
import { IGame } from "../types/types";

interface IGameProp {
	game: IGame
}

export default function GameCard({game}: IGameProp) {
	const [image, setImage] = useState<string | undefined>(undefined);

	useEffect(() => {
		const abort = new AbortController();

		async function getData() {
			const response = await fetch('http://localhost:5000/images/647e1b8a88dc8f9b21b026b7.jpeg', { signal: abort.signal} );
			const data = await response.json();

			setImage(data);
		}
		getData();

		return () => {
			abort.abort();
		}
	},[]);	


	return (
		<div>
			<h3>{game.title}</h3>
			<img src={image as string} />
			<section>
				{game.genres.map(genre => <p key={genre._id}>{genre.name}</p>)}
			</section>
			<section>
				<p>{game.price}</p>
			</section>
		</div>
	);
}
