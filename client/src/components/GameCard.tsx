import { Link } from "react-router-dom";
import { IGame } from "../types/types";
import { SERVER_URI } from "../constats";

interface IGameProp {
	game: IGame
	fromPanel: boolean
}

export default function GameCard({game, fromPanel}: IGameProp) {
	const imageUrl = `${SERVER_URI}images/${game._id}.jpeg`
	return (
		<div>
			<h3><Link to={`${game._id}`}>{game.title}</Link></h3>
			<img src={imageUrl}/>
			<section>
				{game.genres.map(genre => <p key={genre._id}>{genre.name}</p>)}
			</section>
			<section>
				<p>{game.price}</p>
			</section>
			{ fromPanel && <section>
				<button>Modify</button>
				<button>Delete</button>
			</section> }
		</div>
	);
}
