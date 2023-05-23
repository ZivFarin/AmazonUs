from backend.app.models import db

# Drop all tables
db.drop_all()

# Create all tables
db.create_all()
print("Created all DB tables")