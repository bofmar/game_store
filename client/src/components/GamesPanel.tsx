import { FormEvent, useState } from "react";
import AllGames from "./AllGames";
import { SERVER_URI } from "../constats";

interface IFormData {
	name: string;
	image: '' | File;
}

export default function GamePanel() {
	const url = `${SERVER_URI}catalog/games`;
	const [formData, setData] = useState<IFormData>({name: '', image: '' });

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault();

		const submitData = new FormData();
		submitData.append('_id', '1');
		submitData.append('name', formData.name || 'hi');
		submitData.append('image', formData.image);

		const response = await fetch(url, {
			method: 'POST',
			mode: 'cors',
			body: submitData,
		});

		console.log(response);
	}

	return (
		<>
			<form method="POST" action={url} onSubmit={event => handleSubmit(event)}>
				<div>
					<label htmlFor="name">Name</label>
					<input type="text" id="name" name="name" value={formData.name} onChange={e => setData({...formData, name: e.target.value})}/>
				</div>
				<div>
					<input type="file" id="image" name="image" required accept="image/*" onChange={e => setData({...formData, image: e.target.files![0]})}/>
				</div>
				<button type="submit">Submit</button>
			</form>
			<AllGames fromPanel={true} />
		</>
	);
}
