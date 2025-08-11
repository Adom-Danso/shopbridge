import { useState, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { appTheme, AppThemeContextProvider } from "./theme";
import { UserContext, BaseUrlContext, InitialiaseAppContext } from "./context";

import SellerPage from "./scenes/seller";
import BuyerPage from "./scenes/buyer";
import httpClient from "./httpClient";


const App = () => {
    const BASE_URL = import.meta.env.VITE_BASE_URL

    const userData = { type: "buyer", id: 2 };
    const [theme, toggleColorMode] = appTheme(); // get the cached theme and toggleColorMode function
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState(userData);
    const [currentUserType, setCurrentUsertype] = useState(null);

    const getIsLoggedIn = async () => {
        try {
            const response = await httpClient.get("/auth/is-logged-in", {withCredentials: true});
            const data = await response.data;
            setCurrentUser(data.user);
            setCurrentUsertype(data.userType);
            console.log(data)
        } catch (error) {
            console.error(error);
        }
    };


    const initialiseApp = async () => {
        await getIsLoggedIn();
        console.log("App initialised")
    };

    useEffect(() => {
        initialiseApp();
    }, []);

    return (
        <InitialiaseAppContext.Provider value={initialiseApp}>
            <BaseUrlContext.Provider value={BASE_URL}>
                <UserContext.Provider value={currentUser}>
                    <AppThemeContextProvider.Provider value={toggleColorMode}>
                        <ThemeProvider theme={theme}>
                            <CssBaseline />
                            {currentUserType === "seller" ? (
                                <SellerPage />
                            ) : (
                                <BuyerPage />
                            )}
                        </ThemeProvider>
                    </AppThemeContextProvider.Provider>
                </UserContext.Provider>
            </BaseUrlContext.Provider>
        </InitialiaseAppContext.Provider>
    );
};

export default App;
