import Box from "@mui/material/Box";
import { useTheme, Typography } from "@mui/material";
import { themeColors } from "../../../theme";
import Grid from "@mui/material/Grid";
import { useState, useEffect, useContext } from "react";
import httpClient from "../../../httpClient";

import { UserContext } from "../../../context";


const Profile = () => {
    const [currentUser, setCurrentUser] = useContext(UserContext);

    const theme = useTheme();
    const colors = themeColors(theme.palette.mode);
    const [currentUserType, setCurrentUsertype] = useState(null);

    const initialisePage = async () => {
        try {
            const resp = await httpClient.get("/auth/is-logged-in");
            const data = resp.data;
            console.log(data.user.firstName);
            if (resp.status === 200 && data.userType === "buyer") {
                setCurrentUsertype(data.userType)
                setCurrentUser(data.user);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        // initialisePage();
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
