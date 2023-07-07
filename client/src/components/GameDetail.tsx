import { useParams } from "react-router-dom";
import { SERVER_URI } from "../constats";
import useFetch from "../hooks/useFetch";
import { IGame } from "../types/types";
import AddToCartButton from "./AddToCartButton";
import Carousel from "react-multi-carousel";
import GameCard from "./GameCard";
import { useEffect, useState } from "react";

interface IGameRanked extends IGame {
	score: number;
}

export default function GameDetail() {
	const { gameId } = useParams();
	const url = `${SERVER_URI}catalog/games/${gameId}`;
	const { data: game } = useFetch<IGame>(url);
	const {data: games} = useFetch<Array<IGame>>(`${SERVER_URI}catalog/games`);
	const [ranked,setRanked] = useState<Array<IGameRanked>>([]);
	
	useEffect(() => {
		if(games && game) {
			games.map(g => {
				const newGame: IGameRanked = {...g, score: 0};
				if(newGame.title === game.title) {
					setRanked(prev => ({...prev, newGame}));
					return;
				}else {
					// check for matching genres
					// check for matching publishers
					// check for matching consoles
					setRanked(prev => ({...prev, newGame}));
				}
			});
		}
	},[games, game]);

	const gameResponsive = {
		superLargeDesktop: {
			breakpoint: { max: 100000, min: 3000 },
			items: 5
		},
		desktop: {
			breakpoint: { max: 3000, min: 1024 },
			items: 3
		},
		tablet: {
			breakpoint: { max: 1024, min: 464 },
			items: 2
		},
		mobile: {
			breakpoint: { max: 464, min: 0 },
			items: 1
		}
	}

	return (
		<div className="game-details-body center-wrapper">
			{game && <div className="game-details-wrapper">
				<h2>{game.title}</h2>
				<section className="game-details-image-section">
					<img src={`${SERVER_URI}images/${game._id}.jpeg`} alt={game.title} />
				</section>
				<section className="game-details-details-section">
					<p className="game-details-description">{game.description}</p>
					<section className="game-details-genres-section">
						<h3>Genres:{game.genres.map(g => <span key={g._id}> {g.name}</span>)}</h3>
					</section>
					<section className="game-details-consoles-section">
						<h3>Available on:{game.consoles.map(c => <span key={c._id}> {c.name}</span>)}</h3>
					</section>
					{game.copies_in_stock > 0
					? <p className="game-details-price">Price: <span className="price-span">{game.price}€</span></p> 
					: <p className="sold-out">SOLD OUT</p>}
					{game.copies_in_stock > 0 && <AddToCartButton game={game}/>}
				</section>
				<section>
					<Carousel
					responsive={gameResponsive}
					infinite={true}
					keyBoardControl={true}
					containerClass="game-carousel-container">
						{ranked.length > 0 ? ranked.slice(0,4).map(g => <GameCard game={g} fromPanel={false} key={g._id} />): <div></div> }
					</Carousel>
				</section>
			</div>}
		</div>
	);
}
