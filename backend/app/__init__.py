from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_session import Session

db = SQLAlchemy()
sess = Session()

def create_app():
	app = Flask(__name__)

	app.config['SECRET_KEY'] = "ksjdfoijiknkjejijowejfijwoiefij2390u989492hfio9rihfwe09hfrin"
	app.config["SQLALCHEMY_DATABASE_URI"] = "mysql+pymysql://root:danso2008%40sql@localhost/shopbridge"
	app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

	app.config["SESSION_TYPE"] = "filesystem"
	app.config["SESSION_COOKIE_SAMESITE"] = "None"
	app.config["SESSION_COOKIE_SECURE"] = True

	CORS(app, supports_credentials=True, resources={r"/*": {"origins": "http://localhost:5173"}})

	db.init_app(app)
	sess.init_app(app)


	from .views import views
	from .auth import auth
	from .dashboard import dashboard

	app.register_blueprint(views, url_prefix="/api/buyer")
	app.register_blueprint(auth, url_prefix="/api/auth")
	app.register_blueprint(dashboard, url_prefix="/api/dashboard")


	# from .models import User

	with app.app_context():
		db.create_all()

	return app