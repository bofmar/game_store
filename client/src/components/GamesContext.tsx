import { createContext } from "react";
import { IGame } from "../types/types";
import useFetch from "../hooks/useFetch";
import { SERVER_URI } from "../constats";

interface IGamesContextProviderProps {
	children: React.ReactNode;
}

interface IGamesContext {
	allGames: Array<IGame> | null;
}

export const GamesContext = createContext<IGamesContext | null>(null);

export const GamesContextProvider = ({children}: IGamesContextProviderProps) => {
	const url = `${SERVER_URI}catalog/games`;
	const {data: allGames } = useFetch<Array<IGame>>(url);

	return <GamesContext.Provider value={{allGames}}>{children}</GamesContext.Provider>
}
