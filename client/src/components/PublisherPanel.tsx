import { FormEvent } from "react";
import { SERVER_URI } from "../constats";
import useFetch from "../hooks/useFetch";
import { IPublisher } from "../types/types";
import PublisherCard from "./PublisherCard";
import { handlePost } from "../hooks/handlePost";
import { ToastContainer, toast } from "react-toastify";
import PublisherForm from "./PublisherForm";

export default function PublisherPanel() {
	const url = `${SERVER_URI}catalog/publishers`;
	const {data: publishers} = useFetch<Array<IPublisher>>(url);

	const handleSubmit = (event: FormEvent, payload: IPublisher) => {
		event.preventDefault();
		const localPayload: IPublisher = {
			_id: payload._id,
			name: payload.name.trim(),
			bio: payload.bio.trim(),
			date_founded: payload.date_founded,
		}

		if(localPayload.name === '' || localPayload.bio === '' || localPayload.date_founded === ''){
			toast('Fields cannot be only spaces', {type:'error'})
			return;
		}

		handlePost(url, localPayload);
	}

	return (
		<>
			<PublisherForm handleSubmit={handleSubmit} url={url} />
			<div className="center-wrapper-column publisher-cards-wrapper">
				{publishers && publishers.map(publisher => <PublisherCard publisher={publisher} key={publisher._id}/>)}
			</div>
			<ToastContainer theme="dark"/>
		</>
	);
}
