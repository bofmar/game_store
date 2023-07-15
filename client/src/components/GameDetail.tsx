import { useParams } from "react-router-dom";
import { SERVER_URI } from "../constats";
import useFetch from "../hooks/useFetch";
import { IGame } from "../types/types";
import AddToCartButton from "./AddToCartButton";
import Carousel from "react-multi-carousel";
import GameCard from "./GameCard";
import { useContext, useEffect, useState } from "react";
import { GamesContext } from "./GamesContext";
import { PacmanLoader } from "react-spinners";
import defaultImage from '../assets/default.jpeg';

interface IGameRanked extends IGame {
	score: number;
}

export default function GameDetail() {
	const { gameId } = useParams();
	const url = `${SERVER_URI}catalog/games/${gameId}`;
	const { data: game } = useFetch<IGame>(url);
	const Games = useContext(GamesContext);
	const [ranked,setRanked] = useState<Array<IGameRanked>>([]);
	
	useEffect(() => {
		if(Games?.allGames && game) {
			const temp: Array<IGameRanked> = [];
			Games.allGames.forEach(g => {
				const newGame: IGameRanked = {...g, score: 0};
				if(newGame._id === game._id) {
					return // don't add the current game to the list
				}else {
					// check for matching genres
					game.genres.forEach(genre => {
						if (newGame.genres.some(gen => gen._id === genre._id)) {
							newGame.score += 10;
						}
					});
					// check for matching consoles
					game.consoles.forEach(con => {
						if (newGame.consoles.some(c => c._id === con._id)) {
							newGame.score += 2;
						}
					});
					// check for matching publishers
					if(game.publisher._id === newGame.publisher._id) {
						newGame.score += 1;
					}
					temp.push(newGame);
				}
			});
			temp.sort((g1,g2) => g1.score > g2.score ? -1 : 1);
			setRanked(temp);
		}
	},[Games, game]);

	const gameResponsive = {
		superLargeDesktop: {
			breakpoint: { max: 100000, min: 3000 },
			items: 5
		},
		desktop: {
			breakpoint: { max: 3000, min: 1200 },
			items: 3
		},
		tablet: {
			breakpoint: { max: 1200, min: 800 },
			items: 2
		},
		mobile: {
			breakpoint: { max: 800, min: 0 },
			items: 1
		}
	}

	return (
		<>
		{Games && Games.allGames ?
			<div className="game-details-body center-wrapper">
				{game && <div className="game-details-wrapper">
					<h2>{game.title}</h2>
					<section className="game-details-image-section">
						<img src={game.image === 'none' ? defaultImage :`data:image/jpeg;base64,${game.image}`}/>
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
					<section className="rec-carousel-section">
						<h2>You might also like</h2>
						<Carousel
						responsive={gameResponsive}
						infinite={true}
						keyBoardControl={true}
						containerClass="game-carousel-container">
							{ranked.length > 0 ? ranked.slice(0,5).map(g => <GameCard game={g} fromPanel={false} key={g._id} />): <div></div> }
						</Carousel>
					</section>
				</div>}
			</div>
			: <div className="center-wrapper-column">
				<PacmanLoader
				color={'#FF4136'}
				loading={!(Games && Games.allGames)}
				size={50}
				aria-label="Loading Spinner"
				data-testid="loader"
				/>
				<p>Loading....</p>
			</div>}
	</>
	);
}
