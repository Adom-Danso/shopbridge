// import '../styles/productcard.css'

const ProductCard = ({name, price, store, cover_photo}) => {
	return (
		<div className="product-card">
			<div className="product-card-cover">
				<img src="https://cdn.mos.cms.futurecdn.net/3kcgKLkfPRbskpsYzW239d.jpg"/>
			</div>
			<div className="product-card-details">
				<div className="product-name"><span>{name}</span></div>
				<div className="product-price"><span>{price}</span></div>
			</div>
		</div>
	)
}

export default ProductCard