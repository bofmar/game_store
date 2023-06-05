export interface IPublisher {
	name: string;
    date_founded: Date;
	bio: string;
	logo?: string;
}

export interface IGenre {
	_id: string;
	name: string;
}

export interface IConsole {
	name: string;
	developer_name: string;
	description: string;
	release_date: Date;
	discontinued_date?: Date;
	image?: string;
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
	image?: string;
}

