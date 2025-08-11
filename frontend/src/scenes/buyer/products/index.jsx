import { useState, useContext } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import axios from "axios";

import { BaseUrlContext } from "../../../context";
import { mockDataProducts } from "../../data/mockData";
import ProductCard from "./ProductCard";
import ProductCardPopOver from "./ProductCardPopOver";


const Products = () => {
	const BASE_URL = useContext(BaseUrlContext)
	
	const [selectedProduct, setSelectedProduct] = useState(null);
	const [open, setOpen] = useState(false);

	const getProducts = async () => {
		try {
			const response = await axios.get(`${BASE_URL}/api/dashboard`)
		} catch (error) {
			console.error(error)
		}
	}

	const handleOpen = (product) => {
		setSelectedProduct(product);
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		setSelectedProduct(null);
	};

	return (
		<Box sx={{ display: "flex" }}  height="100%">
			<Grid container columns={{ xs: 4, sm: 8, md: 10, lg: 12}} spacing={{ xs: 2, md: 3}} sx={{ padding: 2 }}>
				{ mockDataProducts.map((product) => (<ProductCard key={product.id} {...product} onClick={() => handleOpen(product)} />)) }
				<ProductCardPopOver open={open} handleClose={handleClose} product={selectedProduct || {}} />
			</Grid>
		</Box>
	);
};

export default Products;
