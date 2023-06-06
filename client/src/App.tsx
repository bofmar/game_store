import { Route, Routes } from "react-router-dom"
import Home from "./components/Home"
import Store from "./components/Store"
import NavBar from "./components/NavBar"
import PageNotFound from "./components/PageNotFound"

function App() {

  return (
    <>
		<NavBar />
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/store' element={<Store />} />
			<Route path='*' element={<PageNotFound />} />
		</Routes>
    </>
  )
}

export default App
