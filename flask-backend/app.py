from flask import Flask
from flask_cors import CORS
from registration import registration_bp  # Import the registration Blueprint

app = Flask(__name__)
CORS(app)

# Register the Blueprint from registration.py
app.register_blueprint(registration_bp)

@app.route('/')
def home():
    return "Welcome to the Employee Registration API."

#allows running of the script only if it is run directly and not within another script where this is imported

if __name__ == "__main__":
    app.run(debug=True)
