import ProductCard from './ProductCard'

import '../styles/productspage.css'

const samples = [
	{name: "Sweeping Brush Lorem lorem lorem Lorem lorem lorem", price: "$28", store: "Apple Store", cover_photo: "https://cdn.mos.cms.futurecdn.net/3kcgKLkfPRbskpsYzW239d.jpg"},
	{name: "Gaming Laptop", price: "$28", store: "Apple Store", cover_photo: "https://cdn.mos.cms.futurecdn.net/3kcgKLkfPRbskpsYzW239d.jpg"},
	{name: "Motorcycle", price: "$28", store: "Apple Store", cover_photo: "https://cdn.mos.cms.futurecdn.net/3kcgKLkfPRbskpsYzW239d.jpg"},
	{name: "Motorcycle", price: "$28", store: "Apple Store", cover_photo: "https://cdn.mos.cms.futurecdn.net/3kcgKLkfPRbskpsYzW239d.jpg"},
	{name: "Motorcycle", price: "$28", store: "Apple Store", cover_photo: "https://cdn.mos.cms.futurecdn.net/3kcgKLkfPRbskpsYzW239d.jpg"},
	{name: "Motorcycle", price: "$28", store: "Apple Store", cover_photo: "https://cdn.mos.cms.futurecdn.net/3kcgKLkfPRbskpsYzW239d.jpg"},
	{name: "Television", price: "$28", store: "Apple Store", cover_photo: "https://cdn.mos.cms.futurecdn.net/3kcgKLkfPRbskpsYzW239d.jpg"}
]

const Products = () => {
	const listProducts = samples.map(sample => <ProductCard name={sample.name} price={sample.price} cover_photo={sample.cover_photo} />)
	return (
		<div className="pp-content">
			{listProducts}
		</div>
	)
}

export default Products