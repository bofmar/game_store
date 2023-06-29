import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import carousel1 from '../assets/images/carousel1.jpeg';
import carousel2 from '../assets/images/carousel2.jpeg';
import carousel3 from '../assets/images/carousel3.jpeg';
import carousel4 from '../assets/images/carousel4.jpeg';
import useFetch from '../hooks/useFetch';
import { IGame } from '../types/types';
import { SERVER_URI } from '../constats';
import FeaturedGame from './FeaturedGame';
import GameCard from './GameCard';

export default function Home() {
	const url = `${SERVER_URI}catalog/games`;
	const {data: games} = useFetch<Array<IGame>>(url);

	const heroResponsive = {
		all: {
			breakpoint: { max: 100000, min: 0 },
			items: 1
		}
	}

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
		<div className='home center-wrapper'>
			<section className="carousel-section">
				<Carousel 
				responsive={heroResponsive}
				showDots={true}
				infinite={true}
				keyBoardControl={true}
				containerClass="carousel-container">
					<div className='hero-carousel-item'>
						<div className='text-overlay'>
							<h1>Your one stop for all things gaming related</h1>
							<p>Huge selection of games, all at the best prices in the industry</p>
							<button className='orange-button'>Browse</button>
						</div>
						<img className='carousel-image' src={carousel1} />
					</div>
					<div className='hero-carousel-item'>
						<div className='text-overlay'>
							<h1>Don't know what to play next?</h1>
							<p>Our expert personel can provide personalized suggestions just for you, depending on past purchases</p>
							<p>How? Become a member and find out!</p>
						</div>
						<img className='carousel-image' src={carousel2} />
					</div>
					<div className='hero-carousel-item'>
						<div className='styled-flair'>COMMING SOON</div>
						<div className='text-overlay'>
							<h1>The award winning Crisis Core: Final Fantasy VII is getting a remake!</h1>
							<p>Don't miss out on Square Enix's next masterpiece by preordering now, at your local shop</p>
						</div>
						<img className='carousel-image' src={carousel3} />
					</div>
					<div className='hero-carousel-item'>
						{games && <FeaturedGame game={games.find(g => g._id === '15') as IGame} />}
						<img className='carousel-image' src={carousel4} />
					</div>
				</Carousel>
			</section>
			<section className="home-games-section">
				<Carousel 
				responsive={gameResponsive}
				infinite={true}
				keyBoardControl={true}
				containerClass="game-carousel-container">
					{games ? games.map(g => <GameCard game={g} fromPanel={false} key={g._id} />): <div></div> }
				</Carousel>
			</section>
			<section className="home-blog-section">
			</section>
		</div>
	);
}
