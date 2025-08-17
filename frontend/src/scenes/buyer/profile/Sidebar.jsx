import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import { Link } from "react-router";
import { Typography, useTheme, styled, Box } from "@mui/material";

import { themeColors } from "../../../theme";

const NavLink = ({ path, name, handleChange, index }) => {
    const theme = useTheme();
    const colors = themeColors(theme.palette.mode);

    return (
        <Box sx={{ width: 100, display: "flex", justifyContent: "center", cursor: "pointer"}} onClick={() => handleChange(index)} >
            <Typography variant="h4">{name}</Typography>
        </Box>
    );
};

const Sidebar = ({  handleChange }) => {
    const theme = useTheme();
    const colors = themeColors(theme.palette.mode);
    return (
        <Grid
            size={2}
            alignItems="center"
            sx={{
                paddingTop: 3,
                height: "100%",
                borderStyle: "solid",
                borderWidth: "0 1px 0 0",
                borderColor: colors.grey[100],
                minWidth: "202px",
            }}
        >
            <Stack spacing={2} alignItems="center">
                <Avatar
                    alt="profile photo"
                    src="https://placehold.co/150x150"
                    sx={{ width: 150, height: 150 }}
                />
                <NavLink name="Account" path="/account" handleChange={handleChange} index={0} />
                <NavLink name="Address" path="/address" handleChange={handleChange} index={1} />
                <NavLink name="Secuirity" path="/secuirity" handleChange={handleChange} index={2} />
            </Stack>
        </Grid>
    );
};

export default Sidebar;

