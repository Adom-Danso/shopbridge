import { Box, useTheme } from "@mui/material"
import { themeColors } from "../../../theme";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

import { mockDataOrders } from "../../data/mockData"

const Orders = () => {
	const theme = useTheme();
	const colors = themeColors(theme.palette.mode);

	const columns = [
		{ field: "id", headerName: "ID", flex: "auto"},
		{ field: "product_name", headerName: "Product Name", flext: "auto"},
		{ field: "quantity", headerName: "Quantity", type: "number", headerAlign: "left", align: "left", flex: "auto"},
		{ field: "unit_price", headerName: "Unit Price", type: "number", headerAlign: "left", align: "left", flex: "auto" },
		{ field: "customer_name", headerName: "Customer Name", flex: "auto" },
		{ field: "customer_email", headerName: "Customer Email", flex: "auto" },
		{ field: "shipping_address", headerName: "Shipping Address", flex: "auto" },
		{ field: "order_date", headerName: "Order Date", flex: "auto" },
		{ field: "delivery_date", headerName: "Delivery Date", flex: "auto" },
		{ field: "payment_method", headerName: "Payment Method", flex: "auto" },
		{ field: "status", headerName: "Status", type: "singleSelect", editable: true, flex: "auto", valueOptions: ["Pending", "Shipped", "Delivered", "On Hold"]}, //  active, inactive, pending, completed, cancelled, on hold
		{ field: "tracking_number", headerName: "Tracking Number", type: "number", headerAlign: "left", align: "left", flex: "auto"}
	]

	return (
		<Box height="80vh">
			<DataGrid editMode="row" columns={columns} rows={mockDataOrders} />
		</Box>
	)
}

export default Orders

