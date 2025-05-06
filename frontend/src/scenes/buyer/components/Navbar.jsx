import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar"
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import AccountCircle from '@mui/icons-material/AccountCircle';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import Divider from '@mui/material/Divider';
import Logout from '@mui/icons-material/Logout';
import ListItemIcon from '@mui/material/ListItemIcon';
import { Link } from "react-router"
import { Box, useTheme, Typography } from "@mui/material"
import { styled, alpha } from '@mui/material/styles';
import { useState } from "react"

import { themeColors } from "../../../theme";

const Navbar = () => {
	const theme = useTheme()
	const colors = themeColors(theme.palette.mode)

	const [anchorEl, setAnchorEl] = useState(null);

	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar sx={{ width: "100%", backgroundColor: colors.blueAccent[600] }}>
				<Toolbar sx={{ display: "flex", justifyContent: "space-between"}}>
					<Box display="flex" justifyContent="space-evenly" alignItems="center">
						<IconButton
							size="large"
							edge="start"
							color="inherit"
							aria-label="menu"
							sx={{ mr: 2 }}
						>
							<MenuIcon fontSize="inherit" />
						</IconButton>
						<Typography variant="h3" component="div">
							ShopBridge
						</Typography>
					</Box>
					<Search>
						<SearchIconWrapper>
							<SearchIcon />
						</SearchIconWrapper>
						<StyledInputBase
							placeholder="Search…"
							inputProps={{ 'aria-label': 'search' }}
						/>
					</Search>
					<Box display="flex" justifyContent="space-around">
						<IconButton size="large" color="inherit"><ShoppingCartOutlinedIcon fontSize="inherit" color="inherit" /></IconButton>
						<IconButton size="large" color="inherit"><FavoriteBorderRoundedIcon fontSize="inherit" color="inherit" /></IconButton>
						<div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle fontSize="inherit" />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                sx={{ width: "200px !important"}}
              >
                <MenuItem><Link to="/profile" style={{ textDecoration: "none", color: colors.grey[100]}}><Typography variant="h6">Profile</Typography></Link></MenuItem>
                <MenuItem onClick={handleClose}><Typography variant="h6">Settings</Typography></MenuItem>
                <Divider />
                <MenuItem onClick={handleClose} sx={{ display: "flex", justifyContent: "space-between"}}>
                	<Typography variant="h6">
					          Logout
					        </Typography>
			            <Logout fontSize="small" />
				        </MenuItem>
              </Menu>
            </div>
					</Box>
					{/*<Button color="inherit"><Typography>Register</Typography></Button>*/}
					{/*<Button color="inherit"><Typography>Login</Typography></Button>*/}
				</Toolbar>
			</AppBar>
		</Box>
	)
}




const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(2, 2, 2, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '25ch',
      '&:focus': {
        width: '35ch',
      },
    },
  },
}));



// import { useState } from "react";
// import "../styles/navbar.css";

// const Navbar = () => {
// 	const [sidebarOpen, setSidebarOpen] = useState(false);

// 	// Toggle Sidebar
// 	const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

// 	return (
// 		<header className="navbar-container">
// 			{/* Left Section (Logo) */}
// 			<div className="nav-left-section">
// 				ShopBridge
// 			</div>

// 			{/* Mobile Menu Button */}
// 			<button className="menu-toggle" onClick={toggleSidebar}>
// 				☰
// 			</button>

// 			{/* Right Section (Search + Icons) */}
// 			<nav className={`nav-right-section ${sidebarOpen ? "active" : ""}`}>
// 				{/* Search Bar */}
// 				<div className="nav-search">
// 					<input type="search" name="search" placeholder="Search..." />
// 					<button>Search</button>
// 				</div>

// 				<div className="accordion">
// 					<input type="checkbox" id="section1" />
// 					<label for="section1" className="accordion-header">
// 						Categories
// 						<span className="arrow">&#9662;</span>
// 					</label>
// 					<div className="accordion-content">
// 						<p>Clothing, Shoes & Jewellery</p>
// 						<p>Electronics</p>
// 						<p>Toys & Games</p>
// 						<p>Sports & Outdoors</p>
// 						<p>Health & Beauty</p>
// 					</div>
// 				</div>



// 				{/* User Actions */}
// 				<div className="nav-icons">
// 					<div>
// 						<span>Cart</span>
// 						<svg
// 		                  xmlns="http://www.w3.org/2000/svg"
// 		                  className="h-6 w-6"
// 		                  fill="none"
// 		                  viewBox="0 0 24 24"
// 		                  stroke="currentColor">
// 		                  <path
// 		                    strokeLinecap="round"
// 		                    strokeLinejoin="round"
// 		                    strokeWidth={2}
// 		                    d="M3 3h2l.4 2M7 13h10l4-8H5.4m2.6 8l-1 2m6-2a1 1 0 11-2 0m5 0a1 1 0 11-2 0M1 1l22 22"
// 		                  />
// 		                </svg>
// 					</div>
// 					<div>
// 						<span>WishList</span>
// 						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
// 							<path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
// 						</svg>
// 					</div>
// 					<div>
// 						<span>Profile</span>
// 						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
// 							<path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
// 						</svg>
// 					</div>
// 				</div>
// 			</nav>
// 		</header>
// 	);
// };

export default Navbar;
