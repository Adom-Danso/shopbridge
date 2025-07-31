import { Routes, Route } from "react-router";
import { Box } from "@mui/material"

import Profile from "./profile"
import Navbar from "./components/Navbar";
import Products from "./products";
import ThemeButton from "./components/ThemeButton";

import SignUpBuyer from "../auth/SignUpBuyer";

const BuyerPage = () => {

	return (
		<div className="app">
			<Navbar />
			<Box className="content" sx={{ margin: "84px 0 0 0"}}>
				<Routes>
					<Route path="/" element={<Products />} />
					<Route path="/products" element={<Products />} />
					<Route path="/profile" element={<Profile />} />
					{/*<Route path="/products" element={<Products setSelectedProduct={setSelectedProduct} />} />
					<Route path="/add-product" element={<AddProduct operation="add" selectedProduct={selectedProduct} setSelectedProduct={setSelectedProduct} />} />
					<Route path="/update-product" element={<AddProduct operation="edit" selectedProduct={selectedProduct} setSelectedProduct={setSelectedProduct} />} />
					<Route path="/orders" element={<Orders />} />*/}
					<Route path="/buyer/login" element={<SignUpBuyer />} />
				</Routes>
				<ThemeButton />
			</Box>
		</div>
	)
}


export default BuyerPage