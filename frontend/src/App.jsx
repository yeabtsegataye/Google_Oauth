import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import "./App.css";
import {useValidator} from './Hooks/useValidator'

function App() {
	const {valid} = useValidator()
	console.log(valid)
	return (
		<div className="container">
			<Routes>
				<Route
					exact
					path="/"
					element={valid?<Home />:<Login/>}
				/>
				<Route
					exact
					path="/login"
					element={valid ? <Home />:<Login />}
				/>
				<Route
					path="/signup"
					element={valid ? <Home />:<Signup />}
				/>
			</Routes>
		</div>
	);
}

export default App;
