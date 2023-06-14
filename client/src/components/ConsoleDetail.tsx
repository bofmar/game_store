import { useParams } from "react-router-dom";
import { SERVER_URI } from "../constats";
import useFetch from "../hooks/useFetch";
import { FormEvent } from "react";
import { IConsole } from "../types/types";
import { ToastContainer } from "react-toastify";
import ConsoleForm from "./ConsoleForm";
import { handleUpdate } from "../hooks/handleUpdate";

export default function ConsoleDetail() {
	const { conId } = useParams();
	const getUrl = `${SERVER_URI}catalog/consoles/${conId}`
	const postUrl = `${SERVER_URI}catalog/consoles/${conId}/update`
	const { data: con } = useFetch<IConsole>(getUrl);

	const handleSubmit = (event: FormEvent, payload: IConsole) => {
		event.preventDefault();
		// validate data TODO

		handleUpdate(postUrl, payload);
	}

	return (
		<div>
			{con && <ConsoleForm con={con} url={postUrl} handleSubmit={handleSubmit} />}
			<ToastContainer theme="dark" />
		</div>
	);
}
