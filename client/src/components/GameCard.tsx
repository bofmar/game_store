import { IGame } from "../types/types";

interface IGameProp {
	game: IGame
}

export default function GameCard({game}: IGameProp) {
	return (
		<div>
			<h3>{game.title}</h3>
			<section>
				{game.genres.map(genre => <p key={genre._id}>{genre.name}</p>)}
			</section>
			<section>
				<p>{game.price}</p>
			</section>
		</div>
	);
}
