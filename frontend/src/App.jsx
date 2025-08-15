import { useState, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { appTheme, AppThemeContextProvider } from "./theme";
import { UserContext, UserTypeContext } from "./context";

import SellerPage from "./scenes/seller";
import BuyerPage from "./scenes/buyer";
import httpClient from "./httpClient";

const App = () => {

    const [theme, toggleColorMode] = appTheme(); // get the cached theme and toggleColorMode function
    const [currentUser, setCurrentUser] = useState(null);
    const [currentUserType, setCurrentUsertype] = useState(null);

    const getIsLoggedIn = async () => {
        try {
            const response = await httpClient.get("/auth/is-logged-in");
            const data = await response.data;
            setCurrentUser(data.user);
            setCurrentUsertype(data.userType);
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    };

    const initialiseApp = async () => {
        await getIsLoggedIn();
        console.log("App initialised");
    };

    useEffect(() => {
        initialiseApp();
    }, []);

    return (
        <UserContext.Provider value={{currentUser, setCurrentUser}}>
            <UserTypeContext.Provider value={{currentUser, setCurrentUser}}>
                <AppThemeContextProvider.Provider value={toggleColorMode}>
                    <ThemeProvider theme={theme}>
                        <CssBaseline />
                        {currentUserType === "seller" ? (
                            <SellerPage />
                        ) : (
                            <BuyerPage />
                        )}
                        {/* {currentUserType === "seller" ? (
                                <SellerPage />
                                ) : currentUserType === "buyer" ? (
                                    <BuyerPage />
                                    ) : (
                                        <p>Not logged in yet</p>
                                        )} */}
                    </ThemeProvider>
                </AppThemeContextProvider.Provider>
            </UserTypeContext.Provider>
        </UserContext.Provider>
    );
};

export default App;
