import { useState } from "react"
import { Outlet, Route } from "react-router"
import Topbar from "./components/Topbar";
import Sidebar from "./components/Sidebar";
import AddProduct from "./products/Form";
import Orders from "./orders";

const SellerPage = () => {
	const [selectedProduct, setSelectedProduct] = useState(null)

	return (
		<div className="app">
			<Sidebar />
			<main className="content">
				<Topbar />
				<Outlet />
			</main>
		</div>
	)
}

export default SellerPage