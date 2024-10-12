from flask import Flask
from flask_pymongo import PyMongo
from flask_cors import CORS

mongo = PyMongo()

def create_app():
    app = Flask(__name__)
    app.config['MONGO_URI'] = 'mongodb://localhost:27017/fundraising'
    mongo.init_app(app) 
    CORS(app)
    from .routes import main
    app.register_blueprint(main)

    return app
