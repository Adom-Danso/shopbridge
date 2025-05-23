import { useState } from "react";
import "../styles/navbar.css";

const Navbar = () => {
	const [sidebarOpen, setSidebarOpen] = useState(false);

	// Toggle Sidebar
	const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

	return (
		<header className="navbar-container">
			{/* Left Section (Logo) */}
			<div className="nav-left-section">
				ShopBridge
			</div>

			{/* Mobile Menu Button */}
			<button className="menu-toggle" onClick={toggleSidebar}>
				☰
			</button>

			{/* Right Section (Search + Icons) */}
			<nav className={`nav-right-section ${sidebarOpen ? "active" : ""}`}>
				{/* Search Bar */}
				<div className="nav-search">
					<input type="search" name="search" placeholder="Search..." />
					<button>Search</button>
				</div>

				<div className="accordion">
					<input type="checkbox" id="section1" />
					<label for="section1" className="accordion-header">
						Categories
						<span className="arrow">&#9662;</span>
					</label>
					<div className="accordion-content">
						<p>Clothing, Shoes & Jewellery</p>
						<p>Electronics</p>
						<p>Toys & Games</p>
						<p>Sports & Outdoors</p>
						<p>Health & Beauty</p>
					</div>
				</div>



				{/* User Actions */}
				<div className="nav-icons">
					<div>
						<span>Cart</span>
						<svg
		                  xmlns="http://www.w3.org/2000/svg"
		                  className="h-6 w-6"
		                  fill="none"
		                  viewBox="0 0 24 24"
		                  stroke="currentColor">
		                  <path
		                    strokeLinecap="round"
		                    strokeLinejoin="round"
		                    strokeWidth={2}
		                    d="M3 3h2l.4 2M7 13h10l4-8H5.4m2.6 8l-1 2m6-2a1 1 0 11-2 0m5 0a1 1 0 11-2 0M1 1l22 22"
		                  />
		                </svg>
					</div>
					<div>
						<span>WishList</span>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
							<path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
						</svg>
					</div>
					<div>
						<span>Profile</span>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
							<path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
						</svg>
					</div>
				</div>
			</nav>
		</header>
	);
};

export default Navbar;
