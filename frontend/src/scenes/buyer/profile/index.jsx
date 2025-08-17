import Box from "@mui/material/Box";
import { useTheme, Typography } from "@mui/material";
import { themeColors } from "../../../theme";
import Grid from "@mui/material/Grid";
import { useState, useEffect } from "react";
import httpClient from "../../../httpClient";
import { useNavigate } from "react-router";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Sidebar from "./Sidebar";
import Account from "./Account";
import AddressPage from "./AddressPage";
import SecuirityPage from "./SecuirityPage";

const Profile = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [currentUserType, setCurrentUserType] = useState(null);
    const theme = useTheme();
    const colors = themeColors(theme.palette.mode);
    const navigate = useNavigate();

    const [selectedPage, setSelectedPage] = useState(0);

    const handleChange = (value) => {
        setSelectedPage(value);
    };

    const initialisePage = async () => {
        try {
            const resp = await httpClient.get("/auth/is-logged-in");
            const data = await resp.data;
            setCurrentUser(data.user);
            setCurrentUserType(data.userType);
            if (data.user === null) {
                navigate("/login/buyer");
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        initialisePage();
    }, []);

    return currentUserType === "buyer" ? (
        <Box height="100%" display="flex">
            <Grid container height="100%" width="100%">
                <Sidebar handleChange={handleChange} />
                <Grid size={10}>
                    {selectedPage === 0 ? (
                        <Account currentUser={currentUser} />
                    ) : selectedPage === 1 ? (
                        <AddressPage currentUser={currentUser} />
                    ) : selectedPage === 2 ? (
                        <SecuirityPage currentUser={currentUser} />
                    ) : (
                        <Account currentUser={currentUser} />
                    )}
                </Grid>
            </Grid>
        </Box>
    ) : (
        <Typography>No one logged in</Typography>
    );
};

export default Profile;
