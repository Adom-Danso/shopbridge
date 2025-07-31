import { createContext, useContext, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { appTheme, AppThemeContextProvider } from './theme';
import SellerPage from "./scenes/seller";
import BuyerPage from "./scenes/buyer";



const UserContext = createContext()

const App = () => {
  const userData = {type: "buyer", id: 2}
  const [theme, toggleColorMode] = appTheme() // get the cached theme and toggleColorMode function
  const [ currentUser, setCurrentUser ] = useState(userData)
  
  return (
    <UserContext.Provider value={currentUser}>
      <AppThemeContextProvider.Provider value={toggleColorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {
            currentUser.type === "seller"
            ? <SellerPage />
            : <BuyerPage />
          }
        </ThemeProvider>
      </AppThemeContextProvider.Provider>
    </UserContext.Provider>
  )
}

export default App