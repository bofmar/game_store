import { useNavigate } from "react-router-dom";
import { IPublisher } from "../types/types";

interface IPublisherCard {
	publisher: IPublisher;
}

export default function PublisherCard({publisher}: IPublisherCard) {
	const navigate = useNavigate();
	return (
		<>
			<h1>{publisher.name}</h1>
			<button onClick={() => navigate(`${publisher._id}`)}>Modify</button>
			<button>Delete</button>
		</>
	);
}
