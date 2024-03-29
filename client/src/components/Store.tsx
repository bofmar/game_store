import { ChangeEvent, useContext, useEffect, useState } from "react";
import { SERVER_URI } from "../constats";
import useFetch from "../hooks/useFetch";
import { IConsole, IFilters, IGenre, IPublisher } from "../types/types";
import AllGames from "./AllGames";
import { useSearchParams } from "react-router-dom";
import { GamesContext } from "./GamesContext";
import { PacmanLoader } from "react-spinners";

export default function Store() {
	const Games = useContext(GamesContext);
	const { data: publishers} = useFetch<Array<IPublisher>>(`${SERVER_URI}catalog/publishers`);
	const { data: genres} = useFetch<Array<IGenre>>(`${SERVER_URI}catalog/genres`);
	const { data: consoles} = useFetch<Array<IConsole>>(`${SERVER_URI}catalog/consoles`);
	const [searchParams] = useSearchParams();
	const [filters, setFilters] = useState<IFilters>({
			title: '',
			price: '80',
			publisherId: '',
			genreId: '',
			consoleId: ''
		});

	useEffect(() => {
		if(searchParams.get('title') !== null) {
			setFilters(prev => ({...prev, title: searchParams.get('title') as string}))
		}
	},[searchParams]);

	const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const newValue = e.target.value;
		const name = e.target.name;
		setFilters(prev => ({...prev, [name]: newValue}));
	}

	const handleClear = () => {
		setFilters({
			title: '',
			price: '80',
			publisherId: '',
			genreId: '',
			consoleId: ''
		});
	}

	return (
		<>{Games && Games.allGames ?
			<div className="store">
				<main className="store-games-area">
					{<AllGames fromPanel={false} games={Games.allGames} filters={filters} paginate={true} />}
				</main>
				<aside className="store-controls center-wrapper-column">
					<h2>Filter Games</h2>
					<form className="store-filters-form center-wrapper-column" onSubmit={e => e.preventDefault()}>
						<div className='center-wrapper-column' >
							<label htmlFor="price">Maximum Price</label>
							<input type="range" name='price' id='price' min='0' max='80' step='1' value={filters.price} onChange={e => handleChange(e)} />
							<p>{new Intl.NumberFormat('en-IN', {style: 'currency', currency:'EUR'}).format(parseInt(filters.price))}</p>
						</div>
						{publishers && <div className='center-wrapper-column' >
							<label htmlFor="publisher">Publisher</label>
							<select name='publisherId' id='publisher' value={filters.publisherId} onChange={e => handleChange(e)}>
								<option value=''>---Select One---</option>
								{publishers.sort((p1,p2) => p1.name > p2.name ? 1 : -1 ).map(publisher => <option value={publisher._id} key={publisher._id} >{publisher.name}</option>)}
							</select>
						</div>}
						{genres && <div className='center-wrapper-column' >
							<label htmlFor="genre">Genre</label>
							<select name='genreId' id='genre' value={filters.genreId} onChange={e => handleChange(e)}>
								<option value=''>---Select One---</option>
								{genres.sort((g1,g2) => g1.name > g2.name ? 1 : -1 ).map(genre => <option value={genre._id} key={genre._id} >{genre.name}</option>)}
							</select>
						</div>}
						{consoles && <div className='center-wrapper-column' >
							<label htmlFor="console">Console</label>
							<select name='consoleId' id='console' value={filters.consoleId} onChange={e => handleChange(e)}>
								<option value=''>---Select One---</option>
								{consoles.sort((c1,c2) => c1.name > c2.name ? 1 : -1 ).map(cons => <option value={cons._id} key={cons._id} >{cons.name}</option>)}
							</select>
						</div>}
					</form>
					<button className="orange-button" onClick={handleClear}>Clear</button>
				</aside>
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
