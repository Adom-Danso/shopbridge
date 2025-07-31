import { useState } from "react"
import { Routes, Route } from "react-router"
import Topbar from "./components/Topbar";
import Sidebar from "./components/Sidebar";
import Products from "./products";
import AddProduct from "./products/Form";
import Orders from "./orders";

const SellerPage = () => {
	const [selectedProduct, setSelectedProduct] = useState(null)

	return (
		<div className="app">
			<Sidebar />
			<main className="content">
				<Topbar />
				<Routes>
					<Route path="/products" element={<Products setSelectedProduct={setSelectedProduct} />} />
					<Route path="/add-product" element={<AddProduct operation="add" selectedProduct={selectedProduct} setSelectedProduct={setSelectedProduct} />} />
					<Route path="/update-product" element={<AddProduct operation="edit" selectedProduct={selectedProduct} setSelectedProduct={setSelectedProduct} />} />
					<Route path="/orders" element={<Orders />} />
				</Routes>
			</main>
		</div>
	)
}

export default SellerPage