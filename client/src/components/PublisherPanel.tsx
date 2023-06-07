import { SERVER_URI } from "../constats";
import useFetch from "../hooks/useFetch";
import { IPublisher } from "../types/types";
import PublisherCard from "./PublisherCard";

export default function PublisherPanel() {
	const url = `${SERVER_URI}catalog/publishers`;
	const {data: publishers, loading} = useFetch<Array<IPublisher>>(url);

	return (
		<>
			{loading && 'Loading....'}
			{publishers && publishers.map(publisher => <PublisherCard publisher={publisher} key={publisher._id}/>)}
		</>
	);
}
