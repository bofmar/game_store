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
		<div className="grid-list-wrapper">
			<h1>{genre.name}</h1>
			<button className='orange-button-small' onClick={() => navigate(`${genre._id}`)}>Modify</button>
			<button className='orange-button-small' onClick={() => handleDelete(delUrl, genre.name)}>Delete</button>
		</div>
	);
}
