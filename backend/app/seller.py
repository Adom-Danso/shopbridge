from . import db
from .models import Product
from flask import Blueprint, request, jsonify, session

seller = Blueprint("seller", __name__)

@seller.route("/add-product", methods=["POST"])
def add_product():
    if session.get("user_id", False) and session.get("user_type") == "seller":
        for product in request.get("products"):
            name = product.name
            description = product.description
            price = product.price
            stock = product.stock
            image_url = product.imageUrl
            category = product.category_id

            # name = request.json.get("name")
            # description = request.json.get("description")
            # price = request.json.get("price")
            # stock = request.json.get("stock")
            # image_url = request.json.get("imageUrl")
            # category = request.json.get("category_id")

            new_product = Product(name=name, description=description, price=price, stock=stock, image_url=image_url, category_id=category, seller_id=session.get("user_id"))
            db.session.add(new_product)
        db.session.commit()

    return jsonify({"msg": "No user logged in"})