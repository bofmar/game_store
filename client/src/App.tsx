import { Route, Routes } from "react-router-dom"
import Home from "./components/Home"
import Store from "./components/Store"

function App() {

  return (
    <>
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/store' element={<Store />} />
		</Routes>
    </>
  )
}

export default App
