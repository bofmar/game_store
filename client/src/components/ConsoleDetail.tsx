import { useParams } from "react-router-dom";
import { SERVER_URI } from "../constats";
import useFetch from "../hooks/useFetch";
import { FormEvent } from "react";
import { IConsole } from "../types/types";
import { ToastContainer, toast } from "react-toastify";
import ConsoleForm from "./ConsoleForm";
import { handleUpdate } from "../hooks/handleUpdate";

export default function ConsoleDetail() {
	const { conId } = useParams();
	const getUrl = `${SERVER_URI}catalog/consoles/${conId}`
	const postUrl = `${SERVER_URI}catalog/consoles/${conId}/update`
	const { data: con } = useFetch<IConsole>(getUrl);

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

		handleUpdate(postUrl, localPayload);
	}

	return (
		<div>
			{con && <ConsoleForm con={con} url={postUrl} handleSubmit={handleSubmit} />}
			<ToastContainer theme="dark" />
		</div>
	);
}
