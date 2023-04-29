from flask import Flask 
from flask_sqlalchemy import SQLAlchemy

# Initialize Flask app
app=Flask(__name__)
# Initialize app's DB
db = SQLAlchemy(app)

if __name__ == '__main__':
    app.run()
