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

function App() {

  return (
    <>
		<NavBar />
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/store' element={<Store />} />
			<Route path='/store/:gameId' element={<GameDetail />} />
			<Route path='/control-panel' element={<ControlPanel />} />
			<Route path='/control-panel/games' element={<GamePanel/>} />
			<Route path='/control-panel/games/:gameId' element={<GameEdit/>} />
			<Route path='/control-panel/genres' element={<GenrePanel/>} />
			<Route path='/control-panel/publishers' element={<PublisherPanel/>} />
			<Route path='/control-panel/consoles' element={<ConsolesPanel/>} />
			<Route path='*' element={<PageNotFound />} />
		</Routes>
    </>
  )
}

export default App
