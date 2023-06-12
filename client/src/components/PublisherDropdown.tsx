import { ChangeEvent } from "react";
import { IGameForm, IPublisher } from "../types/types";

interface IPubDropProps {
	allPublishers: Array<IPublisher>;
	handlePubSelection: (event: ChangeEvent<HTMLSelectElement>) => void;
	game?: IGameForm;
}

export default function PublisherDropdown(props: IPubDropProps) {
	return (
		<div>
			<label htmlFor="publisher">Publisher</label>
			<select name='publisher' id='publisher' value={props.game ? props.game.publisher._id : undefined}required onChange={e => props.handlePubSelection(e)}>
				<option value=''>---Select One---</option>
				{props.allPublishers.sort((p1,p2) => p1.name > p2.name ? 1 : -1 ).map(publisher => <option value={publisher._id} key={publisher._id} >{publisher.name}</option>)}
			</select>
		</div>
	);
}
