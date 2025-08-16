import { Outlet, Route } from "react-router";
import { Box } from "@mui/material"


import Profile from "./profile"
import Navbar from "./components/Navbar";
import Products from "./products";
import ThemeButton from "./components/ThemeButton";

import SignUpBuyer from "../auth/SignUpBuyer";
import LoginBuyer from "../auth/LoginBuyer";


const BuyerPage = () => {

	return (
		<div className="app">
			<Navbar />
			<Box className="content" sx={{ margin: "84px 0 0 0"}}>
				<Outlet />
				<ThemeButton />
			</Box>
		</div>
	)
}


export default BuyerPage