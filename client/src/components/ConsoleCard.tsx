import { IConsole } from "../types/types";

interface IConsoleCard {
	con: IConsole;
}

export default function ConsoleCard({con}: IConsoleCard) {
	return (
		<>
			<h1>{con.name}</h1>
			<button>Modify</button>
			<button>Delete</button>
		</>
	);
}
