import { useNavigate } from "react-router-dom";
import { IGenre } from "../types/types";

interface IGenreCard {
	genre: IGenre;
}

export default function GenreCard({genre}: IGenreCard) {
	const navigate = useNavigate();
	return (
		<>
			<h1>{genre.name}</h1>
			<button onClick={() => navigate(`${genre._id}`)}>Modify</button>
			<button>Delete</button>
		</>
	);
}
