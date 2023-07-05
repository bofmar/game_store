import ReactPaginate from 'react-paginate';
import { IFilters, IGame } from '../types/types';
import GameCard from "./GameCard";
import { useEffect, useState } from 'react';

interface IAllGames {
	fromPanel: boolean;
	paginate: boolean;
	games: Array<IGame>;
	filters?: IFilters;
}

export default function AllGames({ fromPanel, paginate, games, filters }: IAllGames) {
	const [itemOffset, setItemOffset] = useState(0);
	const itemsPerPage = 9;
	const endOffset = itemOffset + itemsPerPage;

	const handlePageClick = (event: {selected: number}) => {
		const newOffset = (event.selected * itemsPerPage) % games.length;
		setItemOffset(newOffset);
	};

	const filterGames = (): Array<IGame> => {
		let filteredGames = games;

		if (filters) {
			if (filters.title !== '') { // filter by name
				filteredGames = filteredGames.filter(game => game.title.toLowerCase().includes(filters.title.toLowerCase()))
			}
			// filter by price
			filteredGames = filteredGames.filter(game => game.price <= parseInt(filters.price));
			// filter by publisher
			if (filters.publisherId !== '') {
				filteredGames = filteredGames.filter(game => game.publisher._id === filters.publisherId);
			}
			// filter by genre 
			if (filters.genreId !== '') {
				filteredGames = filteredGames.filter(game => game.genres.some(genre => genre._id === filters.genreId));
			}
		}
		
		return filteredGames;
	}

	const filteredGames = filterGames();
	const currentGames = paginate ? filteredGames.slice(itemOffset, endOffset) : filteredGames;
	let pageCount = Math.ceil(filteredGames.length / itemsPerPage);

	// This is here because when the filters change and the displayed items count change
	// while the user is on a page other than the first, we can end in a situation where
	// the user will be shown the error message instead of the games and the pagination
	// controls. So we need to:
	// 1. Recalculate how many pages there are in the pagination
	// 2. Move the user manualy to the first page
	// 3. Change the offset to that of the first page's manualy
	useEffect(() => {
		// Recalculate how many pages there shoul be
		pageCount = Math.ceil(filteredGames.length / itemsPerPage);
		const firstPage = document.querySelector('[aria-label="Page 1"]');
		// create a mouse click event and call it on the first element
		const clickEvent = new MouseEvent("click", {
			"view": window,
			"bubbles": true,
			"cancelable": false
		});
		// set the new offset manualy, because it does not get set from the click event
		handlePageClick({selected: 0});
		// navigate to page 1
		firstPage?.dispatchEvent(clickEvent);
	},[filters]);
	
	return (
		<>
			{currentGames.length > 0 ?
			currentGames.map(game => <GameCard game={game} key={game._id} fromPanel={fromPanel} />) :
			<p>No game found matching the search criteria</p>}
			{currentGames.length > 0 && paginate === true &&
			<ReactPaginate
				breakLabel="..."
				nextLabel="next >"
				onPageChange={e => handlePageClick(e)}
				pageRangeDisplayed={5}
				pageCount={pageCount}
				previousLabel="< previous"
				renderOnZeroPageCount={null}
			/>}
		</>
	);
}
