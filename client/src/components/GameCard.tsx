import { Link } from "react-router-dom";
import { IGame } from "../types/types";
import { SERVER_URI } from "../constats";
import { handleDelete } from "../hooks/handleDelete";
import AddToCartButton from "./AddToCartButton";

interface IGameProp {
	game: IGame
	fromPanel: boolean
}

export default function GameCard({game, fromPanel}: IGameProp) {
	const imageUrl = `${SERVER_URI}images/${game._id}.jpeg`;
	const delUrl = `${SERVER_URI}catalog/games/${game._id}/delete`;

	return (
		<div className="game-card center-wrapper-column">
			<img className="game-card-image" src={imageUrl}/>
			<h3 className="game-card-title"><Link to={`/store/${game._id}`}>{game.title}</Link></h3>
			<section className="game-card-genres-section">
				{game.genres.map(genre => <p key={genre._id}>{genre.name}</p>)}
			</section>
			{game.copies_in_stock > 0 ? <p className="game-card-price">{`${game.price}€`}</p> : <p className="sold-out">SOLD OUT</p>}
			<section className="game-card-buttons-section">
			{ fromPanel ? <button onClick={() => handleDelete(delUrl, game.title)}>Delete</button> : game.copies_in_stock > 0 && <AddToCartButton game={game} />}
			</section>
		</div>
	);
}
