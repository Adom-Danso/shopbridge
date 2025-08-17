import { useFormik } from "formik"
import { object as YupObject, string, number } from 'yup'
import { Box, Grid, Typography, useTheme, TextField, MenuItem } from "@mui/material"
import Button from "@mui/material/Button"
import { useNavigate, useOutletContext } from "react-router"

import { themeColors } from "../../../theme";

// option to make product visible or not

const AddProduct = ({ operation }) => {
	const [selectedProduct, setSelectedProduct] = useOutletContext()

	const theme = useTheme();
	const colors = themeColors(theme.palette.mode);
	const navigate = useNavigate()

	const categories = [
		{
			value: "fashion",
			label: "Fashion"
		},
		{
			value: "health",
			label: "Health"
		},
		{
			value: "sports",
			label: "Sports"
		},
		{
			value: "home & furniture",
			label: "Home & Furniture"
		},
		{
			value: "electronics",
			label: "Electronics"
		},
		{
			value: "kitchen-accessories",
			label: "Kitchen-accessories"
		},
		{
			value: "beauty",
			label: "Beauty"
		},
	]

	const handleSubmit = (values) => {
		console.log("submitted")
		console.log(values)
		setSelectedProduct(null)
		navigate('/products')
	}

	const formik = useFormik({
		initialValues: {
			name: selectedProduct ? selectedProduct.title : '',
			description: selectedProduct ? selectedProduct.description : '',
			price: selectedProduct ? selectedProduct.price : '',
			stock: selectedProduct ? selectedProduct.stock : '',
			category: selectedProduct ? selectedProduct.category : '',
		},
		validationSchema: YupObject({
			name: string().required("Required"),
			description: string().required("Required"),
			price: number().positive().required("Required"),
			stock: number().positive().required("Required"),
			category: string().required("Required"),
		}),
		onSubmit: (values) => handleSubmit(values)
	})

	return (
		<Box display="flex" p="10px" component="form" onSubmit={formik.handleSubmit} gap="10px">
			<Grid container spacing={1}>
				<Grid size={6}>
					<TextField
						fullWidth
						variant="filled"
						label="Name"
						name="name"
						type="text"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.name}
						error={!!formik.touched.name && !!formik.errors.name}
						helperText={formik.touched.name && formik.errors.name}
						// InputLabelProps={{
						// 	shrink: true,
						// 	style: {}
						// }}
						sx={{ 
							"& .MuiFormLabel-root": {
								color: colors.grey[100],
							},
							"& .MuiInputBase-root": {
								padding: "10px 0px",
							}
						}}
					/>
				</Grid>

				<Grid size={3}>
					<TextField
						fullWidth
						variant="filled"
						label="Price"
						name="price"
						type="number"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.price}
						error={!!formik.touched.price && !!formik.errors.price}
						helperText={formik.touched.price && formik.errors.price}
						sx={{ 
							"& .MuiFormLabel-root": {
								color: colors.grey[100],
							},
							"& .MuiInputBase-root": {
								padding: "10px 0px",
							}
						}}
					/>
				</Grid>

				<Grid size={3}>
					<TextField
						fullWidth
						variant="filled"
						label="Stock"
						name="stock"
						type="number"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.stock}
						error={!!formik.touched.stock && !!formik.errors.stock}
						helperText={formik.touched.stock && formik.errors.stock}
						sx={{ 
							"& .MuiFormLabel-root": {
								color: colors.grey[100],
							},
							"& .MuiInputBase-root": {
								padding: "10px 0px",
							}
						}}
					/>
				</Grid>

				<Grid size={6}>
					<TextField
						fullWidth
						select
						variant="filled"
						label="Category"
						name="category"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.category}
						error={!!formik.touched.category && !!formik.errors.category}
						helperText={formik.touched.category && formik.errors.category}
						sx={{ 
							"& .MuiFormLabel-root": {
								color: colors.grey[100],
							},
						}}
					>
						{categories.map((item) => (
							<MenuItem key={item.value} value={item.value}>
								{ item.label }
							</MenuItem>
						))}
					</TextField>
				</Grid>

				<Grid size={12}>
					<TextField
						fullWidth
						multiline
						rows={5}
						variant="filled"
						label="Description"
						name="description"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.description}
						error={!!formik.touched.description && !!formik.errors.description}
						helperText={formik.touched.description && formik.errors.description}
						sx={{ 
							"& .MuiFormLabel-root": {
								color: colors.grey[100],
							},
							"& .MuiInputBase-root": {
								padding: "20px 13px",
							}
						}}
					/>
				</Grid>
				<Grid size={12} display="flex" justifyContent="end" alignItems="center">
					<Button 
						variant="contained" 
						type="submit" 
						sx={{ 
							backgroundColor: colors.blueAccent[600], 
							color: colors.grey[100]
						}}
					>
						{ operation === "add" 
							? "Add"
							: operation === "edit" && "Update"
						}
					</Button>
				</Grid>
			</Grid>
		</Box>
	)
}


export default AddProduct