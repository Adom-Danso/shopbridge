import { Sidebar as ProSidebar, Menu, MenuItem, Submenu } from 'react-pro-sidebar';
import { Box, useTheme, Typography } from "@mui/material";

const Item = (title) => {
	return (
		<MenuItem>
		</MenuItem>
	)
}

const Sidebar = () => {
	return (
		<Box>
			<ProSidebar>
				<Menu>
				</Menu>
			</ProSidebar>
		</Box>
	)
}

export default Sidebar