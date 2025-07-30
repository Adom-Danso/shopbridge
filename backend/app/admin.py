from . import db
from .models import Category
from flask import Blueprint, request, jsonify, session

admin = Blueprint("admin", __name__)

@admin.route("/add-category", methods=["POST"])
def add_product():
    name = request.json.get("name")
    description = request.json.get("description")

    new_category = Category(name=name, description=description)
    db.session.add(new_category)
    db.session.commit()

    return jsonify({
        "msg": "Category added",
        "name": name
    }), 201
