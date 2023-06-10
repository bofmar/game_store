import { ChangeEvent } from "react";
import { IConsole, IGame } from "../types/types";

interface IConsoleCheckProps{
	allConsoles: Array<IConsole>;
	handleGenreCheckbox: (event: ChangeEvent<HTMLInputElement>) => void;
	game?: IGame;
}

export default function ConsoleCheckbox (props: IConsoleCheckProps) {
	return (
		<div>
			<label htmlFor="consoles">Consoles</label>
			{props.allConsoles.sort((c1, c2) => c1.name > c2.name ? 1 : -1).map(con => {
				return (
					<div key={con._id}>
						<input type="checkbox" id={con.name} name={con.name} value={con._id} onChange={e => props.handleGenreCheckbox(e)} />
						<label htmlFor={con.name}>{con.name}</label>
					</div>
				);
			})}
		</div>
	);
}
