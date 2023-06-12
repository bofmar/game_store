import { ChangeEvent } from "react";
import { IGameForm, IGenre } from "../types/types";

interface IGenreCheckProps{
	allGenres: Array<IGenre>;
	handleCheckbox: (event: ChangeEvent<HTMLInputElement>) => void;
	game?: IGameForm;
}

export default function GenreCheckbox (props: IGenreCheckProps) {
	return (
		<div>
			<label htmlFor="genre">Genres</label>
			{props.allGenres.sort((g1, g2) => g1.name > g2.name ? 1 : -1).map(genre => {
				return (
					<div key={genre._id}>
						<input type="checkbox" id={genre.name} name={genre.name} value={genre._id} checked={!props.game ? false : props.game.genres.some(g => g._id === genre._id) } onChange={e => props.handleCheckbox(e)} />
						<label htmlFor={genre.name}>{genre.name}</label>
					</div>
				);
			})}
		</div>
	);
}
