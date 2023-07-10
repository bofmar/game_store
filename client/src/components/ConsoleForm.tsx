import { FormEvent, useState } from "react";
import { IConsole } from "../types/types";

interface IFormProps {
	url: string;
	handleSubmit: (event: FormEvent, data: IConsole) => void;
	con?: IConsole;
}

export default function ConsoleForm({url, handleSubmit, con}: IFormProps) {
	const [formData, setData] = useState<IConsole>({
		_id: '',
		name: con?.name || '',
		developer_name: con?.developer_name || '',
		description: con?.description || '',
		release_date: con?.release_date.slice(0,10) || '',
		discontinued_date: con?.discontinued_date?.slice(0,10) || '',
	});
	return (
			<form className='center-wrapper-column controls-form' method="POST" action={url} onSubmit={event => handleSubmit(event, formData)}>
				<div>
					<label htmlFor="name">Name</label>
					<input type="text" id="name" name="name" required value={formData.name} onChange={e => setData({...formData, name: e.target.value})}/>
				</div>
				<div>
					<label htmlFor="developer">Developer</label>
					<input type="text" id="developer" name="developer" required value={formData.developer_name} onChange={e => setData({...formData, developer_name: e.target.value})}/>
				</div>
				<div>
					<label htmlFor="releaseDate">Release Date</label>
					<input type="date" id="releaseDate" name="releaseDate" required value={formData.release_date} onChange={e => setData({...formData, release_date: e.target.value})}/>
				</div>
				<div>
					<label htmlFor="discontinuedDate">Discontinued Date</label>
					<input type="date" id="discontinuedDate" name="discontinuedDate" value={formData.discontinued_date} onChange={e => setData({...formData, discontinued_date: e.target.value})}/>
				</div>
				<div>
					<label htmlFor="description">Description</label>
					<textarea id="description" rows={20} cols={50} name="description" required value={formData.description} onChange={e => setData({...formData, description: e.target.value})}/>
				</div>
				<button className='orange-button' type="submit">Submit</button>
			</form>
	)
}
