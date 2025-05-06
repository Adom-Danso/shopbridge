import { useState } from "react";
import { Sidebar as ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router";
import { themeColors } from "../../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = themeColors(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
      component={<Link to={to} />}
    >
      <Typography color={colors.grey[100]}>{title}</Typography>
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = themeColors(theme.palette.mode);
  const [collapsed, setCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Box
      sx={{
        "height": "100%", 
      }}
    >
      <ProSidebar
        collapsed={collapsed}
        backgroundColor={colors.blueAccent[900]}
        rootStyles={{
          height: "100%",
        }}
      >
        <Box display='flex'justifyContent={collapsed ? "center" : "end"} alignItems="center" m="10px">
          <MenuRoundedIcon onClick={() => setCollapsed(!collapsed)} sx={{height: "30px", width: "30px", cursor: "pointer"}} />
        </Box>

        {!collapsed && (
          <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" gap="10px" p="20px 0">
            <Box height="100px" width="100px" borderRadius="50%" backgroundColor="#fff"></Box>
            <Typography variant="h3">Apple Store</Typography>
          </Box>
        )}

        <Menu
          menuItemStyles={{
            button: ({ active, hover }) => ({
              backgroundColor: active ? colors.blueAccent[600] : undefined,
              "&:hover": {
                backgroundColor: colors.grey[300],
              }              
            }),
          }}
        >

          <Item title="Dashboard" to="/dashboard" selected={selected} setSelected={setSelected} icon={<HomeOutlinedIcon />} />

          {!collapsed && <Typography variant="h5" m="15px 0 0 20px" style={{color: colors.grey[200]}}>Products</Typography>}
          <Item title="My Poducts" to="/products" selected={selected} setSelected={setSelected} icon={<Inventory2OutlinedIcon />} />
          <Item title="Add Product" to="/add-product" selected={selected} setSelected={setSelected} icon={<AddBoxOutlinedIcon />} />

          {!collapsed && <Typography variant="h5" m="15px 0 0 20px" style={{color: colors.grey[200]}} style={{color: colors.grey[200]}}>Orders</Typography>}
          <Item title="My Orders" to="/orders" selected={selected} setSelected={setSelected} icon={<ShoppingCartOutlinedIcon/>} />
          <Item title="Invoices" to="/invoices" selected={selected} setSelected={setSelected} icon={<ReceiptLongOutlinedIcon/>} />

          {!collapsed && <Typography variant="h5" m="15px 0 0 20px" style={{color: colors.grey[200]}}>Data</Typography>}
          <Item title="Bar Chart" to="/bar" selected={selected} setSelected={setSelected} icon={<BarChartOutlinedIcon />} />
          <Item title="Geography" to="/geography" selected={selected} setSelected={setSelected} icon={<PublicOutlinedIcon />} />

          {!collapsed && <Typography variant="h5" m="15px 0 0 20px" style={{color: colors.grey[200]}}>Team</Typography>}
          <Item title="My Team" to="/team" selected={selected} setSelected={setSelected} icon={<GroupsOutlinedIcon />} />
        </Menu>

      </ProSidebar>
    </Box>
  );
};

export default Sidebar;