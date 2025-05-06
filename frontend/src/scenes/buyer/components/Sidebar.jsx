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

//import '../styles/sidebar.css'

// const Sidebar = () => {
// 	return (
// 		<div className="sidebar-container">
// 			<div className="sidebar-header">
// 				<span>Categories</span>
// 			</div>
			
// 			<div className="sidebar-category-section">
// 				<div>
// 					<span>Electronics</span>
// 				</div>
// 				<div>
// 					<span>Clothing, Shoes & Jewellery</span>
// 				</div>
// 				<div>
// 					<span>Toys & Games</span>
// 				</div>
// 				<div>
// 					<span>Sports & Outdoors</span>
// 				</div>
// 				<div>
// 					<span>Computer</span>
// 				</div>
// 				<div>
// 					<span>Health & Beauty</span>
// 				</div>
// 				<div>
// 					<span>Home, Garden & Tools</span>
// 				</div>
// 			</div>

// 			<div className="sidebar-bottom-section">
// 				Bottom
// 			</div>
// 		</div>
// 	)
// }

// export default Sidebar

