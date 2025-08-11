import { createContext, useContext, useState, useEffect } from "react";
import dotenv from "dotenv";
import axios from "axios";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { appTheme, AppThemeContextProvider } from "./theme";
import { UserContext, BaseUrlContext, InitialiaseAppContext } from "./context";

import SellerPage from "./scenes/seller";
import BuyerPage from "./scenes/buyer";
import { data } from "react-router";



const App = () => {
    axios.defaults.withCredentials = true;
    const BASE_URL = import.meta.env.VITE_BASE_URL

    const userData = { type: "buyer", id: 2 };
    const [theme, toggleColorMode] = appTheme(); // get the cached theme and toggleColorMode function
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState(userData);
    const [currentUserType, setCurrentUsertype] = useState(null);

    const getIsLoggedIn = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/auth/is-logged-in`, {withCredentials: true});
            const data = await response.data;
            setIsLoggedIn(data.isLoggedIn);
            console.log(data)
        } catch (error) {
            console.error(error);
        }
    };

    const getCurrentUser = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/auth/get-current-user`, {withCredentials: true});
            const data = await response.data
            // setCurrentUser(data.user)
            // setCurrentUsertype(data.type)
            console.log(data)
        } catch (error) {
            console.error(error);
        }
    };

    const initialiseApp = async () => {
        await getIsLoggedIn();
        await getCurrentUser()
        if (isLoggedIn == true) {
            // getCurrentUser();
            console.log("User fetched")
        }
        console.log("App initialised")
    };

    // useEffect(() => {
    //     initialiseApp();
    // }, []);

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
