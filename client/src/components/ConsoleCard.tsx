import { IConsole } from "../types/types";
import { useNavigate } from "react-router-dom";

interface IConsoleCard {
	con: IConsole;
}

export default function ConsoleCard({con}: IConsoleCard) {
	const navigate = useNavigate();

	return (
		<>
			<h1>{con.name}</h1>
			<button onClick={() => navigate(`${con._id}`)}>Modify</button>
			<button>Delete</button>
		</>
	);
}
