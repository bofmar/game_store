import { useNavigate } from "react-router-dom";
import { IGenre } from "../types/types";
import { SERVER_URI } from "../constats";
import { handleDelete } from "../hooks/handleDelete";

interface IGenreCard {
	genre: IGenre;
}

export default function GenreCard({genre}: IGenreCard) {
	const navigate = useNavigate();
	const delUrl = `${SERVER_URI}catalog/genres/${genre._id}/delete`;
	return (
		<>
			<h1>{genre.name}</h1>
			<button onClick={() => navigate(`${genre._id}`)}>Modify</button>
			<button onClick={() => handleDelete(delUrl, genre.name)}>Delete</button>
		</>
	);
}
