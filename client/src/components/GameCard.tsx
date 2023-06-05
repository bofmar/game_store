import { IGame } from "../types/types";

interface IGameProp {
	game: IGame
}

export default function GameCard({game}: IGameProp) {
	return (
		<div>
			<h3>{game.title}</h3>
			<img src='http://localhost:5000/images/647e1b8a88dc8f9b21b026b7.jpeg'/>
			<section>
				{game.genres.map(genre => <p key={genre._id}>{genre.name}</p>)}
			</section>
			<section>
				<p>{game.price}</p>
			</section>
		</div>
	);
}
