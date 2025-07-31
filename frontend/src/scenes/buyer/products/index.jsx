import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid"
import { useState } from "react";

import { mockDataProducts } from "../../data/mockData";
import ProductCard from "./ProductCard";
import ProductCardPopOver from "./ProductCardPopOver";

import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';


const sample = {
	id: 1,
	name: "Waterproof Rain Boots",
	description: "Stay dry with these stylish waterproof rain boots.",
	price: 69.99,
	stock: 286,
	image_url: "http://dummyimage.com/210x100.png/cc0000/ffffff",
	category: "Clothing - Footwear",
	seller: "Stark-Lockman"
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));


const Products = () => {
	const [selectedProduct, setSelectedProduct] = useState(null);
	const [open, setOpen] = useState(false);

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
