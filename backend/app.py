from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime


# Initialize Flask app
app=Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://postgres:password@localhost/amazonus"
# Initialize app's DB
db = SQLAlchemy(app)

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

@app.route('/')
def index():
    return "This"

if __name__ == '__main__':
    app.run()
