from flask import Flask, Blueprint, request, jsonify
from flask_cors import CORS
import pyodbc
from werkzeug.security import generate_password_hash

app = Flask(__name__)
CORS(app)

# Create a Blueprint for the registration routes
registration_bp = Blueprint('registration_bp', __name__)

# Database connection for Windows Authentication
connection_string = 'DRIVER={ODBC Driver 17 for SQL Server};SERVER=UMAIR\\SQLEXPRESS;DATABASE=web;Trusted_Connection=yes;'

# Function to establish a connection to the database 
def get_db_connection():
    try:
        connection = pyodbc.connect(connection_string)
        return connection
    except Exception as e:
        print(f"Error connecting to database: {e}")
        return None

@registration_bp.route('/registration', methods=['POST']) 
def register_employee():
    data = request.get_json()  # Retrieves data from post method

    firstName = data.get('firstName')
    lastName = data.get('lastName')
    email = data.get('email')
    password = data.get('password')

    try:
        connection = get_db_connection()
        if connection:
            cursor = connection.cursor()

            # Hash the password before storing it
            hashed_password = generate_password_hash(password)

            # Execute the SQL query to insert the new employee
            cursor.execute("""
                INSERT INTO employee (FirstName, LastName, email, password)
                VALUES (?, ?, ?, ?)
            """, (firstName, lastName, email, hashed_password))  # Pass the variables using the parameterized query

            # Commit the transaction
            connection.commit()

            return jsonify({'message': 'User registered successfully.'}), 200

    except pyodbc.Error as e:
        error_message = str(e)
        return jsonify({'error': 'Database error: ' + error_message}), 500

    finally:
        if connection:
            connection.close()

