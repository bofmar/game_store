import { Route, Routes } from "react-router-dom"
import Home from "./components/Home"
import Store from "./components/Store"
import NavBar from "./components/NavBar"
import PageNotFound from "./components/PageNotFound"
import GameDetail from "./components/GameDetail"
import ControlPanel from "./components/ControlPanel"
import GamePanel from "./components/GamesPanel"
import GenrePanel from "./components/GenresPanel"
import PublisherPanel from "./components/PublisherPanel"
import ConsolesPanel from "./components/ConsolesPanel"
import GameEdit from "./components/GameEdit"
import GenreDetail from "./components/GenreDetail"
import ConsoleDetail from "./components/ConsoleDetail"
import PublisherDetail from "./components/PublisherDetail"
import Footer from "./components/Footer"
import Checkout from "./components/Checkout"
import CompletePurchse from "./components/CompletePurchase"
import { CartContextProvider } from "./components/CartContext"
import './styles/reset.css'
import './styles/styles.css'

function App() {
	return (
		<>
			<CartContextProvider>
				<NavBar />
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/store' element={<Store />} />
					<Route path='/store/:gameId' element={<GameDetail />} />
					<Route path='/checkout' element={<Checkout />} />
					<Route path='/checkout/complete' element={<CompletePurchse />} />
					<Route path='/control-panel' element={<ControlPanel />}>
						<Route index element={<GamePanel />} />
						<Route path='games' element={<GamePanel/>} />
						<Route path='games/:gameId' element={<GameEdit/>} />
						<Route path='genres' element={<GenrePanel/>} />
						<Route path='genres/:genreId' element={<GenreDetail/>} />
						<Route path='publishers' element={<PublisherPanel/>} />
						<Route path='publishers/:publisherId' element={<PublisherDetail/>} />
						<Route path='consoles' element={<ConsolesPanel/>} />
						<Route path='consoles/:conId' element={<ConsoleDetail/>} />
					</Route>
					<Route path='*' element={<PageNotFound />} />
				</Routes>
				<Footer />
			</CartContextProvider>
		</>
	)
}

export default App
