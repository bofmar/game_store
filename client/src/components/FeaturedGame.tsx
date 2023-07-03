import { IGame } from "../types/types";
import { SERVER_URI } from "../constats";
import AddToCartButton from "./AddToCartButton";

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
				<p className="featured-price">{`${game.price}€`}</p>
				<AddToCartButton game={game} />
			</div>
		</div>
	);
}
