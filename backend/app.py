from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import datetime


# Initialize Flask app
app = Flask(__name__)
app.config[
    "SQLALCHEMY_DATABASE_URI"
] = "postgresql://postgres:12345678@localhost/amazonus"
app.app_context().push()
# Initialize app's DB
db = SQLAlchemy(app)
# I actually don't know what that is about:
CORS(app)






"""
New versions of DB interface.
"""

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

    def __repr__(self):
        """Returns a string representation of the object."""
        return f"User: {self.email}"

    def __init__(self, email, region, first_name, last_name, telephone):
        self.email = email
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



@app.route("/user", methods=["POST"])
def create_user_handler():
    email = request.json["email"]
    region = request.json["region"]
    first_name = request.json["first_name"]
    last_name = request.json["last_name"]
    telephone = request.json["telephone"]

    user = User(email, region, first_name, last_name, telephone)
    add_as_row_in_corresponding_db(user)

    # Return the event as json (helps with UI)
    return user.to_json()










# Regional admin 
class Regional_admin(db.Model, db_item):
    """models a regional admin row in the regional admins table."""
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    region = db.Column(db.String(20), nullable=False)
    first_name = db.Column(db.String(25), nullable=False)
    last_name = db.Column(db.String(25), nullable=False)

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



@app.route("/regional_admin", methods=["POST"])
def create_regional_admin():
    email = request.json["email"]
    region = request.json["region"]
    first_name = request.json["first_name"]
    last_name = request.json["last_name"]

    regional_admin = Regional_admin(email, region, first_name, last_name)
    add_as_row_in_corresponding_db(regional_admin)

    # Return the event as json (helps with UI)
    return regional_admin.to_json()










# Banned user 
class Banned_user(db.Model, db_item):
    """models a banned user row in the banned user table."""
    id = db.Column(db.Integer, primary_key=True)
    ban_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    banned_user_id = db.relationship('user')
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



@app.route("/banned_user", methods=["POST"])
def ban_user():
    banned_user_id = request.json["banned_user_id"]
    ban_reason = request.json["ban_reason"]

    banned_user = Banned_user(banned_user_id, ban_reason)
    add_as_row_in_corresponding_db(banned_user)

    # Return the event as json (helps with UI)
    return banned_user.to_json()










# Cart
class Cart(db.Model, db_item):
    """models a cart row in the cart table."""
    id = db.Column(db.Integer, primary_key=True)
    regional_Admin = db.relationship('Regional_admin')
    status = db.Column(db.Integer, nullable=False)
    status_change = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    def __repr__(self):
        """Returns a string representation of the object."""
        return f"{self.id}"

    def __init__(self, regional_Admin, status):
        self.regional_Admin = regional_Admin
        self.status = status

    def to_json(self):
        return {
        "id": self.id,
        "regional_Admin": self.regional_Admin,
        "status": self.status,
        "status_change": self.status_change
        }



@app.route("/cart", methods=["POST"])
def add_cart():
    regional_Admin = request.json["regional_Admin"]
    status = request.json["status"]

    cart = Cart(regional_Admin, status)
    add_as_row_in_corresponding_db(cart)

    # Return the event as json (helps with UI)
    return cart.to_json()



# Need to create a 'PATCH' request too for cart's status updates.




















































"""
Old versions of DB interface.
"""


# Set up an event model (a row in the Event table)
class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(100), nullable=False)
    creation_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    def __repr__(self):
        """String representation of the obj"""
        return f"Event: {self.description}"

    def __init__(self, description):
        """C'tor.
        Does not need creation_date as it has a default we want to use.
        """
        self.description = description


def format_event(event):
    """Return:
    The json formatting of the given event.
    """
    return {
        "id": event.id,
        "creation_date": event.creation_date,
        "description": event.description,
    }


@app.route("/")
def index():
    return "Root page reached!"


@app.route("/events", methods=["POST"])
def create_event():
    """Adds new event to DB.

    Returns:
        A json formatted version of the event
    """
    # Create an event
    description = request.json["description"]
    event = Event(description)
    # Add it to the data base were logged into.
    db.session.add(event)
    db.session.commit()
    # Return the event as json (helps with UI)
    return format_event(event)


@app.route("/events", methods=["GET"])
def get_events():
    """Gets an event from DB."""
    events = Event.query.order_by(Event.creation_date.asc()).all()
    event_list = []
    for event in events:
        event_list.append(format_event(event))
    return {"events": event_list}


# The pointy brackets mean this is a query parameter.
@app.route("/event/<id>", methods=["GET"])
def get_event(id):
    """Returns:

    A single event by it's id"""
    event = Event.query.filter_by(id=id).one()
    formatted_event = format_event(event)
    return {"event": formatted_event}


@app.route("/event/<id>", methods=["DELETE"])
def delete_event(id):
    """Deletes an event from the database.
    Returns: A single event by it's id"""
    event = Event.query.filter_by(id=id).one()
    db.session.delete(event)
    db.session.commit()
    return f"Event (id: {id}) was deleted."


@app.route("/event/<id>", methods=["PUT"])
def update_event(id):
    """Edits an event from the database.
    Returns: A single event by it's id"""
    # note we are taking A LIST this time!
    event = Event.query.filter_by(id=id)
    description = request.json["description"]
    event.update(dict(description=description, creation_date=datetime.utcnow()))
    db.session.commit()
    return {"event": format_event(event.one())}











































if __name__ == "__main__":
    app.run(debug=True)
