import { createContext } from "react";
import { IGame } from "../types/types";
import useFetch from "../hooks/useFetch";
import { SERVER_URI } from "../constats";

interface IGamesContextProviderProps {
	children: React.ReactNode;
}

interface IGamesContext {
	games: Array<IGame> | null;
}

export const GamesContext = createContext<IGamesContext | null>(null);

export const GamesContextProvider = ({children}: IGamesContextProviderProps) => {
	const url = `${SERVER_URI}catalog/games`;
	const {data: games } = useFetch<Array<IGame>>(url);

	return <GamesContext.Provider value={{games}}>{children}</GamesContext.Provider>
}
