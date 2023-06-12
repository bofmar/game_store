import { FormEvent, useState } from "react";
import { SERVER_URI } from "../constats";
import useFetch from "../hooks/useFetch";
import { IPublisher } from "../types/types";
import PublisherCard from "./PublisherCard";
import { handlePost } from "../hooks/handlePost";
import { ToastContainer } from "react-toastify";

export default function PublisherPanel() {
	const url = `${SERVER_URI}catalog/publishers`;
	const {data: publishers, loading} = useFetch<Array<IPublisher>>(url);
	const [formData, setData] = useState({name: '', bio: '', dateFounded: ''});

	const handleSubmit = (event: FormEvent) => {
		event.preventDefault();
		const sendData: IPublisher = {
			...formData,
			_id:'',
			date_founded: new Date(formData.dateFounded),
		};

		// TODO CLIENT SIDE VALIDATION

		handlePost(url, sendData);
	}

	return (
		<>
			<form method="POST" action={url} onSubmit={event => handleSubmit(event)}>
				<div>
					<label htmlFor="name">Name</label>
					<input type="text" id="name" name="name" required value={formData.name} onChange={e => setData({...formData, name: e.target.value})}/>
				</div>
				<div>
					<label htmlFor="bio">Biography</label>
					<textarea id="bio" name="bio" required value={formData.bio} onChange={e => setData({...formData, bio: e.target.value})}/>
				</div>
				<div>
					<label htmlFor="dateFounded">Date Founded</label>
					<input type="date" id="dateFounded" name="dateFounded" required value={formData.dateFounded} onChange={e => setData({...formData, dateFounded: e.target.value})}/>
				</div>
				<button type="submit">Submit</button>
			</form>
			{loading && <p>Loading....</p>}
			{publishers && publishers.map(publisher => <PublisherCard publisher={publisher} key={publisher._id}/>)}
			<ToastContainer theme="dark"/>
		</>
	);
}
