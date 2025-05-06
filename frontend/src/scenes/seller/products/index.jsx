import { useState } from "react";
import { Box, useTheme, Typography } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { mockDataProducts } from "../../data/mockData"
import { themeColors } from "../../../theme";
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import Button from "@mui/material/Button"
import { useNavigate } from 'react-router'

const Products = ({ setSelectedProduct }) => {
	const theme = useTheme();
	const colors = themeColors(theme.palette.mode);
	const [selectedRows, setSelectedRows] = useState([])
	const navigate = useNavigate()

	const columns = [
	  { field: 'id', headerName: 'ID', flex: 'auto' },
	  { field: 'title', headerName: 'Name', flex: 1, editable: true },
	  { field: 'description', headerName: 'Description', flex: 1, editable: true },
	  { field: 'price', headerName: 'Price', flex: "auto", editable: true },
	  {
	    field: 'stock',
	    headerName: 'Stock',
	    type: 'number',
	    flex: "auto",
	    headerAlign: "left",
	    align: "left", 
	    editable: true 
	  },
	  {
	    field: 'category',
	    headerName: 'Category',
	    // description: 'This column has a value getter and is not sortable.',
	    sortable: false,
	    flex: 1,
	  },
	  {
	  	field: '',
	  	headerName: "",
	  	sortable: false,
	  	renderCell: (params) => {
	  		const onClick = (e) => {
	  			e.stopPropagation(); // don't select this row after clicking
	  			setSelectedProduct(params.row)
	  			console.log(params.row)
				navigate('/update-product')
	  		}
	  		return (
	  			<Box display="flex" height="100%" width="100%" justifyContent="center" alignItems="center">
					<Button 
						onClick={onClick} 
						// varian
						// style={{
						// 	padding: "5px 10px",
						// 	cursor: "pointer",
						// 	backgroundColor: "transparent",
						// 	border: 'none',
						// 	display: 'flex',
						// 	justifyContent: 'center',
						// 	alignItems: 'center',
						// 	gap: "2px",
						// }}
					>
						<Typography variant="h6" color={colors.grey[100]}>
							Edit
						</Typography>
						<CreateOutlinedIcon sx={{ color: colors.grey[100]}} />
					</Button>
				</Box>
	  		)
	  	}
	  }
	];



	const handleSelectionChange = (ids) => {
		setSelectedRows(ids)
		console.log(`Selected Rows: ${selectedRows}`)
	}
	return (
		<Box height="80vh" p="10px" color={colors.grey[100]} >
			<Paper elevation={3} sx={{ 
					height: "100%", 
					width: '100%',
					"& .MuiDataGrid-root": {
			            border: "none",
					},
					"& .MuiDataGrid-cell": {
			            borderBottom: "none",
					},
					"& .MuiDataGrid-columnHeaders": {
			            backgroundColor: colors.blueAccent[700],
			            borderBottom: "none",
					},
					"& .MuiDataGrid-virtualScroller": {
			            backgroundColor: colors.primary[400],
					},
					"& .MuiDataGrid-footerContainer": {
			            borderTop: "none",
			            backgroundColor: colors.blueAccent[700],
					},
					"& .MuiCheckbox-root": {
			            color: `${colors.greenAccent[200]} !important`,
					},
					"& .MuiDataGrid-toolbarContainer .MuiButton-text": {
			            color: `${colors.grey[100]} !important`,
					},
				}}>
				<DataGrid
					rows={mockDataProducts}
					columns={columns}
					pagination={true}
					pageSizeOption={[10, 50, 100]}
					columnBufferPx={200}
					slots={{ toolbar: GridToolbar }}
					checkboxSelection
					onRowSelectionModelChange={handleSelectionChange}
					sx={{color: colors.grey[100]}}
				/>
			</Paper>
		</Box>
	);
}

export default Products;
