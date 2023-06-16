from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
app.config[
    "SQLALCHEMY_DATABASE_URI"
] = "postgresql://postgres:12345678@localhost"

# Initialize Flask app

app.app_context().push()
# I actually don't know what that is about:
CORS(app)
