import { useNavigate } from "react-router-dom";
import { IPublisher } from "../types/types";
import { SERVER_URI } from "../constats";
import { handleDelete } from "../hooks/handleDelete";

interface IPublisherCard {
	publisher: IPublisher;
}

export default function PublisherCard({publisher}: IPublisherCard) {
	const navigate = useNavigate();
	const delUrl = `${SERVER_URI}catalog/publishers/${publisher._id}/delete`;
	return (
		<>
			<h1>{publisher.name}</h1>
			<button onClick={() => navigate(`${publisher._id}`)}>Modify</button>
			<button onClick={() => handleDelete(delUrl, publisher.name)}>Delete</button>
		</>
	);
}
