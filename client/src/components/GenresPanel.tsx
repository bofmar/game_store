import { SERVER_URI } from "../constats";
import useFetch from "../hooks/useFetch";
import { IGenre } from "../types/types";
import GenreCard from "./GenreCard";

export default function GenrePanel() {
	const url = `${SERVER_URI}catalog/genres`;
	const { data: genres, loading } = useFetch<Array<IGenre>>(url);

	return (
		<>
			{loading && <p>'Loading....'</p>}
			{genres && genres.map(genre => <GenreCard genre={genre} />)}
		</>
	);
}
