from flask import Blueprint, request, jsonify
from bson.objectid import ObjectId
from . import mongo

main = Blueprint('main', __name__)

cars_collection = mongo.db.cars  # Collection MongoDB pour stocker les voitures

# Route pour ajouter une voiture
@main.route('/api/cars', methods=['POST'])
def add_car():
    data = request.json
    required_fields = ["firstName", "lastName", "phone", "email", "carModel", "manufactureYear", "licensePlateNumber", "deviceUUID"]

    if not all(field in data for field in required_fields):
        return jsonify({"error": "Missing required fields"}), 400

    car_id = cars_collection.insert_one(data).inserted_id
    return jsonify({"message": "Car added", "car_id": str(car_id)}), 201

# Route pour récupérer toutes les voitures
@main.route('/api/cars', methods=['GET'])
def get_cars():
    cars = list(cars_collection.find({}, {"_id": 1, "firstName": 1, "lastName": 1, "phone": 1, "email": 1, "carModel": 1, "manufactureYear": 1, "licensePlateNumber": 1, "deviceUUID": 1}))
    for car in cars:
        car["_id"] = str(car["_id"])  # Convertir ObjectId en string
    return jsonify(cars)

# Route pour récupérer une voiture par ID
@main.route('/api/cars/<car_id>', methods=['GET'])
def get_car(car_id):
    try:
        car = cars_collection.find_one({"_id": ObjectId(car_id)})
        if not car:
            return jsonify({"error": "Car not found"}), 404
        car["_id"] = str(car["_id"])
        return jsonify(car)
    except:
        return jsonify({"error": "Invalid ID format"}), 400

# Route pour modifier une voiture
@main.route('/api/cars/<car_id>', methods=['PUT'])
def update_car(car_id):
    try:
        data = request.json
        updated_car = cars_collection.find_one_and_update(
            {"_id": ObjectId(car_id)},
            {"$set": data},
            return_document=True
        )
        if not updated_car:
            return jsonify({"error": "Car not found"}), 404
        updated_car["_id"] = str(updated_car["_id"])
        return jsonify({"message": "Car updated", "car": updated_car})
    except:
        return jsonify({"error": "Invalid ID format"}), 400

# Route pour supprimer une voiture
@main.route('/api/cars/<car_id>', methods=['DELETE'])
def delete_car(car_id):
    try:
        result = cars_collection.delete_one({"_id": ObjectId(car_id)})
        if result.deleted_count == 0:
            return jsonify({"error": "Car not found"}), 404
        return jsonify({"message": "Car deleted"})
    except:
        return jsonify({"error": "Invalid ID format"}), 400

# Route de test
@main.route('/')
def home():
    return "🚗 SmartFleetManager API is running!"
