import mongoose from "mongoose";
import dotenv from 'dotenv';
import Game from "./models/game.js";
import Publisher from "./models/publisher.js";
import Console from "./models/console.js";
import Genre from "./models/genre.js";
;
console.log('This script populates some test games, publishers, genres and consoles to the tests database.');
dotenv.config();
const MONGOURI = process.env.MONGO_PROD_URI;
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
    genres.push(genre);
    await genre.save();
    console.log(`Added genre: ${name}`);
}
async function publisherCreate(name, date_founded, bio) {
    let publisherDetail = { name: name, date_founded: date_founded, bio: bio };
    const publisher = new Publisher(publisherDetail);
    publishers.push(publisher);
    await publisher.save();
    console.log(`Added publisher: ${name}`);
}
async function consoleCreate(name, developer_name, description, release_date, discontinued_date) {
    const consoleDetail = {
        name: name,
        developer_name: developer_name,
        description: description,
        release_date: release_date,
    };
    if (discontinued_date) {
        consoleDetail.discontinued_date = discontinued_date;
    }
    const newConsole = new Console(consoleDetail);
    consoles.push(newConsole);
    await newConsole.save();
    console.log(`Added console: ${developer_name} ${name}`);
}
async function gameCreate({ _id, title, release_date, description, copies_in_stock, price, publisher, genres, consoles }) {
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
        publisherCreate('Bandai Namco', new Date('2012-04-02'), 'Bandai Namco Studios Inc. is a Japanese video game developer headquartered in Kōtō, Tokyo. Its offices in Malaysia and Singapore, Bandai Namco Studio Malaysia and Bandai Namco Studios Singapore, are based out of Selangor, Malaysia and Infinite Studios, Singapore respectively. Bandai Namco Studios is a subsidiary of Bandai Namco Entertainment, which itself is a subsidiary of Bandai Namco Holdings.'),
        publisherCreate('FromSoftware', new Date('1986-11-01'), "FromSoftware, Inc. is a Japanese video game development and publishing company. Founded in Tokyo by Naotoshi Zin in November 1986, the company developed business software before releasing their first video game, King's Field, for the PlayStation in 1994. Its success shifted FromSoftware to focus fully on video games, with them producing two more King's Field games before creating the mecha combat series Armored Core (1997), one of their flagship franchises. "),
        publisherCreate('Nintendo', new Date('1889-09-23'), 'Nintendo Co., Ltd. is a Japanese multinational video game company headquartered in Kyoto. It develops, publishes and releases both video games and video game consoles. '),
        publisherCreate('Atlus', new Date('1986-04-07'), 'Atlus Co., Ltd. (株式会社アトラス, Kabushikigaisha Atorasu) is a Japanese video game developer, publisher, arcade manufacturer and distribution company based in Tokyo. A subsidiary of Sega, the company is known for video game series such as Megami Tensei, Persona, Etrian Odyssey, and Trauma Center, as well as Print Club (Purikura) arcade machines. Its corporate mascot is Jack Frost, a snowman-like character from their Shin Megami Tensei series. Outside of video games, the company is known for their Purikura arcade machines, which are selfie photo sticker booths popular in East Asia. '),
        publisherCreate('Square Enix', new Date('2003-04-01'), 'Square Enix Holdings Co., Ltd. is a Japanese multinational holding company, video game production enterprise and entertainment conglomerate. It releases role-playing game franchises, such as Final Fantasy, Dragon Quest, Star Ocean, and Kingdom Hearts, among numerous others. Outside of video game publishing and development, it is also in the business of merchandise, arcade facilities, and manga publication under its Gangan Comics brand. '),
        publisherCreate('Sony Interactive', new Date('1993-11-16'), "Sony Interactive Entertainment (SIE) is a multinational American video game and digital entertainment company owned by the Japanese multinational conglomerate Sony. SIE primarily operates the PlayStation brand of video game consoles and products. SIE is made up of two legal corporate entities: Sony Interactive Entertainment LLC (SIE LLC) based in San Mateo, California, and Sony Interactive Entertainment Inc. (SIE Inc.), based in Minato, Tokyo. SIE Inc. was originally founded as Sony Computer Entertainment Inc. (SCEI or SCE) in November 1993 to handle Sony's venture into video game development for the PlayStation systems.[2] SIE LLC was established in San Mateo in April 2016,[2] and is managed through Sony's American branch, Sony Corporation of America. "),
        publisherCreate('CD Project Red', new Date('1994-05-01'), "CD Projekt S.A. (Polish: [ˌt͡sɛˈdɛ ˈprɔjɛkt]) is a Polish video game developer, publisher and distributor based in Warsaw, founded in May 1994 by Marcin Iwiński and Michał Kiciński. Iwiński and Kiciński were video game retailers before they founded the company, which initially acted as a distributor of foreign video games for the domestic market. The department responsible for developing original games, CD Projekt Red (stylised as CD PROJEKT RED), best known for The Witcher series, was formed in 2002. In 2008, CD Projekt launched the digital distribution service Good Old Games, now known as GOG.com. "),
    ]);
}
async function createGames() {
    console.log("Adding Games");
    await Promise.all([
        gameCreate({ _id: '1', title: 'The Elder Scrolls V: Skyrim', release_date: new Date('2011-11-11'), description: 'Winner of more than 200 Game of the Year Awards, Skyrim Special Edition brings the epic fantasy to life in stunning detail. The Special Edition includes the critically acclaimed game and add-ons with all-new features like remastered art and effects, volumetric god rays, dynamic depth of field, screen-space reflections, and more. Skyrim Special Edition also brings the full power of mods to the PC and consoles. New quests, environments, characters, dialogue, armor, weapons and more – with Mods, there are no limits to what you can experience.', copies_in_stock: 12, price: 14.99, publisher: publishers[0], genres: [genres[21]], consoles: [consoles[0], consoles[3], consoles[4], consoles[10], consoles[11], consoles[12], consoles[13]] }),
        gameCreate({ _id: '2', title: 'Fallout 4', release_date: new Date('2015-11-10'), description: 'Bethesda Game Studios, the award-winning creators of Fallout 3 and The Elder Scrolls V: Skyrim, welcome you to the world of Fallout 4 – their most ambitious game ever, and the next generation of open-world gaming. ', copies_in_stock: 12, price: 39.99, publisher: publishers[0], genres: [genres[5], genres[20]], consoles: [consoles[0], consoles[9], consoles[10], consoles[12], consoles[13]] }),
        gameCreate({ _id: '3', title: 'Tales of Arise', release_date: new Date('2021-09-10'), description: '300 years of tyranny. A mysterious mask. Lost pain and memories. Wield the Blazing Sword and join a mysterious, untouchable girl to fight your oppressors. Experience a tale of liberation, featuring characters with next-gen graphical expressiveness! ', copies_in_stock: 5, price: 59.99, publisher: publishers[1], genres: [genres[21], genres[23]], consoles: [consoles[0], consoles[9], consoles[10], consoles[12], consoles[13]] }),
        gameCreate({ _id: '4', title: 'Elden Ring', release_date: new Date('2022-02-25'), description: 'THE NEW FANTASY ACTION RPG. Rise, Tarnished, and be guided by grace to brandish the power of the Elden Ring and become an Elden Lord in the Lands Between. ', copies_in_stock: 8, price: 59.99, publisher: publishers[2], genres: [genres[21]], consoles: [consoles[0], consoles[9], consoles[10], consoles[12], consoles[13]] }),
        gameCreate({ _id: '5', title: "Demon's Souls Remake", release_date: new Date('2020-11-12'), description: 'From PlayStation Studios and Bluepoint Games comes a remake of the PlayStation classic, Demon’s Souls. Entirely rebuilt from the ground up and masterfully enhanced, this remake introduces the horrors of a fog-laden, dark fantasy land to a whole new generation of gamers. Those who’ve faced its trials and tribulations before, can once again challenge the darkness in stunning visual quality and incredible performance.', copies_in_stock: 8, price: 69.99, publisher: publishers[3], genres: [genres[21]], consoles: [consoles[12]] }),
        gameCreate({ _id: '6', title: 'The Legend Of Zelda: Breath Of The Wild', release_date: new Date('2017-03-03'), description: 'Forget everything you know about The Legend of Zelda games. Step into a world of discovery, exploration, and adventure in The Legend of Zelda: Breath of the Wild, a boundary-breaking new game in the acclaimed series. Travel across vast fields, through forests, and to mountain peaks as you discover what has become of the kingdom of Hyrule in this stunning Open-Air Adventure. Now on Nintendo Switch, your journey is freer and more open than ever. Take your system anywhere, and adventure as Link any way you like.', copies_in_stock: 13, price: 59.99, publisher: publishers[3], genres: [genres[0], genres[10], genres[20]], consoles: [consoles[6], consoles[11]] }),
        gameCreate({ _id: '7', title: 'Super Mario Odyssey', release_date: new Date('2017-10-27'), description: "Explore incredible places far from the Mushroom Kingdom as you join Mario and his new ally Cappy on a massive, globe-trotting 3D adventure. Use amazing new abilities—like the power to capture and control objects, animals, and enemies—to collect Power Moons so you can power up the Odyssey airship and save Princess Peach from Bowser’s wedding plans!", copies_in_stock: 3, price: 59.99, publisher: publishers[3], genres: [genres[0], genres[10]], consoles: [consoles[11]] }),
        gameCreate({ _id: '8', title: 'The Legend Of Zelda: Tears Of The Kingdom', release_date: new Date('2023-05-12'), description: "In this sequel to the Legend of Zelda: Breath of the Wild game, you’ll decide your own path through the sprawling landscapes of Hyrule and the mysterious islands floating in the vast skies above. Can you harness the power of Link’s new abilities to fight back against the malevolent forces that threaten the kingdom?", copies_in_stock: 6, price: 69.99, publisher: publishers[3], genres: [genres[0], genres[10], genres[20]], consoles: [consoles[11]] }),
        gameCreate({ _id: '9', title: 'Metroid Dread', release_date: new Date('2021-10-08'), description: "Upon investigating a mysterious transmission on Planet ZDR, Samus faces a mysterious foe that traps her in this dangerous world. The remote planet has been overrun by vicious alien lifeforms and murderous robots called E.M.M.I. Hunt or be hunted as you make your way through a labyrinth of enemies in Samus’ most intense side-scrolling adventure yet.", copies_in_stock: 36, price: 41.99, publisher: publishers[3], genres: [genres[0], genres[4], genres[10], genres[15], genres[24]], consoles: [consoles[11]] }),
        gameCreate({ _id: '10', title: 'Hyrule Warriors: Age of Calamity', release_date: new Date('2020-11-20'), description: "Join the struggle that brought Hyrule to its knees. Learn more about Zelda, the four Champions, the King of Hyrule and more through dramatic cutscenes as they try to save the kingdom from Calamity. The Hyrule Warriors: Age of Calamity game is the only way to see firsthand what happened 100 years ago.", copies_in_stock: 6, price: 41.99, publisher: publishers[3], genres: [genres[0], genres[1], genres[20]], consoles: [consoles[11]] }),
        gameCreate({ _id: '11', title: 'Pokémon Brilliant Diamond', release_date: new Date('2021-11-19'), description: "Welcome to the Sinnoh region! Rich in nature and with mighty Mount Coronet at its heart, Sinnoh is a land of many myths passed down through the ages. You’ll choose either Turtwig, Chimchar, or Piplup to be your first partner Pokémon and then set off on your journey to try to become the Champion of the Pokémon League. Along the way, you’ll run into the mysterious organization Team Galactic, and be able to encounter the Legendary Pokémon Dialga.", copies_in_stock: 6, price: 59.99, publisher: publishers[3], genres: [genres[20]], consoles: [consoles[11]] }),
        gameCreate({ _id: '12', title: 'Pokémon Shining Pearl', release_date: new Date('2021-11-19'), description: "Welcome to the Sinnoh region! Rich in nature and with mighty Mount Coronet at its heart, Sinnoh is a land of many myths passed down through the ages. You’ll choose either Turtwig, Chimchar, or Piplup to be your first partner Pokémon and then set off on your journey to try to become the Champion of the Pokémon League. Along the way, you’ll run into the mysterious organization Team Galactic, and be able to encounter the Legendary Pokémon Palkia.", copies_in_stock: 21, price: 59.99, publisher: publishers[3], genres: [genres[20]], consoles: [consoles[11]] }),
        gameCreate({ _id: '13', title: 'Pokémon Legends: Arceus', release_date: new Date('2022-01-28'), description: "Get ready for a new kind of grand, Pokémon adventure in Pokémon™ Legends: Arceus, a new game from Game Freak that blends action and exploration with the RPG roots of the Pokémon series.", copies_in_stock: 1, price: 59.99, publisher: publishers[3], genres: [genres[20], genres[10]], consoles: [consoles[11]] }),
        gameCreate({ _id: '14', title: 'Splatoon 3', release_date: new Date('2022-09-09'), description: "Enter 4-on-4* ink-slinging battles in this colorful action shooter packed with style and attitude. As a squid-like Inkling, quickly cover your surroundings (and opponents) in ink with wild weaponry and swim through your own color to sneak and splat. Dive into the fresh fun with family and friends and make waves as a team. Get splatted by an opponent? No sweat! The goal in Turf War is to cover the most ground, so respawn and jump back into the inky action.", copies_in_stock: 6, price: 59.99, publisher: publishers[3], genres: [genres[0], genres[5], genres[33]], consoles: [consoles[11]] }),
        gameCreate({ _id: '15', title: 'Persona 5 Royal', release_date: new Date('2016-09-15'), description: "Prepare for the award-winning RPG experience in this definitive edition of Persona 5 Royal, featuring a treasure trove of downloadable content included! ", copies_in_stock: 8, price: 59.99, publisher: publishers[4], genres: [genres[23], genres[27]], consoles: [consoles[0], consoles[10], consoles[11], consoles[12], consoles[13]] }),
        gameCreate({ _id: '16', title: 'Shin Megami Tensei V', release_date: new Date('2021-11-11'), description: "When a grisly murder scene in modern-day Tokyo blocks our protagonist's walk home, an unplanned detour leaves him buried and unconscious.", copies_in_stock: 3, price: 29.99, publisher: publishers[4], genres: [genres[23], genres[24], genres[15]], consoles: [consoles[11]] }),
        gameCreate({ _id: '17', title: 'Final Fantasy VII', release_date: new Date('2020-04-10'), description: "FINAL FANTASY VII REMAKE is a bold reimagining of the original FINAL FANTASY VII, originally released in 1997, developed under the guidance of the original key developers. This critically-acclaimed game, which mixes traditional command-based combat and real-time action, makes its Steam debut along with FF7R EPISODE INTERmission─a new story arc featuring Yuffie Kisaragi.", copies_in_stock: 9, price: 79.99, publisher: publishers[5], genres: [genres[23], genres[24]], consoles: [consoles[0], consoles[9], consoles[12]] }),
        gameCreate({ _id: '18', title: 'Bravely Default II', release_date: new Date('2021-02-26'), description: ' A new entry in the “Bravely" series! Four new Heroes of Light emerge in a new world and story! ', copies_in_stock: 8, price: 59.99, publisher: publishers[5], genres: [genres[23]], consoles: [consoles[0], consoles[11]] }),
        gameCreate({ _id: '19', title: 'Persona 4 Golden', release_date: new Date('2008-07-10'), description: "Inaba —a quiet town in rural Japan sets the scene for budding adolescence in Persona 4 Golden.\n\nA coming of age story that sets the protagonist and his friends on a journey kickstarted by a chain of serial murders. Explore meeting kindred spirits, feelings of belonging, and even confronting the darker sides of one’s self.", copies_in_stock: 3, price: 19.99, publisher: publishers[4], genres: [genres[23], genres[27]], consoles: [consoles[0], consoles[10], consoles[11], consoles[9], consoles[13]] }),
        gameCreate({ _id: '20', title: 'Persona Q', release_date: new Date('2014-06-05'), description: "Persona Q: Shadow of the Labyrinth is a sugary sweet confection laced with the familiar darkness of the Shin Megami Tensei series, drizzled with the delights of first-person dungeon exploration. It's fanservice at its best; an amalgam of silly character interaction mashed up with hours of grinding and loot collecting, with a cast that play off each other exceptionally well.", copies_in_stock: 5, price: 19.99, publisher: publishers[4], genres: [genres[23], genres[27]], consoles: [consoles[7]] }),
        gameCreate({ _id: '21', title: 'Dragon Quest XI S: Echoes of an Elusive Age', release_date: new Date('2017-07-29'), description: "The Definitive Edition includes the critically acclaimed DRAGON QUEST XI, plus additional scenarios, orchestral soundtrack, 2D mode and more! Whether you are a longtime fan or a new adventurer, this is the ultimate DQXI experience. ", copies_in_stock: 12, price: 39.99, publisher: publishers[5], genres: [genres[23]], consoles: [consoles[0], consoles[7], consoles[9], consoles[10], consoles[11]] }),
        gameCreate({ _id: '22', title: 'Horizon Forbiden West', release_date: new Date('2022-02-18'), description: "Join Aloy as she braves the Forbidden West – a majestic but dangerous frontier that conceals mysterious new threats.", copies_in_stock: 2, price: 69.99, publisher: publishers[6], genres: [genres[21]], consoles: [consoles[9], consoles[12]] }),
        gameCreate({ _id: '23', title: 'God of War Ragnarök', release_date: new Date('2022-11-11'), description: "From Santa Monica Studio comes the sequel to the critically acclaimed God of War (2018). Fimbulwinter is well underway. Kratos and Atreus must journey to each of the Nine Realms in search of answers as Asgardian forces prepare for a prophesied battle that will end the world. Along the way they will explore stunning, mythical landscapes, and face fearsome enemies in the form of Norse gods and monsters. The threat of Ragnarök grows ever closer. Kratos and Atreus must choose between their own safety and the safety of the realms.", copies_in_stock: 5, price: 69.99, publisher: publishers[6], genres: [genres[8]], consoles: [consoles[9], consoles[12]] }),
        gameCreate({ _id: '24', title: 'Doom Eternal', release_date: new Date('2020-03-20'), description: "Hell’s armies have invaded Earth. Become the Slayer in an epic single-player campaign to conquer demons across dimensions and stop the final destruction of humanity. The only thing they fear... is you. ", copies_in_stock: 5, price: 69.99, publisher: publishers[0], genres: [genres[5]], consoles: [consoles[0], consoles[9], consoles[10], consoles[11], consoles[12], consoles[13]] }),
        gameCreate({ _id: '25', title: 'The Witcher 3: Wild Hunt', release_date: new Date('2015-05-19'), description: "You are Geralt of Rivia, mercenary monster slayer. Before you stands a war-torn, monster-infested continent you can explore at will. Your current contract? Tracking down Ciri — the Child of Prophecy, a living weapon that can alter the shape of the world. ", copies_in_stock: 25, price: 49.99, publisher: publishers[7], genres: [genres[21]], consoles: [consoles[0], consoles[9], consoles[10], consoles[11], consoles[12], consoles[13]] }),
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
//# sourceMappingURL=populateDB_prod.js.map