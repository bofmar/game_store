import { IGenre } from "../types/types";

interface IGenreCard {
	genre: IGenre;
}

export default function GenreCard({genre}: IGenreCard) {
	return (
		<>
			<h1>{genre.name}</h1>
			<button>Modify</button>
			<button>Delete</button>
		</>
	);
}
