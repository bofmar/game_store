import mongoose from "mongoose";
import dotenv from 'dotenv';
import Game from "./models/game.js";
import Publisher from "./models/publisher.js";
import Console from "./models/console.js";
import Genre from "./models/genre.js";

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

const MONGOURI =  process.env.MONGO_PROD_URI; 

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
	genres.push(genre);
	await genre.save();
	console.log(`Added genre: ${name}`);
}

async function publisherCreate(name: string, date_founded: Date, bio: string) {
	let publisherDetail: IPublisher = { name : name, date_founded: date_founded, bio: bio};

	const publisher = new Publisher(publisherDetail);

	publishers.push(publisher);
	await publisher.save();
	console.log(`Added publisher: ${name}`);
}

async function consoleCreate(name: string, developer_name: string, description: string, release_date: Date, discontinued_date: Date | null) {
	const consoleDetail: IConsole = {
		name: name,
		developer_name: developer_name,
		description: description,
		release_date: release_date,
	};

	if(discontinued_date) {
		consoleDetail.discontinued_date = discontinued_date;
	}

	const newConsole = new Console(consoleDetail);
	consoles.push(newConsole);
	await newConsole.save();
	console.log(`Added console: ${developer_name} ${name}`);
}

async function gameCreate({_id, title, release_date, description, copies_in_stock, price, publisher, genres, consoles}: IGame) {
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
	};

	const game = new Game(gameDetail);
	await game.save();
	console.log(`Added game: ${title}`);
}

async function createGenres() {
	console.log("Adding genres");
	await Promise.all([
		genreCreate("Action"),
		genreCreate("Beat 'em up"),
		genreCreate("Hack and slash"),
		genreCreate("Fighting"),
		genreCreate("Platformer"),
		genreCreate("Shooter"),
		genreCreate("Survival"),
		genreCreate("Battle Royale"),
		genreCreate("Action adventure"),
		genreCreate("Stealth"),
		genreCreate("Adventure"),
		genreCreate("Interactive fiction"),
		genreCreate("Interactive movie"),
		genreCreate("Visual novel"),
		genreCreate("Gacha"),
		genreCreate("Horror"),
		genreCreate("Survival horror"),
		genreCreate("Licensed"),
		genreCreate("Masocore"),
		genreCreate("MMO"),
		genreCreate("RPG"),
		genreCreate("Action RPG"),
		genreCreate("Tactical RPG"),
		genreCreate("JRPG"),
		genreCreate("Sci-fi"),
		genreCreate("Simulation"),
		genreCreate("Construction and management"),
		genreCreate("Life simulator"),
		genreCreate("Sports"),
		genreCreate("Vehicle"),
		genreCreate("Strategy"),
		genreCreate("4X"),
		genreCreate("Auto battler"),
		genreCreate("MOBA"),
		genreCreate("RTS"),
		genreCreate("TTS"),
		genreCreate("Tower defense"),
		genreCreate("Turn based strategy"),
	]);
}

async function createPublishers() {
	console.log("Adding publishers");
	await Promise.all([
		publisherCreate('Bethesda Softworks', new Date('1986-06-28'), 'Bethesda Softworks LLC is an American video game publisher based in Rockville, Maryland. The company was founded by Christopher Weaver in 1986 as a division of Media Technology Limited. In 1999, it became a subsidiary of ZeniMax Media. In its first 15 years, it was a video game developer and self-published its titles. In 2001, Bethesda spun off its own in-house development team into Bethesda Game Studios, and Bethesda Softworks retained only its publishing function. '),
		publisherCreate('Activistion Blizzard', new Date('2008-07-10'), 'generic bio'),
		publisherCreate('Nintendo', new Date('1967-07-10'), 'generic bio'),
		publisherCreate('Sega', new Date('1973-07-10'), 'generic bio'),
		publisherCreate('Atlus', new Date('1985-07-10'), 'generic bio'),
	]);
}

async function createGames() {
	console.log("Adding Games");
	let i = 2;
	await Promise.all([
		gameCreate({ _id: '1', title: `The Elder Scrolls V: Skyrim`, release_date: new Date('2011-11-11'), description: "The Elder Scrolls V: Skyrim is an action role-playing video game developed by Bethesda Game Studios and published by Bethesda Softworks. It is the fifth main installment in The Elder Scrolls series, following The Elder Scrolls IV: Oblivion (2006), and was released worldwide for Microsoft Windows, PlayStation 3, and Xbox 360 on November 11, 2011. ", copies_in_stock: 12, price: 14.99, publisher: publishers[0], genres: [genres[21]], consoles: [consoles[0], consoles[3], consoles[4], consoles[10], consoles[11], consoles[12], consoles[13] ]}),
		gameCreate({ _id: `${i}`, title: `Test game ${i++}`, release_date: new Date('2008-07-02'), description: 'generic game description', copies_in_stock: i, price: 59.99, publisher: publishers[0], genres: [genres[0], genres[2]], consoles: [consoles[1]]}),
		gameCreate({ _id: `${i}`, title: `Test game ${i++}`, release_date: new Date('2008-07-01'), description: 'generic game description', copies_in_stock: i, price: 59.99, publisher: publishers[0], genres: [genres[0], genres[2]], consoles: [consoles[2]]}),
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
		consoleCreate('PC', 'Various', "A gaming computer, also known as a gaming PC, is a specialized personal computer designed for playing video games at high standards. Gaming PCs typically differ from mainstream personal computers by using high-performance video cards, a high core-count central processing units with raw performance and higher-performance RAM. Gaming PCs are also used for other demanding tasks such as video editing.Gamers and computer enthusiasts may choose to overclock their CPUs and GPUs in order to gain extra performance. The added power draw needed to overclock either processing units often requires additional cooling, usually by air cooling or water cooling. The Nimrod, which was released in 1951 vy Ferrari is commonly thought as the first gaming computer. ", new Date('1951-05-05'), null),
		consoleCreate('Nintendo DS', 'Nintendo', "The Nintendo DS[a] is a handheld game console produced by Nintendo, released globally across 2004 and 2005. The DS, an initialism for 'Developers' System' or 'Dual Screen', introduced distinctive new features to handheld games: two LCD screens working in tandem (the bottom one being a touchscreen), a built-in microphone and support for wireless connectivity. Both screens are encompassed within a clamshell design similar to the Game Boy Advance SP. The Nintendo DS also features the ability for multiple DS consoles to directly interact with each other over Wi-Fi within a short range without the need to connect to an existing wireless network. Alternatively, they could interact online using the now-defunct Nintendo Wi-Fi Connection service. Its main competitor was Sony's PlayStation Portable during the seventh generation of video game consoles.", new Date('2004-11-02'), new Date('20017-07-06')),
		consoleCreate('PlayStation Portable', 'Sony', 'The PlayStation Portable[a] (PSP) is a handheld game console developed and marketed by Sony Interactive Entertainment. It was first released in Japan on December 12, 2004, in North America on March 24, 2005, and in PAL regions on September 1, 2005, and is the first handheld installment in the PlayStation line of consoles. As a seventh generation console, the PSP competed with the Nintendo DS.', new Date('2004-12-12'), new Date('20014-01-01')),
		consoleCreate('Xbox 360', 'Microsoft', "The Xbox 360 is a home video game console developed by Microsoft. As the successor to the original Xbox, it is the second console in the Xbox series. It competed with Sony's PlayStation 3 and Nintendo's Wii as part of the seventh generation of video game consoles. It was officially unveiled on MTV on May 12, 2005, with detailed launch and game information announced later that month at the 2005 Electronic Entertainment Expo (E3)", new Date('2005-11-22'), new Date('20016-04-20')),
		consoleCreate('PlayStation 3', 'Sony', "The PlayStation 3 (PS3) is a home video game console developed and marketed by Sony Interactive Entertainment. The successor to the PlayStation 2, it is part of the PlayStation brand of consoles. It was first released on November 11, 2006, in Japan, November 17, 2006, in North America, and March 23, 2007, in Europe and Australia. The PlayStation 3 competed primarily against Microsoft's Xbox 360 and Nintendo's Wii as part of the seventh generation of video game consoles. ", new Date('2006-11-11'), new Date('20016-03-01')),
		consoleCreate('Wii', 'Nintendo', "The Wii[g] (/wiː/ WEE) is a home video game console developed and marketed by Nintendo. It was released on November 19, 2006, in North America and in December 2006 for most other regions of the world. It is Nintendo's fifth major home game console, following the GameCube and is a seventh-generation console alongside Microsoft's Xbox 360 and Sony's PlayStation 3.", new Date('2006-02-12'), new Date('20013-10-24')),
		consoleCreate('Wii U', 'Nintendo', "The Wii U (/ˌwiː ˈjuː/ WEE YOO) is a home video game console developed by Nintendo as the successor to the Wii. Released in late 2012, it is the first eighth-generation video game console and competed with Microsoft's Xbox One and Sony's PlayStation 4.", new Date('2012-11-18'), new Date('20017-01-31')),
		consoleCreate('Nintendo 3DS', 'Nintendo', "The Nintendo 3DS is a handheld game console produced by Nintendo. The console was announced in March 2010 and unveiled at E3 2010 as the successor to the Nintendo DS. The system features backward compatibility with Nintendo DS video games. As an eighth-generation console, its primary competitor was Sony's PlayStation Vita.", new Date('2011-02-26'), new Date('20020-09-16')),
		consoleCreate('PlayStation Vita', 'Sony', "The PlayStation Vita (PS Vita, or Vita) is a handheld game console developed and marketed by Sony Interactive Entertainment. It was first released in Japan on December 17, 2011, and in North America, Europe, and other international territories beginning on February 22, 2012. The console is the successor to the PlayStation Portable, and a part of the PlayStation brand of gaming devices; as part of the eighth generation of video game consoles, it primarily competed with the Nintendo 3DS.", new Date('2011-12-17'), new Date('20019-03-01')),
		consoleCreate('PlayStation 4', 'Sony', "The PlayStation 4 (PS4) is a home video game console developed by Sony Interactive Entertainment. Announced as the successor to the PlayStation 3 in February 2013, it was launched on November 15, 2013, in North America, November 29, 2013 in Europe, South America and Australia, and on February 22, 2014 in Japan. A console of the eighth generation, it competes with Microsoft's Xbox One and Nintendo's Wii U and Switch. ", new Date('2013-11-15'), null),
		consoleCreate('Xbox One', 'Microsoft', "The Xbox One is a home video game console developed by Microsoft. Announced in May 2013, it is the successor to Xbox 360 and the third console in the Xbox series. It was first released in North America, parts of Europe, Australia, and South America in November 2013 and in Japan, China, and other European countries in September 2014. It is the first Xbox game console to be released in China, specifically in the Shanghai Free-Trade Zone. Microsoft marketed the device as an 'all-in-one entertainment system', hence the name 'Xbox One'. An eighth-generation console, it mainly competed against Sony's PlayStation 4 and Nintendo's Wii U and later the Switch. ", new Date('2013-11-22'), new Date('20020-01-01')),
		consoleCreate('Nintendo Switch', 'Nintendo', "The Nintendo Switch is a hybrid video game console developed by Nintendo and released worldwide in most regions on March 3, 2017. The console itself is a tablet that can either be docked for home console use or used as a portable device, making it a hybrid console. Its wireless Joy-Con controllers, with standard buttons and directional analog sticks for user input, motion sensing, and tactile feedback, can attach to both sides of the console to support handheld-style play. They can also connect to a grip accessory to provide a traditional home console gamepad form, or be used individually in the hand like the Wii Remote and Nunchuk, supporting local multiplayer modes. The Nintendo Switch's software supports online gaming through Internet connectivity, as well as local wireless ad hoc connectivity with other consoles. Nintendo Switch games and software are available on both physical flash-based ROM cartridges and digital distribution via Nintendo eShop; the system has no region lockout. A handheld-focused revision of the system, called the Nintendo Switch Lite, was released on September 20, 2019. A revised higher-end version of the original system, featuring an OLED screen, was released on October 8, 2021. ", new Date('2017-03-03'), null),
		consoleCreate('PlayStation 5', 'Sony', "The PlayStation 5 (PS5) is a home video game console developed by Sony Interactive Entertainment. It was announced as the successor to the PlayStation 4 in April 2019, was launched on November 12, 2020, in Australia, Japan, New Zealand, North America, and South Korea, and was released worldwide one week later. The PS5 is part of the ninth generation of video game consoles, along with Microsoft's Xbox Series X/S consoles, which were released in the same month. ", new Date('2020-11-19'), null),
		consoleCreate('Xbox Series X/S', 'Microsoft', "The Xbox Series X and Series S are the fourth generation of the Xbox series of home video game consoles developed and sold by Microsoft. Released on November 10, 2020, the higher-end Xbox Series X and lower-end Xbox Series S are part of the ninth generation of video game consoles, which also includes Sony's PlayStation 5, released the same month.[4] They superseded the Xbox One. ", new Date('2020-11-10'), null),
	]);
}
