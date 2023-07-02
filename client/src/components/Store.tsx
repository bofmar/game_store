import { useEffect, useState } from "react";
import { SERVER_URI } from "../constats";
import useFetch from "../hooks/useFetch";
import { IFilters, IGame } from "../types/types";
import AllGames from "./AllGames";
import { useSearchParams } from "react-router-dom";

export default function Store() {
	const url = `${SERVER_URI}catalog/games`;
	const { data: allGames } = useFetch<Array<IGame>>(url);
	const [searchParams] = useSearchParams();
	const [filters, setFilters] = useState<IFilters>({
			title: '',
		});

	useEffect(() => {
		if(searchParams.get('title') !== null) {
			setFilters(prev => ({...prev, title: searchParams.get('title') as string}))
		}
	},[searchParams]);

	return (
		<div>
			{allGames && <AllGames fromPanel={false} games={allGames} filters={filters}/>}
		</div>
	);
}
