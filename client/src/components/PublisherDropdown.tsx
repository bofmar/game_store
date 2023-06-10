import { ChangeEvent } from "react";
import { IGame, IPublisher } from "../types/types";

interface IPubDropProps {
	allPublishers: Array<IPublisher>;
	handlePubSelection: (event: ChangeEvent<HTMLSelectElement>) => void;
	game?: IGame;
}

export default function PublisherDropdown(props: IPubDropProps) {
	return (
		<div>
			<label htmlFor="publisher">Publisher</label>
			<select name='publisher' id='publisher' onChange={e => props.handlePubSelection(e)}>
				{props.allPublishers.sort((p1,p2) => p1.name > p2.name ? 1 : -1 ).map(publisher => <option value={publisher._id} key={publisher._id} selected={props.game && publisher._id === props.game.publisher._id} >{publisher.name}</option>)}
			</select>
		</div>
	);
}
