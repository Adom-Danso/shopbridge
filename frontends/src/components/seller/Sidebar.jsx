import '../../styles/seller/sidebar.css'

const Sidebar = () => {
	return (
		<div className="s-sidebar-container">
			<div className="s-sidebar-header">
				<span>Toy Factory</span>
			</div>
			
			<div className="s-sidebar-middle-section">
				<div>
					<span>Dashboard</span>
				</div>
				<div>
					<span>Product Inventory</span>
				</div>
				<div>
					<span>Add New Product</span>
				</div>
				<div>
					<span>Orders</span>
				</div>
				<div>
					<span>Earnings & Sales Reports</span>
				</div>
				<div>
					<span>Feedback</span>
				</div>
			</div>

			<div className="s-sidebar-bottom-section">
				Profile & Settings
			</div>
		</div>
	)
}

export default Sidebar