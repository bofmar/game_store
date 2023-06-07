import { IPublisher } from "../types/types";

interface IPublisherCard {
	publisher: IPublisher;
}

export default function PublisherCard({publisher}: IPublisherCard) {
	return (
		<>
			<h1>{publisher.name}</h1>
			<button>Modify</button>
			<button>Delete</button>
		</>
	);
}
