# from root import create_app


# api = create_app()

# if __name__ == "__main__":
#     api.run(debug=True)


from flask import Flask, request, jsonify
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from pymongo import MongoClient
from datetime import timedelta
import re

app = Flask(__name__)

# Setup MongoDB
client = MongoClient('mongodb://localhost:27017')
db = client['sandeep']
users_collection = db['sharma']

# JWT Setup
app.config['JWT_SECRET_KEY'] = 'your_secret_key_here'
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=1)
jwt = JWTManager(app)
bcrypt = Bcrypt(app)

# Utility function to check if the email is valid
def is_valid_email(email):
    return re.match(r"[^@]+@[^@]+\.[^@]+", email)

# Register route
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    full_name = data.get('fullName')
    email = data.get('email')
    password = data.get('password')

    if not full_name or not email or not password:
        return jsonify({"status": False, "cls": "error", "msg": "Missing required fields"}), 400

    if not is_valid_email(email):
        return jsonify({"status": False, "cls": "error", "msg": "Invalid email address"}), 400

    if users_collection.find_one({'email': email}):
        return jsonify({"status": False, "cls": "error", "msg": "User already exists"}), 400

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    users_collection.insert_one({'full_name': full_name, 'email': email, 'password': hashed_password})

    return jsonify({"status": True, "cls": "success", "msg": "User registered successfully"}), 201

# Login route
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"status": False, "cls": "error", "msg": "Missing email or password"}), 400

    user = users_collection.find_one({'email': email})
    if not user or not bcrypt.check_password_hash(user['password'], password):
        return jsonify({"status": False, "cls": "error", "msg": "Invalid credentials"}), 401

    access_token = create_access_token(identity={'email': user['email'], 'full_name': user['full_name']})
    return jsonify({"status": True, "cls": "success", "msg": "Login successful", "payload": access_token}), 200

# Protected route
@app.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify({"logged_in_as": current_user}), 200

# Token and redirection utility
@app.route('/set_token_and_redirect', methods=['POST'])
def set_token_and_redirect():
    data = request.get_json()
    token = data.get('token')

    if not token:
        return jsonify({"status": False, "cls": "error", "msg": "No token provided"}), 400

    return jsonify({"status": True, "cls": "success", "msg": "Redirecting", "token": token}), 200

if __name__ == '__main__':
    app.run(debug=True)
