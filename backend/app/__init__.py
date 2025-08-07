from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_session import Session
from redis import Redis
from dotenv import load_dotenv
from datetime import timedelta
import os


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
	app.config["SESSION_PERMANENT"] = False
	app.config["SESSION_USE_SIGNER"] = True


	# CORS(app, supports_credentials=True, resources={r"/*": {"origins": "http://localhost:5173"}})

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


	# from .models import User

	with app.app_context():
		db.create_all()

	return app

