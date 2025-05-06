import Box from "@mui/material/Box"
import IconButton from '@mui/material/IconButton';
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { useTheme } from "@mui/material"
import { useContext } from "react"

import { themeColors, AppThemeContextProvider } from "../../../theme"

const ThemeButton = () => {
	const { toggleColorMode } = useContext(AppThemeContextProvider)
	const theme = useTheme()
	const colors = themeColors(theme.palette.mode)

	return (
		<Box 
			sx={{
				position: "fixed",
				bottom: 10,
				right: 10,
				backgroundColor: colors.blueAccent[600],
				borderRadius: "50%",
			}}
		>
			<IconButton onClick={toggleColorMode}>
				{
					theme.palette.mode === "dark"
					? <DarkModeOutlinedIcon />
					: <LightModeOutlinedIcon />
				}
			</IconButton>
		</Box>
	)
}

export default ThemeButton