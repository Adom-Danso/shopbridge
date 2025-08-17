import { Outlet, Route, useNavigate } from "react-router";
import { Box } from "@mui/material"
import { useContext, useEffect } from "react";
import Grid from "@mui/material/Grid";


import httpClient from "../../httpClient";

import Navbar from "./components/Navbar";
import ThemeButton from "./components/ThemeButton";
import { UserContext, UserTypeContext } from "../../context";



const BuyerPage = () => {
	const { currentUser, setCurrentUser } = useContext(UserContext);
	const {currentUserType, setCurrentUserType} = useContext(UserTypeContext);

	const initialisePage = async () => {
        try {
            const response = await httpClient.get("/auth/is-logged-in");
            const data = await response.data;
            setCurrentUser(data.user);
            setCurrentUserType(data.userType);
        } catch (error) {
            console.error(error);
        }
    };

	useEffect(() => {
		initialisePage()
	}, [])

	return (
		<Grid container className="app">
			<Grid size={12}>
				<Navbar />
			</Grid>
			<Grid size={12}>
				<Box className="content" sx={{ padding: "64px 0 0 0"}}>
					<Outlet />
					<ThemeButton />
				</Box>
			</Grid>
		</Grid>
	)
}


export default BuyerPage