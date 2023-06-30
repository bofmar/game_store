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
import { useNavigate } from 'react-router-dom';
import { FormEvent } from 'react';
import { ToastContainer, toast } from 'react-toastify';

export default function Home() {
	const url = `${SERVER_URI}catalog/games`;
	const {data: games} = useFetch<Array<IGame>>(url);
	const navigate = useNavigate();

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

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		toast.success('Subscribed!');
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
				<h2>Browse our collection of games</h2>
				<Carousel 
				responsive={gameResponsive}
				infinite={true}
				keyBoardControl={true}
				containerClass="game-carousel-container">
					{games ? games.slice(0,10).map(g => <GameCard game={g} fromPanel={false} key={g._id} />): <div></div> }
				</Carousel>
				<button className='orange-button' onClick={() => navigate('store')}>See More</button>
			</section>
			<section className="home-subscribe-section">
				<h2>Still want more?</h2>
				<p><span>Subscribe</span> to our newsletter and become a <span>GamesPlanet member</span> to receive news on all <span>new releases</span> as well as <span>special offers and discounts</span> on all our shops.</p>
				<form className='home-sub-form' onSubmit={e => handleSubmit(e)}>
					<p>All fields are required</p>
					<div>
						<label htmlFor='name' className='white-label'>First Name:</label>
						<input type='text' name='name' id='name' required className='dark-input'/>
					</div>
					<div>
						<label htmlFor='lastName' className='white-label'>Last Name:</label>
						<input type='text' name='lastName' id='lastName' required className='dark-input'/>
					</div>
					<div>
						<label htmlFor='email' className='white-label'>Email:</label>
						<input type='email' name='email' id='email' required className='dark-input'/>
					</div>
					<div>
						<input type='checkbox' name='tos' id='tos' value='accept'required/>
						<label htmlFor='tos' className='white-label'>I accept GamesPlanet's <a href='#'>terms of service</a> and want my email to apply for GamesPlanet memvership and subscribe to their newsletter</label>l 
					</div>
					<button className='orange-button'>Subscribe Now!</button>
				</form>
			</section>
			<ToastContainer theme="dark" />
		</div>
	);
}
