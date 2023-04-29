from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import datetime


# Initialize Flask app
app=Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://postgres:12345678@localhost/amazonus"
app.app_context().push()
# Initialize app's DB
db = SQLAlchemy(app)
# I actually don't know what that is about:
CORS(app)

# Set up an event model (a row in the Event table)
class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(100), nullable=False)
    creation_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    def __repr__(self):
        """String representation of the obj """
        return F"Event: {self.description}"
    
    def __init__(self, description):
        """C'tor.
        Does not need creation_date as it has a default we want to use.
        """
        self.description = description


def format_event(event):
    """Return:
        The json formatting of the given event.
    """
    return{
        "id": event.id,
        "creation_date": event.creation_date,
        "description": event.description
    }


@app.route('/')
def index():
    return "Root page reached!"


@app.route('/events', methods = ['POST'])
def create_event():
    """ Adds new event to DB.
    
    Returns:
        A json formatted version of the event
    """
    # Create an event
    description = request.json['description']
    event = Event(description)
    # Add it to the data base were logged into.
    db.session.add(event)
    db.session.commit()
    # Return the event as json (helps with UI)
    return format_event(event)
    

@app.route('/events', methods = ['GET'])
def get_events():
    """Gets an event from DB."""
    events = Event.query.order_by(Event.creation_date.asc()).all()
    event_list = []
    for event in events:
        event_list.append(format_event(event))
    return {'events': event_list}


# The pointy brackets mean this is a query parameter.
@app.route('/event/<id>', methods=['GET'])
def get_event(id):
    """Returns:

        A single event by it's id"""
    event = Event.query.filter_by(id=id).one()
    formatted_event = format_event(event)
    return {'event': formatted_event}


@app.route('/event/<id>', methods=['DELETE'])
def delete_event(id):
    """Deletes an event from the database.
    Returns: A single event by it's id"""
    event = Event.query.filter_by(id=id).one()
    db.session.delete(event)
    db.session.commit()
    return f'Event (id: {id}) was deleted.'


@app.route('/event/<id>', methods=['PUT'])
def update_event(id):
    """Edits an event from the database.
    Returns: A single event by it's id"""
    # note we are taking A LIST this time!
    event = Event.query.filter_by(id=id)
    description = request.json['description']
    event.update(dict(description = description, creation_date = datetime.utcnow()))
    db.session.commit()
    return {'event': format_event(event.one())}


if __name__ == '__main__':
    app.run(debug=True)
