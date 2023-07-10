import { SERVER_URI } from "../constats";
import { handleDelete } from "../hooks/handleDelete";
import { IConsole } from "../types/types";
import { useNavigate } from "react-router-dom";

interface IConsoleCard {
	con: IConsole;
}

export default function ConsoleCard({con}: IConsoleCard) {
	const navigate = useNavigate();
	const delUrl = `${SERVER_URI}catalog/consoles/${con._id}/delete`;

	return (
		<div className="grid-list-wrapper">
			<h1>{con.name}</h1>
			<button className="orange-button-small" onClick={() => navigate(`${con._id}`)}>Modify</button>
			<button className="orange-button-small" onClick={() => handleDelete(delUrl, con.name)}>Delete</button>
		</div>
	);
}
