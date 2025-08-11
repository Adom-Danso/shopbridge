from . import db
from .models import User, Seller
from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, get_jwt, jwt_required, current_user


auth = Blueprint("auth", __name__)

@auth.route("/is-logged-in", methods=["GET"])
@jwt_required(optional=True)
def is_logged_in():
	claims = get_jwt()
	if current_user and claims:
		user = current_user.to_json()
		return jsonify({"user": user, "userType": claims["userType"]}), 200
	else:
		return jsonify({"user": None, "userType": None}), 200

@auth.route("/register/buyer", methods=["POST"])
def register_buyer():
	email = request.json.get("email")
	first_name = request.json.get("firstName")
	last_name = request.json.get("lastName")
	
	new_user = User(email=email.strip(), first_name=first_name.strip(), last_name=last_name.strip())
	new_user.set_password(request.json.get("password"))

	db.session.add(new_user)
	db.session.commit()

	access_token = create_access_token(identity=new_user, additional_claims={"userType":"buyer"})

	return jsonify({"msg": "Account succesfully created", "accessToken": access_token}), 201

@auth.route("/login/buyer", methods=["POST"])
def login_buyer():
	email = request.json.get("email")
	
	user = db.session.query(User).filter_by(email=email).first()

	if not user or not user.check_password(request.json.get("password")):
		return jsonify({"msg": "Invalid email or password"}), 401
	
	access_token = create_access_token(identity=user, additional_claims={"userType":"buyer"})
    
	return jsonify({"msg": "Login succesful", "accessToken": access_token}), 200

@auth.route("/register/seller", methods=["POST"])
def register_seller():
	name = request.json.get("name")
	shop_name = request.json.get("shopName")
	email = request.json.get("email")

	new_seller = Seller(name=name, shop_name=shop_name, email=email)
	new_seller.set_password(request.json.get("password"))

	db.session.add(new_seller)
	db.session.commit()

	access_token = create_access_token(identity=new_seller, additional_claims={"userType": "seller"})

	return jsonify({"msg": "Account succesfully created", "accessToken": access_token}), 201

@auth.route("/login/seller", methods=["POST"])
def login_seller():
	email = request.json.get("email")
	
	seller = db.session.query(Seller).filter_by(email=email).first()

	if not seller or not seller.check_password(request.json.get("password")):
		return jsonify({"msg": "Invalid email or password"}), 401
	
	access_token = create_access_token(identity=seller, additional_claims={"userType": "seller"})

	return jsonify({"msg": "Login successful", "accessToken": access_token}), 201
