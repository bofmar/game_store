export interface IPublisher {
	kind: 'publisher';
	_id: string;
	name: string;
    date_founded: Date;
	bio: string;
}

export interface IGenre {
	kind: 'genre';
	_id: string;
	name: string;
}

export interface IConsole {
	kind: 'console';
	_id: string;
	name: string;
	developer_name: string;
	description: string;
	release_date: Date;
	discontinued_date?: Date;
}


export interface IGame {
	kind: 'game';
	_id: string;
	title: string;
	release_date: Date;
	description: string;
	copies_in_stock: number;
	price: number;
	publisher: IPublisher;
	genres: Array<IGenre>;
	consoles: Array<IConsole>;
}

