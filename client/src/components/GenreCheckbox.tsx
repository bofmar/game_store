import { ChangeEvent, useState } from "react";
import { IGameForm, IGenre } from "../types/types";

interface IGenreCheckProps{
	genre: IGenre;
	handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
	game?: IGameForm;
}

export default function GenreCheckbox (props: IGenreCheckProps) {
	const [checked, setChecked] = useState(!props.game ? false : props.game.genres?.some(g => g._id === props.genre._id) );
	return (
		<div>
			<input type="checkbox" id={props.genre.name} 
				name={props.genre.name} 
				value={props.genre._id} 
				checked={checked}
				onChange={e => {
					props.handleChange(e);
					setChecked(!checked);
				}} />
			<label htmlFor={props.genre.name}>{props.genre.name}</label>
		</div>
	);
}
