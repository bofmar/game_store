import { IGame } from "../types/types";
import { SERVER_URI } from "../constats";

interface IGameProp {
	game: IGame
}

export default function GameCard({game}: IGameProp) {
	const imageUrl = `${SERVER_URI}images/${game._id}.jpeg`
	return (
		<div>
			<h3>{game.title}</h3>
			<img src={imageUrl}/>
			<section>
				{game.genres.map(genre => <p key={genre._id}>{genre.name}</p>)}
			</section>
			<section>
				<p>{game.price}</p>
			</section>
		</div>
	);
}
