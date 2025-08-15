from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from dotenv import load_dotenv
from datetime import timedelta
from flask_session import Session
from redis import Redis
import os
from flask_jwt_extended import JWTManager



db = SQLAlchemy()
sess = Session()

load_dotenv()

def create_app():
	app = Flask(__name__)

	# Enviromental variables
	db_user = os.getenv("DB_USER")
	db_passsword = os.getenv("DB_PASSWORD")
	db_name = os.getenv("DB_NAME")

	app.config["SECRET_KEY"] = "ksjdfoijiknkjejijowejfijwoiefij2390u989492hfio9rihfwe09hfrin"
	# app.config["JWT_SECRET_KEY"] = "2380sdjKSDJLJion2380sdjn2fw98hfww203f2n2fw98hfww203f2KSDJLJion2380s03f2n2fw98hfww203f2KSDJLdjn2fw98hfww203f2"
	app.config["SQLALCHEMY_DATABASE_URI"] = f"mysql+pymysql://{db_user}:{db_passsword}@localhost/{db_name}"
	app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

	app.config["SESSION_TYPE"] = "redis"
	app.config["SESSION_REDIS"] = Redis(
		host='redis-18820.c259.us-central1-2.gce.redns.redis-cloud.com',
		port=18820,
		# decode_responses=True,
		username="default",
		password="yJZNy4WR2TLgGWxNKpmNXZ8oNRQvZU8x",
	)
	app.config["SESSION_PERMANENT"] = True
	app.config["SESSION_USE_SIGNER"] = True
	app.config["SESSION_COOKIE_HTTPONLY"] = True
	app.config["SESSION_COOKIE_SAMESITE"] = "none"
	app.config["SESSION_COOKIE_SECURE"] = True
	app.config["PERMANENT_SESSION_LIFETIME"] = timedelta(seconds=30)

	db.init_app(app)
	sess.init_app(app)

	CORS(app, supports_credentials=True, origins= ["http://localhost:5173", "http://127.0.0.1:5173"])

	from .views import views
	from .auth import auth
	from .dashboard import dashboard
	from .admin import admin

	app.register_blueprint(views, url_prefix="/api/buyer")
	app.register_blueprint(auth, url_prefix="/api/auth")
	app.register_blueprint(dashboard, url_prefix="/api/dashboard")
	app.register_blueprint(admin, url_prefix="/api/admin")


	# @jwt.user_identity_loader
	# def user_identity_lookup(user):
	# 	return user.id

	# @jwt.user_lookup_loader
	# def user_lookup_callback(_jwt_header, jwt_data):
	# 	identity = jwt_data["sub"]
	# 	return User.query.filter_by(id=identity).one_or_none()

	from .models import User

	with app.app_context():
		db.create_all()

	return app

