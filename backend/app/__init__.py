from flask import Flask
from flask_cors import CORS
from flask_pymongo import PyMongo
from dotenv import load_dotenv
import os

mongo = PyMongo()

def create_app():
    load_dotenv()
    app = Flask(__name__)
    CORS(app)
  
    app.config["MONGO_URI"] = os.getenv("MONGO_URI")
    mongo.init_app(app)

    from .routes import main
    app.register_blueprint(main)

    print(app.url_map)  # Debugging: Show all registered routes
    return app
