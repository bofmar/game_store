import { ChangeEvent, useEffect, useState } from "react";
import { SERVER_URI } from "../constats";
import useFetch from "../hooks/useFetch";
import { IFilters, IGame } from "../types/types";
import AllGames from "./AllGames";
import { useSearchParams } from "react-router-dom";

interface IFormControls {
	price: number;
}

export default function Store() {
	const url = `${SERVER_URI}catalog/games`;
	const { data: allGames } = useFetch<Array<IGame>>(url);
	const [searchParams] = useSearchParams();
	const [formControls, setFormControls] = useState<IFormControls>({
			price: 80,
		})
	const [filters, setFilters] = useState<IFilters>({
			title: '',
			price: 80,
		});

	useEffect(() => {
		if(searchParams.get('title') !== null) {
			setFilters(prev => ({...prev, title: searchParams.get('title') as string}))
		}
	},[searchParams]);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const newValue = e.target.value;
		const name = e.target.name;
		switch (name) {
			case 'price':
				setFormControls(prev => ({...prev, price: parseInt(newValue)}));
				setFilters(prev => ({...prev, price: parseInt(newValue)}));
				break;
			default:
				break;
		}
	}

	return (
		<div>
			<main className="store-games-area">
				{allGames && <AllGames fromPanel={false} games={allGames} filters={filters} paginate={true} />}
			</main>
			<aside className="store-controls">
				<h2>Filter Games</h2>
				<form className="store-filters-form" onSubmit={e => e.preventDefault()}>
					<div>
						<label htmlFor="price">Maximum Price</label>
						<input type="range" name='price' min='0' max='80' step='1' value={formControls.price} onChange={e => handleChange(e)} />
						<p>{new Intl.NumberFormat('en-IN', {style: 'currency', currency:'EUR'}).format(formControls.price)}</p>
					</div>
				</form>
			</aside>
		</div>
	);
}
