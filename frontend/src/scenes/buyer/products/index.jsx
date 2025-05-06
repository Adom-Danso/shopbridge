import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button"
import { useTheme } from "@mui/material";
import { useState } from "react";

import { themeColors } from "../../../theme";

const ProductCard = ({ id, name, price, img, onClick }) => {
	const theme = useTheme();
	const colors = themeColors(theme.palette.mode);

	return (
		<Card sx={{ maxWidth: 200, width: 200, borderRadius: 2, boxShadow: 3, cursor: "pointer" }} onClick={onClick}>
			<CardMedia sx={{ height: 180 }} image={"https://placehold.co/200x180"} />
			<CardContent sx={{ backgroundColor: theme.palette.background.paper }}>
				<Typography
					variant="h6"
					color={colors.grey[900]}
					fontWeight="bold"
					sx={{
						whiteSpace: "nowrap",
						overflow: "hidden",
						textOverflow: "ellipsis",
					}}
				>
					{name}
				</Typography>
				<Typography variant="body1" color={colors.grey[700]}>${price}</Typography>
			</CardContent>
		</Card>
	);
};

const ProductCardPopOver = ({ open, handleClose, product }) => {
	const theme = useTheme();
	const colors = themeColors(theme.palette.mode);

	return (
		<Modal open={open} onClose={handleClose}>
			<Box sx={{
				position: "absolute",
				top: "50%",
				left: "50%",
				transform: "translate(-50%, -50%)",
				width: 900,
				bgcolor: "background.paper",
				boxShadow: 24,
				p: 4,
				borderRadius: 2
			}}>
				<IconButton sx={{ position: "absolute", top: 8, right: 8 }} onClick={handleClose}>
					<CloseIcon />
				</IconButton>
				<Grid container spacing={4}>
					<Grid item size={5}>
						<img 
							src={"https://placehold.co/300x300"} 
							alt={product.name} 
							style={{ width: "100%", borderRadius: 8 }} 
						/>
					</Grid>
					<Grid item size={7}>
						<Typography variant="h4" fontWeight="bold" gutterBottom>{product.name}</Typography>
						<Typography variant="h6">Price: ${product.price}</Typography>
						<Typography variant="body1">Category: {product.category}</Typography>
						<Typography variant="body1">Brand: {product.brand}</Typography>
						<Typography variant="body1">Seller: {product.seller_name}</Typography>
						<Typography variant="body1">Email: {product.seller_email}</Typography>
						<Typography variant="body1">Seller Country: {product.seller_country}</Typography>
						{/*<Typography variant="body1">Seller Location: {product.seller_location}</Typography>*/}
						{/*<Typography variant="body1">Seller Website: <a href={product.seller_website} target="_blank" rel="noopener noreferrer">{product.seller_website}</a></Typography>*/}
						<Typography variant="body1">Shipping Cost: ${product.shipping_cost}</Typography>
						<Typography variant="body1">Shipping Time: {product.shipping_time} days</Typography>
						<Typography variant="body1">Stock: {product.quantity_available}</Typography>
						<Typography variant="body1">Product Rating: {product.rating} ⭐</Typography>
						<Typography variant="body1">Seller Rating: {product.seller_rating}</Typography>
						<Box mt={2}>
							<Typography variant="overline">Description</Typography>
							<Typography variant="body1" 
								color="text.secondary"
								// sx={{
								// 	wordWrap: "break-word",
								// 	overflowWrap: "break-word",
								// 	whiteSpace: "normal",
								// }}
							>
								{product.description}
							</Typography>
						</Box>
					</Grid>
					<Grid size={12}>
						<Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center"}}>
							<Button variant="contained" sx={{ backgroundColor: colors.blueAccent[500], color: colors.grey[900], width: "60%" }} >Add To Cart</Button>
						</Box>
					</Grid>
				</Grid>
			</Box>
		</Modal>
	);
};

const sample = {
	id: 1,
	name: "Personal Blender with Travel Lid",
	category: "Automotive Parts",
	brand: "Adidas",
	seller_name: "Kari Devonport",
	seller_email: "kdevonport0@i2i.jp",
	seller_country: "Peru",
	shipping_cost: 38.44,
	shipping_time: 15,
	rating: 5,
	seller_rating: 1,
	seller_location: "Suite 68",
	seller_website: "https://umich.edu/pellentesque/ultrices/mattis/odio/donec.png?dolor=quam&sit=pede&amet=lobortis&consectetuer=ligula&adipiscing=sit&elit=amet&proin=eleifend&interdum=pede&mauris=libero&non=quis&ligula=orci&pellentesque=nullam&ultrices=molestie&phasellus=nibh&id=in&sapien=lectus&in=pellentesque&sapien=at&iaculis=nulla&congue=suspendisse&vivamus=potenti&metus=cras&arcu=in&adipiscing=purus&molestie=eu&hendrerit=magna&at=vulputate&vulputate=luctus&vitae=cum&nisl=sociis&aenean=natoque&lectus=penatibus&pellentesque=et&eget=magnis&nunc=dis&donec=parturient&quis=montes&orci=nascetur&eget=ridiculus&orci=mus&vehicula=vivamus&condimentum=vestibulum&curabitur=sagittis&in=sapien&libero=cum&ut=sociis&massa=natoque&volutpat=penatibus&convallis=et&morbi=magnis&odio=dis&odio=parturient&elementum=montes&eu=nascetur&interdum=ridiculus&eu=mus&tincidunt=etiam&in=vel&leo=augue&maecenas=vestibulum&pulvinar=rutrum&lobortis=rutrum&est=neque&phasellus=aenean",
	image: "http://dummyimage.com/247x.png/5fa2dd/ffffff",
	price: 968.99,
	quantity_available: 586,
	description: "Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis."
};

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
		<Box sx={{ display: "flex", gap: 2 }}  height="100%" p="64px 0 0 0">
			<ProductCard {...sample} onClick={() => handleOpen(sample)} />
			<ProductCardPopOver open={open} handleClose={handleClose} product={selectedProduct || {}} />
		</Box>
	);
};

export default Products;
