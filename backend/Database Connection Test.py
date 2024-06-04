# This is another way to make the connection to the database - Using the Flask SQLAlchemy API

from flask import Flask
from flask_sqlalchemy import SQLAlchemy


# Create a Flask application instance
app = Flask(__name__)

# Configure SQLAlchemy to use PostgreSQL database - Crendentials for personal database (Change this if using your own database)
# app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:naruto@localhost:5432/fhirbase'

# Configure SQLAlchemy to use PostgreSQL database - Crendentials for remote access to database on Render 
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://ihiteam:0h87JvqdpzmntItJlhz0yvNvT6DSfhlp@dpg-co92pf4f7o1s7391kai0-a.oregon-postgres.render.com:5432/fhirbase'



# Create a SQLAlchemy database instance
db = SQLAlchemy(app)

# Create a route to test the database connection
@app.route('/')
def test_db_connection():
    if db.engine.connect():
        return "Database connection succesful!"
    else:
        return "Error connecting to database"

# Run the Flask application - Starts up Localhost:5000
if __name__ == '__main__':
    app.run(debug=True)
