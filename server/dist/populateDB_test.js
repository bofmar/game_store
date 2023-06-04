import mongoose from "mongoose";
import dotenv from 'dotenv';
import Game from "./models/game.js";
import Publisher from "./models/publisher.js";
import Console from "./models/console.js";
import Genre from "./models/genre.js";
;
console.log('This script populates some test games, publishers, genres and consoles to the tests database.');
dotenv.config();
// Get arguments passed on command line
const MONGOURI = process.env.MONGO_TEST_URI;
const TEST_IMAGE = process.env.TEST_IMAGE;
const genres = [];
const publishers = [];
const consoles = [];
mongoose.set("strictQuery", false); // Prepare for Mongoose 7
main().catch((err) => console.log(err));
async function main() {
    console.log("Debug: About to connect");
    await mongoose.connect(MONGOURI);
    console.log("Debug: Should be connected?");
    await createGenres();
    await createPublishers();
    await createConsoles();
    await createGames();
    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
}
async function genreCreate(name) {
    const genre = new Genre({ name: name });
    await genre.save();
    genres.push(genre);
    console.log(`Added genre: ${name}`);
}
async function publisherCreate(name, date_founded, bio, logo) {
    let publisherDetail = { name: name, date_founded: date_founded, bio: bio };
    if (logo)
        publisherDetail.logo = logo;
    const publisher = new Publisher(publisherDetail);
    await publisher.save();
    publishers.push(publisher);
    console.log(`Added publisher: ${name}`);
}
async function consoleCreate(name, developer_name, description, release_date, discontinued_date, image) {
    const consoleDetail = {
        name: name,
        developer_name: developer_name,
        description: description,
        release_date: release_date,
        discontinued_date: discontinued_date,
        image: image
    };
    const newConsole = new Console(consoleDetail);
    await newConsole.save();
    consoles.push(newConsole);
    console.log(`Added console: ${developer_name} ${name}`);
}
async function gameCreate({ title, release_date, description, copies_in_stock, price, publisher, genres, consoles, image }) {
    const gameDetail = {
        title: title,
        release_date: release_date,
        description: description,
        copies_in_stock: copies_in_stock,
        price: price,
        publisher: publisher,
        genres: genres,
        consoles: consoles,
        image: image
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
        publisherCreate('Activistion Blizzard', new Date('2008-07-10'), 'generic bio', TEST_IMAGE),
        publisherCreate('Nintendo', new Date('1967-07-10'), 'generic bio', TEST_IMAGE),
        publisherCreate('Sega', new Date('1973-07-10'), 'generic bio', TEST_IMAGE),
        publisherCreate('Atlus', new Date('1985-07-10'), 'generic bio', TEST_IMAGE),
    ]);
}
async function createGames() {
    console.log("Adding Games");
    let i = 1;
    await Promise.all([
        gameCreate({ title: `Test game ${i++}`, release_date: new Date('2008-07-01'), description: 'generic game description', copies_in_stock: i, price: 59.99, publisher: publishers[0], genres: [genres[0], genres[2]], consoles: [consoles[0]], image: TEST_IMAGE }),
        gameCreate({ title: `Test game ${i++}`, release_date: new Date('2008-07-02'), description: 'generic game description', copies_in_stock: i, price: 59.99, publisher: publishers[0], genres: [genres[0], genres[2]], consoles: [consoles[1]], image: TEST_IMAGE }),
        gameCreate({ title: `Test game ${i++}`, release_date: new Date('2008-07-01'), description: 'generic game description', copies_in_stock: i, price: 59.99, publisher: publishers[0], genres: [genres[0], genres[2]], consoles: [consoles[2]], image: TEST_IMAGE }),
        gameCreate({ title: `Test game ${i++}`, release_date: new Date('2008-07-01'), description: 'generic game description', copies_in_stock: i, price: 59.99, publisher: publishers[0], genres: [genres[0], genres[2]], consoles: [consoles[3]], image: TEST_IMAGE }),
        gameCreate({ title: `Test game ${i++}`, release_date: new Date('2008-07-01'), description: 'generic game description', copies_in_stock: i, price: 59.99, publisher: publishers[0], genres: [genres[0], genres[2]], consoles: [consoles[4]], image: TEST_IMAGE }),
        gameCreate({ title: `Test game ${i++}`, release_date: new Date('2008-07-01'), description: 'generic game description', copies_in_stock: i, price: 59.99, publisher: publishers[0], genres: [genres[0], genres[2]], consoles: [consoles[5]], image: TEST_IMAGE }),
        gameCreate({ title: `Test game ${i++}`, release_date: new Date('2008-07-01'), description: 'generic game description', copies_in_stock: i, price: 59.99, publisher: publishers[0], genres: [genres[0], genres[2]], consoles: [consoles[6]], image: TEST_IMAGE }),
        gameCreate({ title: `Test game ${i++}`, release_date: new Date('2008-07-01'), description: 'generic game description', copies_in_stock: i, price: 59.99, publisher: publishers[0], genres: [genres[0], genres[2]], consoles: [consoles[7]], image: TEST_IMAGE }),
        gameCreate({ title: `Test game ${i++}`, release_date: new Date('2008-07-01'), description: 'generic game description', copies_in_stock: i, price: 59.99, publisher: publishers[0], genres: [genres[0], genres[2]], consoles: [consoles[8]], image: TEST_IMAGE }),
        gameCreate({ title: `Test game ${i++}`, release_date: new Date('2008-08-01'), description: 'generic game description', copies_in_stock: i, price: 69.99, publisher: publishers[0], genres: [genres[0], genres[2]], consoles: [consoles[0]], image: TEST_IMAGE }),
        gameCreate({ title: `Test game ${i++}`, release_date: new Date('2008-07-01'), description: 'generic game description', copies_in_stock: i, price: 59.99, publisher: publishers[0], genres: [genres[0], genres[2]], consoles: [consoles[1]], image: TEST_IMAGE }),
        gameCreate({ title: `Test game ${i++}`, release_date: new Date('2008-07-01'), description: 'generic game description', copies_in_stock: i, price: 59.99, publisher: publishers[0], genres: [genres[0], genres[2]], consoles: [consoles[0]], image: TEST_IMAGE }),
        gameCreate({ title: `Test game ${i++}`, release_date: new Date('2008-07-01'), description: 'generic game description', copies_in_stock: i, price: 29.99, publisher: publishers[0], genres: [genres[0], genres[2]], consoles: [consoles[0]], image: TEST_IMAGE }),
        gameCreate({ title: `Test game ${i++}`, release_date: new Date('2008-07-01'), description: 'generic game description', copies_in_stock: i, price: 59.99, publisher: publishers[0], genres: [genres[0], genres[2]], consoles: [consoles[0]], image: TEST_IMAGE }),
        gameCreate({ title: `Test game ${i++}`, release_date: new Date('2008-07-01'), description: 'generic game description', copies_in_stock: i, price: 59.99, publisher: publishers[0], genres: [genres[0], genres[2]], consoles: [consoles[2]], image: TEST_IMAGE }),
        gameCreate({ title: `Test game ${i++}`, release_date: new Date('2008-06-01'), description: 'generic game description', copies_in_stock: i, price: 59.99, publisher: publishers[0], genres: [genres[0], genres[2]], consoles: [consoles[0]], image: TEST_IMAGE }),
        gameCreate({ title: `Test game ${i++}`, release_date: new Date('2008-07-01'), description: 'generic game description', copies_in_stock: i, price: 19.99, publisher: publishers[0], genres: [genres[0], genres[2]], consoles: [consoles[0]], image: TEST_IMAGE }),
        gameCreate({ title: `Test game ${i++}`, release_date: new Date('2008-07-01'), description: 'generic game description', copies_in_stock: i, price: 59.99, publisher: publishers[0], genres: [genres[0], genres[2]], consoles: [consoles[1]], image: TEST_IMAGE }),
        gameCreate({ title: `Test game ${i++}`, release_date: new Date('2008-07-01'), description: 'generic game description', copies_in_stock: i, price: 59.99, publisher: publishers[0], genres: [genres[0], genres[1]], consoles: [consoles[0]], image: TEST_IMAGE }),
        gameCreate({ title: `Test game ${i++}`, release_date: new Date('2008-07-01'), description: 'generic game description', copies_in_stock: i, price: 59.99, publisher: publishers[0], genres: [genres[0], genres[2]], consoles: [consoles[1]], image: TEST_IMAGE }),
        gameCreate({ title: `Test game ${i++}`, release_date: new Date('2008-07-01'), description: 'generic game description', copies_in_stock: i, price: 59.99, publisher: publishers[0], genres: [genres[0], genres[2]], consoles: [consoles[0]], image: TEST_IMAGE }),
        gameCreate({ title: `Test game ${i++}`, release_date: new Date('2008-07-01'), description: 'generic game description', copies_in_stock: i, price: 59.99, publisher: publishers[0], genres: [genres[0], genres[2]], consoles: [consoles[2]], image: TEST_IMAGE }),
        gameCreate({ title: `Test game ${i++}`, release_date: new Date('2008-07-01'), description: 'generic game description', copies_in_stock: i, price: 59.99, publisher: publishers[0], genres: [genres[0], genres[2]], consoles: [consoles[0]], image: TEST_IMAGE }),
        gameCreate({ title: `Test game ${i++}`, release_date: new Date('2008-07-01'), description: 'generic game description', copies_in_stock: i, price: 59.99, publisher: publishers[0], genres: [genres[0], genres[2]], consoles: [consoles[2]], image: TEST_IMAGE }),
        gameCreate({ title: `Test game ${i++}`, release_date: new Date('2008-07-01'), description: 'generic game description', copies_in_stock: i, price: 59.99, publisher: publishers[0], genres: [genres[0], genres[2]], consoles: [consoles[0]], image: TEST_IMAGE }),
        gameCreate({ title: `Test game ${i++}`, release_date: new Date('2008-07-01'), description: 'generic game description', copies_in_stock: i, price: 59.99, publisher: publishers[0], genres: [genres[0], genres[2]], consoles: [consoles[0]], image: TEST_IMAGE }),
        gameCreate({ title: `Test game ${i++}`, release_date: new Date('2008-07-01'), description: 'generic game description', copies_in_stock: i, price: 59.99, publisher: publishers[0], genres: [genres[1], genres[2]], consoles: [consoles[0]], image: TEST_IMAGE }),
        gameCreate({ title: `Test game ${i++}`, release_date: new Date('2008-07-01'), description: 'generic game description', copies_in_stock: i, price: 59.99, publisher: publishers[1], genres: [genres[0], genres[2]], consoles: [consoles[2]], image: TEST_IMAGE }),
        gameCreate({ title: `Test game ${i++}`, release_date: new Date('2008-07-01'), description: 'generic game description', copies_in_stock: i, price: 59.99, publisher: publishers[2], genres: [genres[0], genres[2]], consoles: [consoles[1]], image: TEST_IMAGE }),
        gameCreate({ title: `Test game ${i++}`, release_date: new Date('2008-07-01'), description: 'generic game description', copies_in_stock: i, price: 59.99, publisher: publishers[0], genres: [genres[0], genres[2]], consoles: [consoles[2]], image: TEST_IMAGE }),
        gameCreate({ title: `Test game ${i++}`, release_date: new Date('2008-07-01'), description: 'generic game description', copies_in_stock: i, price: 59.99, publisher: publishers[0], genres: [genres[0], genres[2]], consoles: [consoles[3]], image: TEST_IMAGE }),
        gameCreate({ title: `Test game ${i++}`, release_date: new Date('2008-07-01'), description: 'generic game description', copies_in_stock: i, price: 59.99, publisher: publishers[0], genres: [genres[0], genres[2]], consoles: [consoles[4]], image: TEST_IMAGE }),
        gameCreate({ title: `Test game ${i++}`, release_date: new Date('2008-07-01'), description: 'generic game description', copies_in_stock: i, price: 59.99, publisher: publishers[0], genres: [genres[0], genres[2]], consoles: [consoles[5]], image: TEST_IMAGE }),
        gameCreate({ title: `Test game ${i++}`, release_date: new Date('2008-07-01'), description: 'generic game description', copies_in_stock: i, price: 59.99, publisher: publishers[0], genres: [genres[1]], consoles: [consoles[6]], image: TEST_IMAGE }),
        gameCreate({ title: `Test game ${i++}`, release_date: new Date('2008-07-01'), description: 'generic game description', copies_in_stock: i, price: 59.99, publisher: publishers[0], genres: [genres[0], genres[2]], consoles: [consoles[7]], image: TEST_IMAGE }),
        gameCreate({ title: `Test game ${i++}`, release_date: new Date('2008-07-01'), description: 'generic game description', copies_in_stock: i, price: 59.99, publisher: publishers[1], genres: [genres[0], genres[2]], consoles: [consoles[8]], image: TEST_IMAGE }),
        gameCreate({ title: `Test game ${i++}`, release_date: new Date('2008-07-01'), description: 'generic game description', copies_in_stock: i, price: 59.99, publisher: publishers[0], genres: [genres[0], genres[2]], consoles: [consoles[0]], image: TEST_IMAGE }),
        gameCreate({ title: `Test game ${i++}`, release_date: new Date('2008-07-01'), description: 'generic game description', copies_in_stock: i, price: 59.99, publisher: publishers[0], genres: [genres[0], genres[2]], consoles: [consoles[0]], image: TEST_IMAGE }),
        gameCreate({ title: `Test game ${i++}`, release_date: new Date('2008-07-01'), description: 'generic game description', copies_in_stock: i, price: 59.99, publisher: publishers[3], genres: [genres[0], genres[2]], consoles: [consoles[0]], image: TEST_IMAGE }),
        gameCreate({ title: `Test game ${i++}`, release_date: new Date('2008-07-01'), description: 'generic game description', copies_in_stock: i, price: 59.99, publisher: publishers[3], genres: [genres[0], genres[2]], consoles: [consoles[0]], image: TEST_IMAGE }),
        gameCreate({ title: `Test game ${i++}`, release_date: new Date('2008-07-01'), description: 'generic game description', copies_in_stock: i, price: 59.99, publisher: publishers[3], genres: [genres[0]], consoles: [consoles[0]], image: TEST_IMAGE }),
    ]);
}
async function createConsoles() {
    console.log("Adding consoles");
    await Promise.all([
        consoleCreate('Switch', 'Nintendo', 'generic console description', new Date('2008-07-10'), new Date('20012-09-13'), TEST_IMAGE),
        consoleCreate('PC', 'Various', 'generic console description', new Date('2008-07-10'), new Date('20012-09-13'), TEST_IMAGE),
        consoleCreate('Saturn', 'Sega', 'generic console description', new Date('2008-07-10'), new Date('20012-09-13'), TEST_IMAGE),
        consoleCreate('Gameboy', 'Nintendo', 'generic console description', new Date('2008-07-10'), new Date('20012-09-13'), TEST_IMAGE),
        consoleCreate('Xbox', 'Microsoft', 'generic console description', new Date('2008-07-10'), new Date('20012-09-13'), TEST_IMAGE),
        consoleCreate('Playstation 5', 'Sony', 'generic console description', new Date('2008-07-10'), new Date('20012-09-13'), TEST_IMAGE),
        consoleCreate('Playstation', 'Sony', 'generic console description', new Date('2008-07-10'), new Date('20012-09-13'), TEST_IMAGE),
        consoleCreate('Jaguar', 'Atari', 'generic console description', new Date('2008-07-10'), new Date('20012-09-13'), TEST_IMAGE),
        consoleCreate('Super Nintendo', 'Nintendo', 'generic console description', new Date('2008-07-10'), new Date('20012-09-13'), TEST_IMAGE),
    ]);
}
//# sourceMappingURL=populateDB_test.js.map