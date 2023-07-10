import { ToastContainer, toast } from "react-toastify";
import { SERVER_URI } from "../constats";
import useFetch from "../hooks/useFetch";
import { IConsole } from "../types/types";
import ConsoleCard from "./ConsoleCard";
import { FormEvent } from "react";
import { handlePost } from "../hooks/handlePost";
import ConsoleForm from "./ConsoleForm";

export default function ConsolesPanel() {
	const url = `${SERVER_URI}catalog/consoles`;
	const {data: consoles} = useFetch<Array<IConsole>>(url);

	const handleSubmit = (event: FormEvent, payload: IConsole) => {
		event.preventDefault();
		const localPayload: IConsole= {
			_id: payload._id,
			name: payload.name.trim(),
			developer_name: payload.developer_name.trim(),
			description: payload.description.trim(),
			release_date: payload.release_date.trim()
		}

		if(localPayload.name === '' 
			|| localPayload.developer_name === '' 
			|| localPayload.description === ''
			|| localPayload.release_date === '') {

			toast('Fields cannot be only spaces', {type:'error'})
			return;
		}

		handlePost(url, localPayload);
	}

	return (
		<>
			<ConsoleForm url={url} handleSubmit={handleSubmit} />
			<div className="center-wrapper-column consoles-cards-wrapper">
				{consoles && consoles.map(con => <ConsoleCard con={con} key={con._id} />) }
			</div>
			<ToastContainer theme="dark"/>
		</>
	);
}
