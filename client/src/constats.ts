type TEnviroment = 'DEV' | 'PROD';

const enviroment: TEnviroment = 'DEV';

export const SERVER_URI = enviroment === 'DEV' ? 'http://localhost:5000/' : 'https://gamesplanet-frj1.onrender.com/';
