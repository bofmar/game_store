import { ToastContainer } from "react-toastify";
import { SERVER_URI } from "../constats";
import useFetch from "../hooks/useFetch";
import { IConsole } from "../types/types";
import ConsoleCard from "./ConsoleCard";
import { FormEvent } from "react";
import { handlePost } from "../hooks/handlePost";
import ConsoleForm from "./ConsoleForm";

export default function ConsolesPanel() {
	const url = `${SERVER_URI}catalog/consoles`;
	const {data: consoles, loading} = useFetch<Array<IConsole>>(url);

	const handleSubmit = (event: FormEvent, payload: IConsole) => {
		event.preventDefault();
		// TODO CLIENT SIDE VALIDATION

		handlePost(url, payload);
	}

	return (
		<>
			<ConsoleForm url={url} handleSubmit={handleSubmit} />
			{loading && <p>Loading...</p>}
			{consoles && consoles.map(con => <ConsoleCard con={con} key={con._id} />) }
			<ToastContainer theme="dark"/>
		</>
	);
}
