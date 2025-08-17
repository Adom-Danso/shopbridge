import { useContext, useEffect, useState } from "react"
import { Outlet, Route } from "react-router"
import Topbar from "./components/Topbar";
import Sidebar from "./components/Sidebar";
import AddProduct from "./products/Form";
import Orders from "./orders";
import { UserContext, UserTypeContext } from "../../context";

const SellerPage = () => {
	const { currentUser, setCurrentUser } = useContext(UserContext);
	const {currentUserType, setCurrentUserType} = useContext(UserTypeContext);

	const [selectedProduct, setSelectedProduct] = useState(null)
	
	const initialisePage = async () => {
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
		initialisePage()
	}, [])

	return (
		<div className="app">
			<Sidebar />
			<main className="content">
				<Topbar />
				<Outlet context={[selectedProduct, setSelectedProduct]} />
			</main>
		</div>
	)
}

export default SellerPage