import Box from "@mui/material/Box";
import { useTheme, Typography } from "@mui/material"
import { themeColors } from "../../../theme"
import Grid from "@mui/material/Grid"
import { useState, useEffect } from "react";
import axios from "axios";
import { data } from "react-router";

const sample = {
	first_name: "Adom",
	last_name: "Danso",
	email: "dansoadom@gmail.com",
	phone: "6726730263",
	address1: "2048 Parkway Blvd",
	address2: "",
	zip_code: "V3E 3N2",
	region: "British Columbia",
}

const Profile = () => {
	const theme = useTheme()
	const colors = themeColors(theme.palette.mode)
	const [currentUser, setCurrentUser] = useState(null)

	const initialisePage = async () => {
        try {
            const resp = await axios.get(`${BASE_URL}/api/auth/is-logged-in`, {withCredentials: true})
			const data = resp.data
            if (resp.status === 200 && data.userType === "buyer") {
                setCurrentUser(data.user)
            }
        } catch (error) {
            console.error(error)
        }
    }
	
	useEffect(() => {
		initialisePage()
	}, [])

	return (
		<Box backgroundColor="blue" height="100%" display="flex" justifyContent="center" alignItems="center">
			<Box backgroundColor="green" height="80%" width="80%">
				<Box display="flex" justifyContent="center" p="10px">
					<Typography variant="h2" fontWeight="bold">My Profile</Typography>
				</Box>
			</Box>
			<Box sx={{ flexGrow: 1}}>
				<Grid
					container
					sx={{
						display: "grid",
						gridTemplateRows: "1fr 1fr 1fr"
					}}
				>
					<Grid size={12}>{currentUser.firstName}</Grid>
					<Grid size={12}>{currentUser.lastName}</Grid>
					<Grid size={12}>{currentUser.email}</Grid>

				</Grid>
			</Box>
		</Box>
	)
}

export default Profile