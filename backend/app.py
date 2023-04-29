from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy


# Initialize Flask app
app=Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///localhost/"
# Initialize app's DB
db = SQLAlchemy(app)

@app.route('/')
def index():
    return "This"

if __name__ == '__main__':
    app.run()
