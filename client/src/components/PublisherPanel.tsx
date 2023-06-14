import { FormEvent } from "react";
import { SERVER_URI } from "../constats";
import useFetch from "../hooks/useFetch";
import { IPublisher } from "../types/types";
import PublisherCard from "./PublisherCard";
import { handlePost } from "../hooks/handlePost";
import { ToastContainer } from "react-toastify";
import PublisherForm from "./PublisherForm";

export default function PublisherPanel() {
	const url = `${SERVER_URI}catalog/publishers`;
	const {data: publishers, loading} = useFetch<Array<IPublisher>>(url);

	const handleSubmit = (event: FormEvent, payload: IPublisher) => {
		event.preventDefault();

		// TODO CLIENT SIDE VALIDATION

		handlePost(url, payload);
	}

	return (
		<>
			<PublisherForm handleSubmit={handleSubmit} url={url} />
			{loading && <p>Loading....</p>}
			{publishers && publishers.map(publisher => <PublisherCard publisher={publisher} key={publisher._id}/>)}
			<ToastContainer theme="dark"/>
		</>
	);
}
