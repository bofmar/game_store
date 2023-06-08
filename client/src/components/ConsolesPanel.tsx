import { ToastContainer } from "react-toastify";
import { SERVER_URI } from "../constats";
import useFetch from "../hooks/useFetch";
import { IConsole } from "../types/types";
import ConsoleCard from "./ConsoleCard";
import { FormEvent, useState } from "react";
import { handlePost } from "../hooks/handlePost";

export default function ConsolesPanel() {
	const url = `${SERVER_URI}catalog/consoles`;
	const {data: consoles, loading} = useFetch<Array<IConsole>>(url);
	const [formData, setData] = useState({ name: '', developer: '', description: '', releaseDate: '', discontinuedDate: ''});

	const handleSubmit = (event: FormEvent) => {
		event.preventDefault();
		const sendData: IConsole = {
			...formData,
			kind: 'console',
			_id:'',
			developer_name: formData.developer,
			release_date: new Date(formData.releaseDate),
		};

		if(formData.discontinuedDate) {
			sendData.discontinued_date = new Date(formData.discontinuedDate);
		}
		console.log('Send Data: ',JSON.stringify(sendData));

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
					<label htmlFor="developer">Developer</label>
					<input type="text" id="developer" name="developer" required value={formData.developer} onChange={e => setData({...formData, developer: e.target.value})}/>
				</div>
				<div>
					<label htmlFor="description">Description</label>
					<textarea id="description" name="description" required value={formData.description} onChange={e => setData({...formData, description: e.target.value})}/>
				</div>
				<div>
					<label htmlFor="releaseDate">Release Date</label>
					<input type="date" id="releaseDate" name="releaseDate" required value={formData.releaseDate} onChange={e => setData({...formData, releaseDate: e.target.value})}/>
				</div>
				<div>
					<label htmlFor="discontinuedDate">Discontinued Date</label>
					<input type="date" id="discontinuedDate" name="discontinuedDate" value={formData.discontinuedDate} onChange={e => setData({...formData, discontinuedDate: e.target.value})}/>
				</div>
				<button type="submit">Submit</button>
			</form>
			{loading && <p>Loading...</p>}
			{consoles && consoles.map(con => <ConsoleCard con={con} key={con._id} />) }
			<ToastContainer theme="dark"/>
		</>
	);
}
