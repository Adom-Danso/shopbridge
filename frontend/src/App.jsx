import { useState, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Routes, Route } from "react-router";

import { appTheme, AppThemeContextProvider } from "./theme";
import { UserContext, UserTypeContext } from "./context";

import BuyerPage from "./scenes/buyer";
import httpClient from "./httpClient";

import SignUpBuyer from "./scenes/auth/SignUpBuyer";

import LoginBuyer from "./scenes/auth/LoginBuyer";
import Products from "./scenes/buyer/products";
import Profile from "./scenes/buyer/profile";

import SellerPage from "./scenes/seller";
import AddProduct from "./scenes/seller/products/Form";
import Orders from "./scenes/seller/orders";
import Products_S from "./scenes/seller/products";



const App = () => {
    const [theme, toggleColorMode] = appTheme(); // get the cached theme and toggleColorMode function
    const [currentUser, setCurrentUser] = useState(null);
    const [currentUserType, setCurrentUserType] = useState(null);


    const initialiseApp = async () => {
        try {
            const response = await httpClient.get("/auth/is-logged-in");
            const data = await response.data;
            setCurrentUser(data.user);
            setCurrentUserType(data.userType);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        initialiseApp();
    }, []);

    return (
        <UserContext.Provider value={{currentUser, setCurrentUser}}>
            <UserTypeContext.Provider value={{currentUserType, setCurrentUserType}}>
                <AppThemeContextProvider.Provider value={toggleColorMode}>
                    <ThemeProvider theme={theme}>
                        <CssBaseline />
                        <Routes>
                            <Route path="/register/buyer" element={<SignUpBuyer />} />
                            <Route path="/login/buyer" element={<LoginBuyer />} />
                            
                            { currentUserType === "seller" ? (
                                <Route path="/" element={<SellerPage />}>
                                    <Route index element={<Products_S />} />
                                    <Route path="products" element={<Products_S />} />
                                    <Route path="add-product" element={<AddProduct />} />
                                    <Route path="update-product" element={<AddProduct operation="edit" />} />
                                    <Route path="orders" element={<Orders />} />
                                </Route>
                            ) : (
                                <Route path="/" element={<BuyerPage />}>
                                    <Route index element={<Products />} />
                                    <Route path="products" element={<Products />} />
                                    <Route path="profile" element={<Profile />} />
                                </Route>
                            )}
                        </Routes>
                    </ThemeProvider>
                </AppThemeContextProvider.Provider>
            </UserTypeContext.Provider>
        </UserContext.Provider>
    );
};

export default App;
