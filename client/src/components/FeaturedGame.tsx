import { IGame } from "../types/types";
import AddToCartButton from "./AddToCartButton";

interface IGameProp {
	game: IGame
}

export default function FeaturedGame({game}: IGameProp) {

	return (
		<div className="featured center-wrapper">
			<img src={`data:image/jpeg;base64,${game.image}`}/>
			<div className="featured-details">
				<h3>{game.title}</h3>
				<p>{game.description}</p>
				<p className="featured-price">{`${game.price}€`}</p>
				<AddToCartButton game={game} />
			</div>
		</div>
	);
}
