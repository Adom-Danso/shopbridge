import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import Logout from "@mui/icons-material/Logout";
import { Link } from "react-router";
import { Box, useTheme, Typography, Button } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import { useState, useContext } from "react";

import { themeColors } from "../../../theme";
import { UserContext } from "../../../context";

const CategoryLink = (name) => {
  const theme = useTheme();
  const colors = themeColors(theme.palette.mode);

  return <Typography>{name}</Typography>;
};

const Navbar = () => {
  const { currentUser } = useContext(UserContext);
  const theme = useTheme();
  const colors = themeColors(theme.palette.mode);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        sx={{ width: "100%", backgroundColor: colors.blueAccent[600] }}
      >
        <Toolbar
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Box
            display="flex"
            justifyContent="space-evenly"
            alignItems="center"
          >
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
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          {currentUser ? (
            <Box display="flex" justifyContent="space-around">
              <IconButton size="large" color="inherit">
                <ShoppingCartOutlinedIcon
                  fontSize="inherit"
                  color="inherit"
                />
              </IconButton>
              <IconButton size="large" color="inherit">
                <FavoriteBorderRoundedIcon
                  fontSize="inherit"
                  color="inherit"
                />
              </IconButton>
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
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  sx={{ width: "200px !important" }}
                >
                  <MenuItem>
                    <Link
                      to="/profile"
                      style={{
                        textDecoration: "none",
                        color: colors.grey[100],
                      }}
                    >
                      <Typography variant="h6">
                        Profile
                      </Typography>
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <Typography variant="h6">
                      Settings
                    </Typography>
                  </MenuItem>
                  <Divider />
                  <MenuItem
                    onClick={handleClose}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography variant="h6">
                      Logout
                    </Typography>
                    <Logout fontSize="small" />
                  </MenuItem>
                </Menu>
              </div>
            </Box>
          ) : (
            <Box display="flex" justifyContent="space-around">
              <Link to="/register/buyer" style={{ color: "inherit" }}>
                <Button color="inherit">
                  <Typography>Register</Typography>
                </Button>
              </Link>
              <Link to="/login/buyer" style={{ color: "inherit" }}>
                <Button color="inherit">
                  <Typography>Login</Typography>
                </Button>
              </Link>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(2, 2, 2, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "25ch",
      "&:focus": {
        width: "35ch",
      },
    },
  },
}));

export default Navbar;
