import { IGame } from "../types/types";
import { SERVER_URI } from "../constats";

interface IGameProp {
	game: IGame
}

export default function FeaturedGame({game}: IGameProp) {
	const imageUrl = `${SERVER_URI}images/${game._id}.jpeg`;

	return (
		<div className="featured">
			<img src={imageUrl}/>
			<div className="featured-details">
				<h3>{game.title}</h3>
				<p>{game.description}</p>
				<p>{`${game.price}€`}</p>
				<button>Add To Cart</button>
			</div>
		</div>
	);
}
