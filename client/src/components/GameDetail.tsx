import { useParams } from "react-router-dom";
import { SERVER_URI } from "../constats";
import useFetch from "../hooks/useFetch";
import { IGame } from "../types/types";
import AddToCartButton from "./AddToCartButton";

export default function GameDetail() {
	const { gameId } = useParams();
	const url = `${SERVER_URI}catalog/games/${gameId}`;
	const { data: game } = useFetch<IGame>(url);

	return (
		<div className="game-details-body">
			{game && <div className="game-details-wrapper">
				<h2>{game.title}</h2>
				<section className="game-details-image-section">
					<img src={`${SERVER_URI}images/${game._id}.jpeg`} alt={game.title} />
				</section>
				<section className="game-details-details-section">
					<p className="game-details-description">{game.description}</p>
					<section className="game-details-genres-section">
						<h3>Genres:{game.genres.map(g => <span> {g.name}</span>)}</h3>
					</section>
					<section className="game-details-consoles-section">
						<h3>Available on:{game.consoles.map(c => <span> {c.name}</span>)}</h3>
					</section>
					{game.copies_in_stock > 0
					? <p className="game-details-price">Price: {game.price}€</p> 
					: <p className="sold-out">SOLD OUT</p>}
					<AddToCartButton game={game}/>
				</section>
			</div>}
		</div>
	);
}
