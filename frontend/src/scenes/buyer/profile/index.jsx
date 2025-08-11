import Box from "@mui/material/Box";
import { useTheme, Typography } from "@mui/material";
import { themeColors } from "../../../theme";
import Grid from "@mui/material/Grid";
import { useState, useEffect, use } from "react";
import httpClient from "../../../httpClient";

const sample = {
    first_name: "Adom",
    last_name: "Danso",
    email: "dansoadom@gmail.com",
    phone: "6726730263",
    address1: "2048 Parkway Blvd",
    address2: "",
    zip_code: "V3E 3N2",
    region: "British Columbia",
};

const Profile = () => {
    const theme = useTheme();
    const colors = themeColors(theme.palette.mode);
    const [currentUser, setCurrentUser] = useState(null);
    const [currentUserType, setCurrentUsertype] = useState(null);

    const initialisePage = async () => {
        try {
            const resp = await httpClient.get("/auth/is-logged-in", {
                withCredentials: true,
            });
            const data = resp.data;
            console.log(data.user.firstName);
            if (resp.status === 200 && data.userType === "buyer") {
                setCurrentUser(data.user);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        initialisePage();
    }, []);

    return currentUserType === "buyer" ? (
        <Box
            backgroundColor="blue"
            minHeight="100vh"
            display="flex"
            justifyContent="center"
            alignItems="center"
        >
            <Box
                backgroundColor="green"
                height="80%"
                width="80%"
                p={3}
                display="flex"
                flexDirection="column"
                alignItems="center"
            >
                <Typography variant="h2" fontWeight="bold" mb={3}>
                    My Profile
                </Typography>

                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography>{currentUser?.firstName}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography>{currentUser?.lastName}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography>{currentUser?.email}</Typography>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    ) : (
        <Typography>No one logged in</Typography>
    );
};

export default Profile;
