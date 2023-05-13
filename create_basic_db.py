from backend.app import db

# Create all tables
db.create_all()
print("Created all DB tables")