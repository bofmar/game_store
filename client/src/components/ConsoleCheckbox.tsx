import { ChangeEvent, useState } from "react";
import { IConsole, IGameForm } from "../types/types";

interface IConsoleCheckProps{
	con: IConsole;
	handleGenreCheckbox: (event: ChangeEvent<HTMLInputElement>) => void;
	game?: IGameForm;
}

export default function ConsoleCheckbox (props: IConsoleCheckProps) {
	const [checked, setChecked] = useState(!props.game ? false : props.game.consoles.some(c => c._id === props.con._id)) 
	return (
			<div key={props.con._id}>
				<input type="checkbox" id={props.con.name} 
					name={props.con.name} 
					value={props.con._id} 
					checked={checked} 
					onChange={e => {
						props.handleGenreCheckbox(e)
						setChecked(!checked);
					}} />
				<label htmlFor={props.con.name}>{props.con.name}</label>
			</div>
	);
}
