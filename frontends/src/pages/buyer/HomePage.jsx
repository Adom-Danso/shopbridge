import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'
import Products from '../../components/Products'

import '../../styles/homepage.css';

const HomePage = () => {
	return (
		<div className="main-container">
			<nav><Navbar /></nav>
			<aside><Sidebar /></aside>
			<main className="content"><Products /></main>
			<footer>Footer</footer>
		</div>
	)
}

export default HomePage