import { FormEvent, useState } from "react";
import AllGames from "./AllGames";
import { SERVER_URI } from "../constats";
import { ToastContainer, toast } from "react-toastify";

interface IFormData {
	title: string;
	image: '' | File;
}

export default function GamePanel() {
	const url = `${SERVER_URI}catalog/games`;
	const [formData, setData] = useState<IFormData>({title: '', image: '' });

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault();
		const delay = 2000;
		const loadToast = toast.loading('Please wait....');

		const submitData = new FormData();
		submitData.append('_id', '1');
		submitData.append('name', formData.title);
		submitData.append('image', formData.image);

		// TODO Frontend data validation

		const response = await fetch(url, {
			method: 'POST',
			mode: 'cors',
			body: submitData,
		});

		if(response.status === 400){ // The genre already exists
			toast.update(loadToast, { render: `${formData.title} already exists in the database`, type: 'warning', isLoading: false, autoClose: delay });
		} else if(response.status === 201) { // The genre was created successfully
			toast.update(loadToast, { render: `${formData.title} was created`, type: 'success', isLoading: false, autoClose: delay});
			setTimeout(() => window.location.reload(), delay);
		} else { // something went wrong
			toast.update(loadToast, { render: 'Something went wrong. Please try again later', type: 'error', isLoading: false, autoClose: delay});
		}
	}

	return (
		<>
			<form method="POST" action={url} onSubmit={event => handleSubmit(event)}>
				<div>
					<label htmlFor="name">Name</label>
					<input type="text" id="name" name="name" required value={formData.title} onChange={e => setData({...formData, title: e.target.value})}/>
				</div>
				<div>
					<input type="file" id="image" name="image" required accept="image/*" onChange={e => setData({...formData, image: e.target.files![0]})}/>
				</div>
				<button type="submit">Submit</button>
			</form>
			<AllGames fromPanel={true} />
			<ToastContainer />
		</>
	);
}
