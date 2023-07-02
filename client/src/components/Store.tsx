import { SERVER_URI } from "../constats";
import useFetch from "../hooks/useFetch";
import { IGame } from "../types/types";
import AllGames from "./AllGames";

export default function Store() {
	const url = `${SERVER_URI}catalog/games`;
	const { data: allGames } = useFetch<Array<IGame>>(url);

	return (
		<div>
			{allGames && <AllGames fromPanel={false} games={allGames}/>}
		</div>
	);
}
