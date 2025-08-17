from . import db
from .models import User, Seller
from flask import Blueprint, make_response, request, jsonify, session


auth = Blueprint("auth", __name__)

@auth.route("/is-logged-in", methods=["GET"])
def is_logged_in():
	user_id = session.get("userId")
	user_type = session.get("userType")
	user = None

	if not user_id:
		print("user not logged in", flush=True)
		return jsonify({"user": user})

	if user_type == "buyer":
		user = db.session.query(User).filter_by(id=user_id).first()
	elif  user_type == "seller":
		user = db.session.query(Seller).filter_by(id=user_id).first() 

	return jsonify({"user": user.to_json(), "userType": user_type}), 200

@auth.route("/register/buyer", methods=["POST"])
def register_buyer():
	email = request.json.get("email")
	first_name = request.json.get("firstName")
	last_name = request.json.get("lastName")
	
	new_user = User(email=email.strip(), first_name=first_name.strip(), last_name=last_name.strip())
	new_user.set_password(request.json.get("password"))

	db.session.add(new_user)
	db.session.commit()

	session["userId"] = new_user.id
	session["userType"] = "buyer"

	return jsonify({"msg": "Account succesfully created", "accessToken": access_token}), 201

@auth.route("/login/buyer", methods=["POST"])
def login_buyer():
	email = request.json.get("email")
	
	user = db.session.query(User).filter_by(email=email).first()

	if not user or not user.check_password(request.json.get("password")):
		return jsonify({"msg": "Invalid email or password"}), 401
	
	session["userId"] = user.id
	session["userType"] = "buyer"

	return jsonify({"msg": "Login succesful"}), 200

@auth.route("/register/seller", methods=["POST"])
def register_seller():
	name = request.json.get("name")
	shop_name = request.json.get("shopName")
	email = request.json.get("email")

	new_seller = Seller(name=name, shop_name=shop_name, email=email)
	new_seller.set_password(request.json.get("password"))

	db.session.add(new_seller)
	db.session.commit()

	session["userId"] = new_seller.id
	session["userType"] = "seller"

	return jsonify({"msg": "Account succesfully created"}), 201

@auth.route("/login/seller", methods=["POST"])
def login_seller():
	email = request.json.get("email")
	
	seller = db.session.query(Seller).filter_by(email=email).first()

	if not seller or not seller.check_password(request.json.get("password")):
		return jsonify({"msg": "Invalid email or password"}), 401
	
	session["userId"] = seller.id
	session["userType"] = "seller"

	return jsonify({"msg": "Login successful"}), 201
