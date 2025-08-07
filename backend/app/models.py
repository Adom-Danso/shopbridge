import bcrypt
from uuid import uuid4
from datetime import datetime
from . import db


def get_uuid():
	return uuid4().hex

class User(db.Model):
	__tablename__ = "user"
	id = db.Column(db.String(32), primary_key=True, unique=True, default=get_uuid)
	first_name = db.Column(db.String(120), nullable=False)
	last_name = db.Column(db.String(120), nullable=False)
	email = db.Column(db.String(50), unique=True, nullable=False)
	password = db.Column(db.LargeBinary, nullable=False)
	timestamp = db.Column(db.DateTime, server_default=db.func.now(), nullable=False)
	role = db.Column(db.String(50), nullable=False, default='normal')
	phone = db.Column(db.String(120), nullable=True)
	address = db.Column(db.String(120), nullable=True)
	address2 = db.Column(db.String(120), nullable=True)
	city = db.Column(db.String(120), nullable=True)
	zip_code = db.Column(db.String(120), nullable=True)
	country = db.Column(db.String(120), nullable=True)

	cart_items = db.relationship("Cart", backref="user", lazy=True, cascade="all, delete")
	wishlist = db.relationship("LikedItem", backref="user", lazy=True, cascade="all, delete")
	orders = db.relationship("Order", backref="buyer", lazy=True, cascade="all, delete")

	def set_password(self, password):
		self.password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

	def check_password(self, password):
		return bcrypt.checkpw(password.encode('utf-8'), self.password)

	def to_json(self):
		return {
			"firstName": self.first_name,
			"lastName": self.last_name,
			"email": self.email,
			"role": self.role,
			"phone": self.phone,
			"address": self.address,
			"city": self.city,
			"zipCode": self.zip_code,
			"country": self.country
		}

class Seller(db.Model):
	__tablename__ = "seller"
	id = db.Column(db.String(32), primary_key=True, unique=True, default=get_uuid)
	name = db.Column(db.String(255), nullable=False)
	email = db.Column(db.String(255), unique=True, nullable=False)
	phone = db.Column(db.String(20), unique=True, nullable=True)
	password = db.Column(db.LargeBinary, nullable=False)
	shop_name = db.Column(db.String(255), nullable=False)
	shop_address = db.Column(db.String(255), nullable=True)
	city = db.Column(db.String(100), nullable=True)
	country = db.Column(db.String(100), nullable=True)
	zip_code = db.Column(db.String(20), nullable=True)
	timestamp = db.Column(db.DateTime, server_default=db.func.now())
	updated_at = db.Column(db.DateTime, server_default=db.func.now(), onupdate=db.func.now())
	is_active = db.Column(db.Boolean, default=True)

	products = db.relationship("Product", backref="seller", lazy=True, cascade="all, delete")

	def set_password(self, password):
		self.password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

	def check_password(self, password):
		return bcrypt.checkpw(password.encode('utf-8'), self.password)

	def to_json(self):
		return {
			"name": self.name,
			"email": self.email,
			"phone": self.phone,
			"shop_name": self.shop_name,
			"shop_address": self.shop_address,
			"city": self.city,
			"country": self.country,
			"zip_code": self.zip_code,
			"timestamp": self.timestamp.isoformat(),
			"updated_at": self.updated_at.isoformat(),
			"is_active": self.is_active
		}

class Product(db.Model):
	__tablename__ = "product"
	id = db.Column(db.Integer, primary_key=True)
	name = db.Column(db.String(255), nullable=False)
	description = db.Column(db.Text, nullable=False)
	price = db.Column(db.Float, nullable=False)
	stock = db.Column(db.Integer, nullable=False, default=0)
	image_url = db.Column(db.String(500), nullable=True)
	timestamp = db.Column(db.DateTime, server_default=db.func.now())
	updated_at = db.Column(db.DateTime, server_default=db.func.now(), onupdate=db.func.now())

	seller_id = db.Column(db.String(32), db.ForeignKey('seller.id', ondelete="CASCADE"), nullable=False)
	category_id = db.Column(db.Integer, db.ForeignKey("category.id", ondelete="CASCADE"), nullable=False)

	def to_json(self):
		return {
			"id": self.id,
			"name": self.name,
			"description": self.description,
			"price": self.price,
			"stock": self.stock,
			"imageUrl": self.image_url,
			"timestamp": self.timestamp.isoformat(),
			"updatedAt": self.updated_at.isoformat(),
			"sellerId": self.seller_id,
			"categoryId": self.category_id
		}

class Order(db.Model):
	id = db.Column(db.Integer, primary_key=True, nullable=False)
	seller_id = db.Column(db.String(32), db.ForeignKey("seller.id", ondelete="CASCADE"), nullable=False)
	buyer_id = db.Column(db.String(32), db.ForeignKey("user.id", ondelete="CASCADE"), nullable=False)
	total_price = db.Column(db.Float, nullable=False)
	payment_status = db.Column(db.String(50), nullable=False)
	payment_method = db.Column(db.String(50), nullable=False)
	order_status = db.Column(db.String(50), nullable=False, server_default="pending")
	shipping_address = db.Column(db.Text, nullable=False)
	shipping_status = db.Column(db.String(50), nullable=False, server_default="not_shipped")
	timestamp = db.Column(db.DateTime, server_default=db.func.now(), nullable=False)
	updated_at = db.Column(db.DateTime, server_default=db.func.now(), onupdate=db.func.now(), nullable=False)

	order_items = db.relationship("OrderItems", backref="order", lazy=True, cascade="all, delete")

class OrderItems(db.Model):
	id = db.Column(db.Integer, primary_key=True, nullable=False)
	order_id = db.Column(db.Integer, db.ForeignKey("order.id", ondelete="CASCADE"), nullable=False)
	product_id = db.Column(db.Integer, db.ForeignKey("product.id", ondelete="CASCADE"), nullable=False)
	quantity = db.Column(db.Integer, nullable=False)
	unit_price = db.Column(db.Float, nullable=False)
	subtotal_price = db.Column(db.Float, nullable=False)
	timestamp = db.Column(db.DateTime, server_default=db.func.now(), nullable=False)

class Cart(db.Model):
	__tablename__ = "cart"
	id = db.Column(db.Integer, primary_key=True)
	user_id = db.Column(db.String(32), db.ForeignKey('user.id', ondelete="CASCADE"), nullable=False)
	product_id = db.Column(db.Integer, db.ForeignKey("product.id", ondelete="CASCADE"), nullable=False)
	quantity = db.Column(db.Integer, nullable=False)
	timestamp = db.Column(db.DateTime, server_default=db.func.now(), nullable=False)

class LikedItem(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	user_id = db.Column(db.String(32), db.ForeignKey("user.id", ondelete="CASCADE"), nullable=False)
	product_id = db.Column(db.Integer, db.ForeignKey("product.id", ondelete="CASCADE"), nullable=False)
	timestamp = db.Column(db.DateTime, server_default=db.func.now(), nullable=False)

class Category(db.Model):
	__tablename__ = "category"
	id = db.Column(db.Integer, primary_key=True, unique=True)
	name = db.Column(db.String(120), unique=True, nullable=False)
	description = db.Column(db.String(255), nullable=True)

	products = db.relationship("Product", backref="category", lazy=True, cascade="all, delete")

	def to_json(self):
		return {
			"name": self.name,
			"description": self.description
		}
