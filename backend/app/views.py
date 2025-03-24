from flask import Blueprint

views = Blueprint("views", __name__)

@views.route("/", methods=['GET'])
def home():
	return "<h1>App is running</h1>"

