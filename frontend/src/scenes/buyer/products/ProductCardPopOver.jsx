import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button"
import Modal from "@mui/material/Modal";
import { useTheme } from "@mui/material";

import { themeColors } from "../../../theme";

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

export default ProductCardPopOver;