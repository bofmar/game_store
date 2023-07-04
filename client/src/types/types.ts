export interface IPublisher {
	_id: string;
	name: string;
    date_founded: string;
	bio: string;
}

export interface IGenre {
	_id: string;
	name: string;
}

export interface IConsole {
	_id: string;
	name: string;
	developer_name: string;
	description: string;
	release_date: string;
	discontinued_date?: string;
}


export interface IGame {
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

export interface IGameForm {
	_id: string;
	title: string;
	release_date: string; 
	description: string;
	copies_in_stock: string;
	price: string;
	publisher?: {_id: string};
	genres?: Array<{_id: string}>;
	consoles?: Array<{_id: string}>;
	image: '' | File;
}

export interface IFilters {
	title: string;
	price: string;
}
