import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useTheme } from "@mui/material";

import { themeColors } from "../../../theme"

const ProductCard = ({ id, name, price, img, onClick }) => {
	const theme = useTheme();
	const colors = themeColors(theme.palette.mode);

	return (
		<Grid size={{ xs: 2, sm: 2, xl: 1}}>
			<Card sx={{ maxWidth: "100%", width: "100%", height: 250, cursor: "pointer" }} onClick={onClick}>
				<CardMedia sx={{ height: 180 }} image={"https://placehold.co/200x180"} />
				<CardContent sx={{ backgroundColor: theme.palette.background.paper }}>
					<Typography
						variant="h6"
						color={colors.grey[300]}
						fontWeight="bold"
						sx={{
							whiteSpace: "nowrap",
							overflow: "hidden",
							textOverflow: "ellipsis",
						}}
						>
						{name}
					</Typography>
					<Typography variant="body1" color={colors.grey[200]}>${price}</Typography>
				</CardContent>
			</Card>
		</Grid>
	);
};

export default ProductCard
