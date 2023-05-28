from flask_sqlalchemy import SQLAlchemy
from config import app
from datetime import datetime


"""
New versions of DB interface.
"""
# Initialize app's DB
db = SQLAlchemy(app)

# DB management utilities

def add_as_row_in_corresponding_db(item):
    """
    Adds an item as a row in the table that corresponds to it's type.
    """
    db.session.add(item)
    db.session.commit()


# Table items definitions

class db_item():
    """db_items must implement this"""
    def to_json(self):
        """Return a JSON representation of the item"""
        raise NotImplementedError



# User 
class User(db.Model, db_item):
    """models a user row in the user table."""
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    region = db.Column(db.String(20), nullable=False)
    first_name = db.Column(db.String(25), nullable=False)
    last_name = db.Column(db.String(25), nullable=False)
    telephone = db.Column(db.String(12), nullable=False, unique=True)
    banned_user = db.relationship('Banned_user', backref='user', uselist=False)
    items =db.relationship('Item', backref='user')

    def __repr__(self):
        """Returns a string representation of the object."""
        return f"User: {self.email}"

    def __init__(self, email, region, first_name, last_name, telephone):
        self.email = email.lower()
        self.region = region
        self.first_name = first_name
        self.last_name = last_name
        self.telephone = telephone

    def to_json(self):
        """Return a JSON representation of the item"""
        return {
        "id": self.id,
        "email": self.email,
        "region": self.region,
        "first_name": self.first_name,
        "last_name": self.last_name,
        "telephone": self.telephone
        }



# Regional admin 
class Regional_admin(db.Model, db_item):
    """models a regional admin row in the regional admins table."""
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    region = db.Column(db.String(20), nullable=False)
    first_name = db.Column(db.String(25), nullable=False)
    last_name = db.Column(db.String(25), nullable=False)
    cart = db.relationship('Cart', backref='regional_admin')


    def __repr__(self):
        """Returns a string representation of the object."""
        return f"Regional_admin: {self.email}"

    def __init__(self, email, region, first_name, last_name):
        self.email = email
        self.region = region
        self.first_name = first_name
        self.last_name = last_name

    def to_json(self):
        return {
        "id": self.id,
        "email": self.email,
        "region": self.region,
        "first_name": self.first_name,
        "last_name": self.last_name,
        }



# Banned user 
class Banned_user(db.Model, db_item):
    """models a banned user row in the banned user table."""
    id = db.Column(db.Integer, primary_key=True)
    ban_date = db.Column(db.DateTime, nullable=True)
    banned_user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    ban_reason = db.Column(db.String(255), nullable=False)

    def __repr__(self):
        """Returns a string representation of the object."""
        return f"{self.banned_user_id} was banned because: {self.ban_reason}"

    def __init__(self, banned_user_id, ban_reason):
        self.banned_user_id = banned_user_id
        self.ban_reason = ban_reason

    def to_json(self):
        return {
        "id": self.id,
        "banned_user_id": self.banned_user_id,
        "ban_date": self.ban_date,
        "ban_reason": self.ban_reason
        }



# Cart
class Cart(db.Model, db_item):
    """models a cart row in the cart table."""
    id = db.Column(db.Integer, primary_key=True)
    regional_Admin = db.Column(db.Integer,db.ForeignKey('regional_admin.id'))
    # cart "status: '-1:PendingClientPayment 0:ClientsPayed 1:Ordered';
    status = db.Column(db.Integer, nullable=False, default=-1)
    status_change = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    items = db.relationship('Item', backref='cart')

    def __repr__(self):
        """Returns a string representation of the object."""
        return f"{self.id}"

    def __init__(self, regional_Admin):
        self.regional_Admin = regional_Admin

    def to_json(self):
        return {
        "id": self.id,
        "regional_Admin": self.regional_Admin,
        "status": self.status,
        "status_change": self.status_change
        }



# Item
class Item(db.Model, db_item):
    """models a item row in the item table."""
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer,db.ForeignKey('user.id'))
    cart_id = db.Column(db.Integer,db.ForeignKey('cart.id'), nullable=True)
    # item status: -1:PendingMatch 0:Matched 1:PendingPayment 2:Payed
    status = db.Column(db.Integer, nullable=False, default=-1)
    status_change = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    price = db.Column(db.Float, nullable=False)
    name = db.Column(db.String, nullable=False)
    url = db.Column(db.String, nullable=False)
    picture = db.Column(db.String, nullable=False)


    def __repr__(self):
        """Returns a string representation of the object."""
        return f"{self.id}"

    def __init__(self, user_id, cart_id, price, name, url, picture):
        self.user_id = user_id
        self.cart_id = cart_id
        self.price = price
        self.name = name
        self.url = url
        self.picture = picture
        

    def to_json(self):
        return {
        "id": self.id,
        "user_id": self.user_id,
        "cart_id": self.cart_id,
        "status": self.status,
        "status_change": self.status_change,
        "price": self.price,
        "name": self.name,
        "url": self.url,
        "picture": self.picture
        }





