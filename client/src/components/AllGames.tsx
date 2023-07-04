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
			if (filters.title !== '') {
				filteredGames = filteredGames.filter(game => game.title.toLowerCase().includes(filters.title.toLowerCase()))
			}
			filteredGames = filteredGames.filter(game => game.price <= parseInt(filters.price));
		}
		
		return filteredGames;
	}

	const filteredGames = filterGames();
	const currentGames = paginate ? filteredGames.slice(itemOffset, endOffset) : filteredGames;
	let pageCount = Math.ceil(filteredGames.length / itemsPerPage);

	// Recalculate pageCount when the filters change
	useEffect(() => {
		pageCount = Math.ceil(filteredGames.length / itemsPerPage);
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
