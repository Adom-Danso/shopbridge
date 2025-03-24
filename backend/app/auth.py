from . import db
from .models import User, Seller
from flask import Blueprint, request, jsonify, session

auth = Blueprint("auth", __name__)

@auth.route("get-current-user", methods=["GET"])
def get_current_user():
	user_id = session.get("user_id", None)
	user_type = session.get("user_type", None)
	print(f"user: {user_id}", flush=True)
	if not user_id:
		return jsonify({"msg": "No user logged in", "isLoggedIn": False}), 401

	user = None
	if user_type == "buyer":
		user = db.get_or_404(User, user_id)
	elif user_type == "seller":
		user = db.get_or_404(Seller, user_id)

	return jsonify({"user": user.to_json(), "type": user_type, "isLoggedIn": True}), 200

@auth.route("/buyer/get-valid-users", methods=["GET"])
def get_valid_users_b():
	query = User.query.all()
	users = [user.email for user in query]

	return jsonify({"users": users}), 200

@auth.route("/buyer/register", methods=["POST"])
def register_buyer():
	first_name = request.json.get("firstName")
	last_name = request.json.get("lastName")
	email = request.json.get("email")

	new_user = User(email=email.strip(), first_name=first_name.strip(), last_name=last_name.strip())
	new_user.set_password(request.json.get("password"))

	db.session.add(new_user)
	db.session.commit()

	user = db.session.execute(db.select(User).filter_by(email=email)).scalar()

	session["user_id"] = user.id
	session["user_type"] = "buyer"

	return jsonify({"msg": "Account succesfully created"}), 201

@auth.route("/buyer/login", methods=["POST"])
def login_buyer():
	email = request.json.get("email")
	user = db.session.execute(db.select(User).filter_by(email=email)).scalar()

	if not user or not user.check_password(request.json.get("password")):
		return jsonify({"msg": "Invalid email or password"}), 401

	session["user_id"] = user.id
	session["user_type"] = "buyer"

	return jsonify({"msg": "Successfully logged in"})

# code for seller account

@auth.route("/seller/get-valid-users", methods=["GET"])
def get_valid_users_s():
	query = Seller.query.all()
	users = [user.email for user in query]

	return jsonify({"users": users}), 200

@auth.route('/seller/register', methods=["POST"])
def register_seller():
	if session.get("seller_id", False):
		return jsonify("Seller already logged in")
		
	name = request.json.get("name")
	shop_name = request.json.get("shopName")
	email = request.json.get("email")

	new_seller = Seller(name=name, shop_name=shop_name,email=email)
	new_seller.set_password(request.json.get("password"))
	db.session.add(new_seller)
	db.session.commit()

	seller = db.session.execute(db.select(Seller).filter_by(email=email)).scalar()
	session["user_id"] = seller.id
	session["user_type"] = "seller"

	return jsonify({"msg": "Registration successful"}), 201

@auth.route("/seller/login", methods=["POST"])
def login_seller():
	email = request.json.get("email")
	seller = db.session.execute(db.select(Seller).filter_by(email=email)).scalar()

	if not seller or not seller.check_password(request.json.get("password")):
		return jsonify({"msg": "Incorrect email or password"}), 401

	session["user_id"] = seller.id
	session["user_type"] = "buyer"
	return jsonify({
		"msg": "Login successful",
		"seller": seller.to_json()
	}), 200

# @auth.route('/clear-session')
# def clear_session():
# 	session.pop('user_id', None)
# 	session.pop('seller_id', None)
# 	return "Session cleared!"