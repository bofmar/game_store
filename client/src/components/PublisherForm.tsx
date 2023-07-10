import { FormEvent, useState } from "react";
import { IPublisher } from "../types/types";

interface IFormProps {
	url: string;
	handleSubmit: (event: FormEvent, data: IPublisher) => void;
	publisher?: IPublisher;
}

export default function PublisherForm({url, handleSubmit, publisher}: IFormProps) {
	const [formData, setData] = useState<IPublisher>({
		_id: '',
		name: publisher?.name || '',
		bio: publisher?.bio || '',
		date_founded: publisher?.date_founded?.slice(0,10) || '',
	});

	return (
			<form className='controls-form' method="POST" action={url} onSubmit={event => handleSubmit(event, formData)}>
				<div>
					<label htmlFor="name">Name</label>
					<input type="text" id="name" name="name" required value={formData.name} onChange={e => setData({...formData, name: e.target.value})}/>
				</div>
				<div>
					<label htmlFor="dateFounded">Date Founded</label>
					<input type="date" id="dateFounded" name="dateFounded" required value={formData.date_founded} onChange={e => setData({...formData, date_founded: e.target.value})}/>
				</div>
				<div>
					<label htmlFor="bio">Biography</label>
					<textarea id="bio" rows={20} cols={50} name="bio" required value={formData.bio} onChange={e => setData({...formData, bio: e.target.value})}/>
				</div>
				<button className='orange-button' type="submit">Submit</button>
			</form>
	)
}
