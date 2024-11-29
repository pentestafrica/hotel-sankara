from flask import Flask, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from datetime import timedelta
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

# Configuration
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'your-secret-key')
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'sqlite:///hotel.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'jwt-secret-key')
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=1)
app.config['JWT_IDENTITY_CLAIM'] = 'sub'

# Initialize extensions
db = SQLAlchemy(app)
jwt = JWTManager(app)

# JWT configuration
@jwt.user_identity_loader
def user_identity_lookup(user):
    return str(user)

@jwt.user_lookup_loader
def user_lookup_callback(_jwt_header, jwt_data):
    identity = jwt_data["sub"]
    return identity

# Route racine
@app.route('/')
def home():
    return jsonify({
        "message": "Bienvenue sur l'API Hotel Sankara",
        "version": "1.0",
        "endpoints": {
            "auth": {
                "login": "/api/auth/login",
                "register": "/api/auth/register"
            },
            "resources": {
                "rooms": "/api/rooms",
                "employees": "/api/employees",
                "tasks": "/api/tasks",
                "schedules": "/api/schedules"
            }
        }
    })

# Import routes after db initialization to avoid circular imports
from routes import *
from auth import *

# Create database tables
with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True, port=8080)
