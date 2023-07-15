type TEnviroment = 'DEV' | 'PROD';

const enviroment: TEnviroment = 'PROD';

export const SERVER_URI = enviroment as TEnviroment === 'DEV' ? 'http://localhost:5000/' : 'https://gamesplanet-frj1.onrender.com/';
