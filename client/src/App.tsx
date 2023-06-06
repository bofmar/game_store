import { Route, Routes } from "react-router-dom"
import Home from "./components/Home"
import Store from "./components/Store"
import NavBar from "./components/NavBar"

function App() {

  return (
    <>
		<NavBar />
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/store' element={<Store />} />
		</Routes>
    </>
  )
}

export default App
