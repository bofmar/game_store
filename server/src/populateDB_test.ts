import mongoose from "mongoose";
import dotenv from 'dotenv';
import Game from "./models/game.js";
import Publisher from "./models/publisher.js";
import Console from "./models/console.js";
import Genre from "./models/genre.js";
import fs from 'fs';
import path from 'path';
import url from 'url';

interface IPublisher {
	name: string;
    date_founded: Date;
	bio: string;
};

interface IGenre {
	name: string;
}

interface IConsole {
	name: string;
	developer_name: string;
	description: string;
	release_date: Date;
	discontinued_date?: Date;
}


interface IGame {
	_id: string,
	title: string;
	release_date: Date;
	description: string;
	copies_in_stock: number;
	price: number;
	publisher: IPublisher;
	genres: Array<IGenre>;
	consoles: Array<IConsole>;
}

console.log(
  'This script populates some test games, publishers, genres and consoles to the tests database.'
);

dotenv.config();

const MONGOURI =  process.env.MONGO_TEST_URI; 
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.join(__dirname, '..');
const imagePath = path.join(ROOT, 'public/images');

const genres: Array<IGenre> = [];
const publishers: Array<IPublisher> = [];
const consoles: Array<IConsole> = [];

mongoose.set("strictQuery", false); // Prepare for Mongoose 7

main().catch((err) => console.log(err));

async function main() {
	console.log("Debug: About to connect");
	await mongoose.connect(MONGOURI as string);
	console.log("Debug: Should be connected?");
	await createGenres();
	await createPublishers();
	await createConsoles();
	await createGames();
	console.log("Debug: Closing mongoose");
	mongoose.connection.close();
}

async function genreCreate(name: string) {
	const genre = new Genre({ name: name });
	await genre.save();
	genres.push(genre);
	console.log(`Added genre: ${name}`);
}

async function publisherCreate(name: string, date_founded: Date, bio: string) {
	let publisherDetail: IPublisher = { name : name, date_founded: date_founded, bio: bio};

	const publisher = new Publisher(publisherDetail);

	await publisher.save();
	publishers.push(publisher);
	console.log(`Added publisher: ${name}`);
}

async function consoleCreate(name: string, developer_name: string, description: string, release_date: Date, discontinued_date: Date) {
	const consoleDetail: IConsole = {
		name: name,
		developer_name: developer_name,
		description: description,
		release_date: release_date,
		discontinued_date: discontinued_date,
	};

	const newConsole = new Console(consoleDetail);
	await newConsole.save();
	consoles.push(newConsole);
	console.log(`Added console: ${developer_name} ${name}`);
}

function getImage(name: string) {
	return fs.readFileSync(path.join(imagePath, `${name}.jpeg`), 'base64');
}

async function gameCreate({_id, title, release_date, description, copies_in_stock, price, publisher, genres, consoles}: IGame) {
	let image = getImage('1');
	const gameDetail = {
		_id: _id,
		title: title,
		release_date: release_date,
		description: description,
		copies_in_stock: copies_in_stock,
		price: price,
		publisher: publisher,
		genres: genres,
		consoles: consoles,
		image: image,
	};

	const game = new Game(gameDetail);
	await game.save();
	console.log(`Added game: ${title}`);
}

async function createGenres() {
	console.log("Adding genres");
	await Promise.all([
		genreCreate("Fantasy"),
		genreCreate("First Person Shooter"),
		genreCreate("RPG"),
	]);
}

async function createPublishers() {
	console.log("Adding publishers");
	await Promise.all([
		publisherCreate('Activistion Blizzard', new Date('2008-07-10'), 'generic bio'),
		publisherCreate('Nintendo', new Date('1967-07-10'), 'generic bio'),
		publisherCreate('Sega', new Date('1973-07-10'), 'generic bio'),
		publisherCreate('Atlus', new Date('1985-07-10'), 'generic bio'),
	]);
}

async function createGames() {
	console.log("Adding Games");
	let i = 1;
	await Promise.all([
		gameCreate({ _id: `${i}`, title: `Test game ${i++}`, release_date: new Date('2008-07-01'), description: 'generic game description', copies_in_stock: i, price: 59.99, publisher: publishers[0], genres: [genres[0], genres[2]], consoles: [consoles[0]] }),
		gameCreate({ _id: `${i}`, title: `Test game ${i++}`, release_date: new Date('2008-07-02'), description: 'generic game description', copies_in_stock: i, price: 59.99, publisher: publishers[0], genres: [genres[0], genres[2]], consoles: [consoles[1]] }),
		gameCreate({ _id: `${i}`, title: `Test game ${i++}`, release_date: new Date('2008-07-01'), description: 'generic game description', copies_in_stock: i, price: 59.99, publisher: publishers[0], genres: [genres[0], genres[2]], consoles: [consoles[2]] }),
		gameCreate({ _id: `${i}`, title: `Test game ${i++}`, release_date: new Date('2008-07-01'), description: 'generic game description', copies_in_stock: i, price: 59.99, publisher: publishers[0], genres: [genres[0], genres[2]], consoles: [consoles[3]]}),
		gameCreate({ _id: `${i}`, title: `Test game ${i++}`, release_date: new Date('2008-07-01'), description: 'generic game description', copies_in_stock: i, price: 59.99, publisher: publishers[0], genres: [genres[0], genres[2]], consoles: [consoles[4]]}),
		gameCreate({ _id: `${i}`, title: `Test game ${i++}`, release_date: new Date('2008-07-01'), description: 'generic game description', copies_in_stock: i, price: 59.99, publisher: publishers[0], genres: [genres[0], genres[2]], consoles: [consoles[5]]}),
		gameCreate({ _id: `${i}`, title: `Test game ${i++}`, release_date: new Date('2008-07-01'), description: 'generic game description', copies_in_stock: i, price: 59.99, publisher: publishers[0], genres: [genres[0], genres[2]], consoles: [consoles[6]]}),
		gameCreate({ _id: `${i}`, title: `Test game ${i++}`, release_date: new Date('2008-07-01'), description: 'generic game description', copies_in_stock: i, price: 59.99, publisher: publishers[0], genres: [genres[0], genres[2]], consoles: [consoles[7]]}),
		gameCreate({ _id: `${i}`, title: `Test game ${i++}`, release_date: new Date('2008-07-01'), description: 'generic game description', copies_in_stock: i, price: 59.99, publisher: publishers[0], genres: [genres[0], genres[2]], consoles: [consoles[8]]}),
		gameCreate({ _id: `${i}`, title: `Test game ${i++}`, release_date: new Date('2008-08-01'), description: 'generic game description', copies_in_stock: i, price: 69.99, publisher: publishers[0], genres: [genres[0], genres[2]], consoles: [consoles[0]]}),
		gameCreate({ _id: `${i}`, title: `Test game ${i++}`, release_date: new Date('2008-07-01'), description: 'generic game description', copies_in_stock: i, price: 59.99, publisher: publishers[0], genres: [genres[0], genres[2]], consoles: [consoles[1]]}),
		gameCreate({ _id: `${i}`, title: `Test game ${i++}`, release_date: new Date('2008-07-01'), description: 'generic game description', copies_in_stock: i, price: 59.99, publisher: publishers[0], genres: [genres[0], genres[2]], consoles: [consoles[0]]}),
		gameCreate({ _id: `${i}`, title: `Test game ${i++}`, release_date: new Date('2008-07-01'), description: 'generic game description', copies_in_stock: i, price: 29.99, publisher: publishers[0], genres: [genres[0], genres[2]], consoles: [consoles[0]]}),
		gameCreate({ _id: `${i}`, title: `Test game ${i++}`, release_date: new Date('2008-07-01'), description: 'generic game description', copies_in_stock: i, price: 59.99, publisher: publishers[0], genres: [genres[0], genres[2]], consoles: [consoles[0]]}),
		gameCreate({ _id: `${i}`, title: `Test game ${i++}`, release_date: new Date('2008-07-01'), description: 'generic game description', copies_in_stock: i, price: 59.99, publisher: publishers[0], genres: [genres[0], genres[2]], consoles: [consoles[2]]}),
		gameCreate({ _id: `${i}`, title: `Test game ${i++}`, release_date: new Date('2008-06-01'), description: 'generic game description', copies_in_stock: i, price: 59.99, publisher: publishers[0], genres: [genres[0], genres[2]], consoles: [consoles[0]]}),
		gameCreate({ _id: `${i}`, title: `Test game ${i++}`, release_date: new Date('2008-07-01'), description: 'generic game description', copies_in_stock: i, price: 19.99, publisher: publishers[0], genres: [genres[0], genres[2]], consoles: [consoles[0]]}),
		gameCreate({ _id: `${i}`, title: `Test game ${i++}`, release_date: new Date('2008-07-01'), description: 'generic game description', copies_in_stock: i, price: 59.99, publisher: publishers[0], genres: [genres[0], genres[2]], consoles: [consoles[1]]}),
		gameCreate({ _id: `${i}`, title: `Test game ${i++}`, release_date: new Date('2008-07-01'), description: 'generic game description', copies_in_stock: i, price: 59.99, publisher: publishers[0], genres: [genres[0], genres[1]], consoles: [consoles[0]]}),
		gameCreate({ _id: `${i}`, title: `Test game ${i++}`, release_date: new Date('2008-07-01'), description: 'generic game description', copies_in_stock: i, price: 59.99, publisher: publishers[0], genres: [genres[0], genres[2]], consoles: [consoles[1]]}),
		gameCreate({ _id: `${i}`, title: `Test game ${i++}`, release_date: new Date('2008-07-01'), description: 'generic game description', copies_in_stock: i, price: 59.99, publisher: publishers[0], genres: [genres[0], genres[2]], consoles: [consoles[0]]}),
		gameCreate({ _id: `${i}`, title: `Test game ${i++}`, release_date: new Date('2008-07-01'), description: 'generic game description', copies_in_stock: i, price: 59.99, publisher: publishers[0], genres: [genres[0], genres[2]], consoles: [consoles[2]]}),
		gameCreate({ _id: `${i}`, title: `Test game ${i++}`, release_date: new Date('2008-07-01'), description: 'generic game description', copies_in_stock: i, price: 59.99, publisher: publishers[0], genres: [genres[0], genres[2]], consoles: [consoles[0]]}),
		gameCreate({ _id: `${i}`, title: `Test game ${i++}`, release_date: new Date('2008-07-01'), description: 'generic game description', copies_in_stock: i, price: 59.99, publisher: publishers[0], genres: [genres[0], genres[2]], consoles: [consoles[2]]}),
		gameCreate({ _id: `${i}`, title: `Test game ${i++}`, release_date: new Date('2008-07-01'), description: 'generic game description', copies_in_stock: i, price: 59.99, publisher: publishers[0], genres: [genres[0], genres[2]], consoles: [consoles[0]]}),
		gameCreate({ _id: `${i}`, title: `Test game ${i++}`, release_date: new Date('2008-07-01'), description: 'generic game description', copies_in_stock: i, price: 59.99, publisher: publishers[0], genres: [genres[0], genres[2]], consoles: [consoles[0]]}),
		gameCreate({ _id: `${i}`, title: `Test game ${i++}`, release_date: new Date('2008-07-01'), description: 'generic game description', copies_in_stock: i, price: 59.99, publisher: publishers[0], genres: [genres[1], genres[2]], consoles: [consoles[0]]}),
		gameCreate({ _id: `${i}`, title: `Test game ${i++}`, release_date: new Date('2008-07-01'), description: 'generic game description', copies_in_stock: i, price: 59.99, publisher: publishers[1], genres: [genres[0], genres[2]], consoles: [consoles[2]]}),
		gameCreate({ _id: `${i}`, title: `Test game ${i++}`, release_date: new Date('2008-07-01'), description: 'generic game description', copies_in_stock: i, price: 59.99, publisher: publishers[2], genres: [genres[0], genres[2]], consoles: [consoles[1]]}),
		gameCreate({ _id: `${i}`, title: `Test game ${i++}`, release_date: new Date('2008-07-01'), description: 'generic game description', copies_in_stock: i, price: 59.99, publisher: publishers[0], genres: [genres[0], genres[2]], consoles: [consoles[2]]}),
		gameCreate({ _id: `${i}`, title: `Test game ${i++}`, release_date: new Date('2008-07-01'), description: 'generic game description', copies_in_stock: i, price: 59.99, publisher: publishers[0], genres: [genres[0], genres[2]], consoles: [consoles[3]]}),
		gameCreate({ _id: `${i}`, title: `Test game ${i++}`, release_date: new Date('2008-07-01'), description: 'generic game description', copies_in_stock: i, price: 59.99, publisher: publishers[0], genres: [genres[0], genres[2]], consoles: [consoles[4]]}),
		gameCreate({ _id: `${i}`, title: `Test game ${i++}`, release_date: new Date('2008-07-01'), description: 'generic game description', copies_in_stock: i, price: 59.99, publisher: publishers[0], genres: [genres[0], genres[2]], consoles: [consoles[5]]}),
		gameCreate({ _id: `${i}`, title: `Test game ${i++}`, release_date: new Date('2008-07-01'), description: 'generic game description', copies_in_stock: i, price: 59.99, publisher: publishers[0], genres: [genres[1]], consoles: [consoles[6]]}),
		gameCreate({ _id: `${i}`, title: `Test game ${i++}`, release_date: new Date('2008-07-01'), description: 'generic game description', copies_in_stock: i, price: 59.99, publisher: publishers[0], genres: [genres[0], genres[2]], consoles: [consoles[7]]}),
		gameCreate({ _id: `${i}`, title: `Test game ${i++}`, release_date: new Date('2008-07-01'), description: 'generic game description', copies_in_stock: i, price: 59.99, publisher: publishers[1], genres: [genres[0], genres[2]], consoles: [consoles[8]]}),
		gameCreate({ _id: `${i}`, title: `Test game ${i++}`, release_date: new Date('2008-07-01'), description: 'generic game description', copies_in_stock: i, price: 59.99, publisher: publishers[0], genres: [genres[0], genres[2]], consoles: [consoles[0]]}),
		gameCreate({ _id: `${i}`, title: `Test game ${i++}`, release_date: new Date('2008-07-01'), description: 'generic game description', copies_in_stock: i, price: 59.99, publisher: publishers[0], genres: [genres[0], genres[2]], consoles: [consoles[0]]}),
		gameCreate({ _id: `${i}`, title: `Test game ${i++}`, release_date: new Date('2008-07-01'), description: 'generic game description', copies_in_stock: i, price: 59.99, publisher: publishers[3], genres: [genres[0], genres[2]], consoles: [consoles[0]]}),
		gameCreate({ _id: `${i}`, title: `Test game ${i++}`, release_date: new Date('2008-07-01'), description: 'generic game description', copies_in_stock: i, price: 59.99, publisher: publishers[3], genres: [genres[0], genres[2]], consoles: [consoles[0]]}),
		gameCreate({ _id: `${i}`, title: `Test game ${i++}`, release_date: new Date('2008-07-01'), description: 'generic game description', copies_in_stock: i, price: 59.99, publisher: publishers[3], genres: [genres[0]], consoles: [consoles[0]]}),
	]);
}

async function createConsoles() {
	console.log("Adding consoles");
	await Promise.all([
		consoleCreate('Switch', 'Nintendo', 'generic console description', new Date('2008-07-10'), new Date('20012-09-13')),
		consoleCreate('PC', 'Various', 'generic console description', new Date('2008-07-10'), new Date('20012-09-13')),
		consoleCreate('Saturn', 'Sega', 'generic console description', new Date('2008-07-10'), new Date('20012-09-13')),
		consoleCreate('Gameboy', 'Nintendo', 'generic console description', new Date('2008-07-10'), new Date('20012-09-13')),
		consoleCreate('Xbox', 'Microsoft', 'generic console description', new Date('2008-07-10'), new Date('20012-09-13')),
		consoleCreate('Playstation 5', 'Sony', 'generic console description', new Date('2008-07-10'), new Date('20012-09-13')),
		consoleCreate('Playstation', 'Sony', 'generic console description', new Date('2008-07-10'), new Date('20012-09-13')),
		consoleCreate('Jaguar', 'Atari', 'generic console description', new Date('2008-07-10'), new Date('20012-09-13')),
		consoleCreate('Super Nintendo', 'Nintendo', 'generic console description', new Date('2008-07-10'), new Date('20012-09-13')),

	]);
}

