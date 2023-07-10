import { useParams } from "react-router-dom";
import { SERVER_URI } from "../constats";
import useFetch from "../hooks/useFetch";
import { FormEvent } from "react";
import { IPublisher } from "../types/types";
import { ToastContainer, toast } from "react-toastify";
import { handleUpdate } from "../hooks/handleUpdate";
import PublisherForm from "./PublisherForm";

export default function PublisherDetail() {
	const { publisherId } = useParams();
	const getUrl = `${SERVER_URI}catalog/publishers/${publisherId}`
	const postUrl = `${SERVER_URI}catalog/publishers/${publisherId}/update`
	const { data: publisher } = useFetch<IPublisher>(getUrl);

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

		handleUpdate(postUrl, localPayload);
	}

	return (
		<div>
			{publisher && <PublisherForm publisher={publisher} url={postUrl} handleSubmit={handleSubmit} />}
			<ToastContainer theme="dark" />
		</div>
	);
}
