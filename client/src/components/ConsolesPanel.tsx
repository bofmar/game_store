import { SERVER_URI } from "../constats";
import useFetch from "../hooks/useFetch";
import { IConsole } from "../types/types";
import ConsoleCard from "./ConsoleCard";

export default function ConsolesPanel() {
	const url = `${SERVER_URI}catalog/consoles`;
	const {data: consoles, loading} = useFetch<Array<IConsole>>(url);

	return (
		<>
			{loading && <p>Loading...</p>}
			{consoles && consoles.map(con => <ConsoleCard con={con} key={con._id} />) }
		</>
	);
}
