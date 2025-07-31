from flask import Blueprint, session, jsonify, request
from sqlalchemy import func

from .models import Category, Order, User, Product
from . import db

dashboard = Blueprint("dashboard", __name__)

@dashboard.route("/get-products", methods=['GET'])
def get_products():
	seller_id = session.get("user_id", False)

	if not seller_id or session.get("user_type") != "seller":
		return jsonify({"msg": "No seller currently logged in"}), 401

	products_query = db.session.execute(db.select(Product).filter_by(seller_id=seller_id)).scalars()

	all_products = [product.to_json() for product in products_query]

	return jsonify({"products": all_products})

@dashboard.route("/add-product", methods=['POST'])
def add_product():
	'''
	Things to add: image url creation, category id,
	'''
	seller_id = session.get("user_id", False)

	if not seller_id:
		return jsonify({"msg": "No seller currently logged in"}), 401
	
	name = request.json.get("name")
	description = request.json.get("description")
	price = request.json.get("price")
	stock = request.json.get("stock")
	category = request.json.get("categoryId")

	# category = db.session.execute(db.select(Category).filter_by(name=category_name)).scalar()
	
	new_product = Product(name=name, description=description, price=price, stock=stock, seller_id=seller_id, category=category)

	db.session.add(new_product)
	db.session.commit()
	return jsonify({"msg": "Product created"}), 201

@dashboard.route("/update-product/<int:product_id>", methods=["PUT"])
def update_product(product_id):
	product = db.get_or_404(Product, product_id)

	product.name = request.json.get("name", None) or product.name
	product.description = request.json.get("description", None) or product.description
	product.price = request.json.get("price", None) or product.price
	product.stock = request.json.get("stock", None) or product.stock
	product.category_id = request.json.get("categoryId", None) or product.category_id

	db.session.commit()

	return jsonify({"msg": "Product updated"})

@dashboard.route("/delete-product/<int:product_id>", methods=["DELETE"])
def delete_product(product_id):
	product = db.get_or_404(Product, product_id)
	db.session.delete(product)
	db.session.commit()
	return jsonify({"msg": "Product deleted"}), 200

@dashboard.route("/overview", methods=["GET"])
def get_dashboard_overview():
	seller_id = session.get("user_id", None)
	total_revenue = db.session.query(func.sum(Order.total_price)).filter(Order.seller == seller_id).scalar() or 0
	total_orders = db.session.query(Order).filter_by(seller_id=seller_id).count()
	total_products = db.session.query(Product).filter_by(seller_id=seller_id).count()

	return jsonify({
		"totalRevenue": total_revenue,
		"totalOrders": total_orders,
		"totalProducts": total_products
	})

@dashboard.route("/get-categories", methods=["GET"])
def get_categories():
	query = db.session.query(Category).all()
	print(query, flush=True)

	category_li = [category.to_json() for category in query]

	return jsonify({"categories": category_li})