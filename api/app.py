# from root import create_app


# api = create_app()

# if __name__ == "__main__":
#     api.run(debug=True)



from flask import Flask, request, jsonify
from flask_bcrypt import Bcrypt
from pymongo import MongoClient
from flask_cors import CORS
import re
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
import datetime

app = Flask(__name__)
bcrypt = Bcrypt(app)
CORS(app)
app.config['SECRET_KEY'] = 'Muskaan@@$%123&!!##'


client = MongoClient('mongodb://localhost:27017')
db = client['sandeep']
users_collection = db['sharma']


def is_valid_email(email):
    return bool(re.match(r"[^@]+@[^@]+\.[^@]+", email))


@app.route('/register', methods=['POST'])
def register():
    try:
        data = request.get_json()

        full_name = data.get('fullName')
        email = data.get('email')
        password = data.get('password')

        if not full_name or not email or not password:
            return jsonify({"status": False, "cls": "error", "msg": "Missing required fields"}), 400

        if not is_valid_email(email):
            return jsonify({"status": False, "cls": "error", "msg": "Invalid email format"}), 400

        
        if users_collection.find_one({"email": email}):
            return jsonify({"status": False, "cls": "error", "msg": "User already exists"}), 400

       
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

       
        users_collection.insert_one({
            "full_name": full_name,
            "email": email,
            "password": hashed_password
        })

        return jsonify({"status": True, "cls": "success", "msg": "User registered successfully"}), 201

    except Exception as e:
        return jsonify({"status": False, "cls": "error", "msg": "An error occurred"}), 500
    
    
    #login
    users = {
    "user@example.com": generate_password_hash("password123")
}

def create_token(email):
    payload = {
        'email': email,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)
    }
    token = jwt.encode(payload, app.config['SECRET_KEY'], algorithm='HS256')
    return token
    
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if email in users and check_password_hash(users[email], password):
        token = create_token(email)
        return jsonify({
            'status': True,
            'msg': 'Login successful',
            'payload': token
        })
    else:
        return jsonify({
            'status': False,
            'msg': 'Invalid email or password'
        })


if __name__ == '__main__':
    app.run(debug=True)
