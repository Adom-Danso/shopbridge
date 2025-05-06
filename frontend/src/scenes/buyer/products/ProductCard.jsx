import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useTheme } from "@mui/material";

import { themeColors } from "../../../theme"


const ProductCard = ({ id, name, price, img }) => {
	const theme = useTheme()
	const colors = themeColors(theme.palette.mode)
	return (
		<Card sx={{ maxWidth: 200, width: 200}} >
			<CardMedia 
				sx={{ height: 180 }}
				image="https://placehold.co/200x180" 
			/>
			<CardContent>
				<Typography 
					variant="h5" 
					color={colors.grey[100]} 
					fontWeight="bold"
					sx={{
						whiteSpace: "nowrap",
						width: "100%",
						overflow: "hidden",
						textOverflow: "ellipsis",
					}}
				>
					{name}
				</Typography>
				<Typography variant="h6">
					{price}
				</Typography>
			</CardContent>
		</Card>
	)
}

export default ProductCard
// [electronics, clothing, home decor, toys, sports equipment, books, kitchen appliances, pet supplies, beauty products, office supplies, outdoor gear, jewelry, health and wellness, automotive parts, musical instruments, fitness equipment, gardening tools, party supplies, craft supplies, travel accessories]