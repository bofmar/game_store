import { Route, Routes } from "react-router-dom"
import Home from "./components/Home"
import Store from "./components/Store"
import NavBar from "./components/NavBar"
import PageNotFound from "./components/PageNotFound"
import GameDetail from "./components/GameDetail"
import ControlPanel from "./components/ControlPanel"

function App() {

  return (
    <>
		<NavBar />
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/store' element={<Store />} />
			<Route path='/store/:gameId' element={<GameDetail />} />
			<Route path='/control-panel' element={<ControlPanel />} />
			<Route path='*' element={<PageNotFound />} />
		</Routes>
    </>
  )
}

export default App
