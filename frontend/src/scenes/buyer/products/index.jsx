import { useState, useContext } from "react";
import Grid from "@mui/material/Grid";
import { Box, useTheme, Typography, Paper } from "@mui/material";


import { mockDataProducts } from "../../data/mockData";
import ProductCard from "./ProductCard";
import ProductCardPopOver from "./ProductCardPopOver";
import httpClient from "../../../httpClient";
import { categories } from "../../data/mockData";
import { themeColors } from "../../../theme";

const Products = () => {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [open, setOpen] = useState(false);
	const theme = useTheme();
	const colors = themeColors(theme.palette.mode);

    const getProducts = async () => {
        try {
            const response = await httpClient.get("/dashboard");
        } catch (error) {
            console.error(error);
        }
    };

    const handleOpen = (product) => {
        setSelectedProduct(product);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedProduct(null);
    };

    return (
        <Box sx={{ display: "flex" }} height="100%">
            <Paper
                sx={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    width: "100%",
                    position: "fixed",
                    top: "64px",
                    bgcolor: colors.blueAccent[400],
                    borderRadius: 0,
                    color: "white",
                    padding: "3px 0",
                }}
                elevation={2}
            >
                {categories.map((category, index) => (
                    <Typography
                        key={index}
                        sx={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                        }}
                    >
                        {category.name}
                    </Typography>
                ))}
            </Paper>
            <Grid
                container
                columns={{ xs: 4, sm: 8, md: 10, lg: 12 }}
                spacing={{ xs: 2, md: 3 }}
                sx={{ padding: 2, marginTop: 3 }}
            >
                {mockDataProducts.map((product) => (
                    <ProductCard
                        key={product.id}
                        {...product}
                        onClick={() => handleOpen(product)}
                    />
                ))}
                <ProductCardPopOver
                    open={open}
                    handleClose={handleClose}
                    product={selectedProduct || {}}
                />
            </Grid>
        </Box>
    );
};

export default Products;
