import { useParams } from "react-router-dom";
import { SERVER_URI } from "../constats";
import useFetch from "../hooks/useFetch";
import { FormEvent } from "react";
import { IPublisher } from "../types/types";
import { ToastContainer } from "react-toastify";
import { handleUpdate } from "../hooks/handleUpdate";
import PublisherForm from "./PublisherForm";

export default function PublisherDetail() {
	const { publisherId } = useParams();
	const getUrl = `${SERVER_URI}catalog/publishers/${publisherId}`
	const postUrl = `${SERVER_URI}catalog/publishers/${publisherId}/update`
	const { data: publisher } = useFetch<IPublisher>(getUrl);

	const handleSubmit = (event: FormEvent, payload: IPublisher) => {
		event.preventDefault();
		// validate data TODO

		handleUpdate(postUrl, payload);
	}

	return (
		<div>
			{publisher && <PublisherForm publisher={publisher} url={postUrl} handleSubmit={handleSubmit} />}
			<ToastContainer theme="dark" />
		</div>
	);
}
