from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename
import os
import random
from . import mongo

main = Blueprint('main', __name__)

# MongoDB collection for cars (make sure mongo is properly initialized in your app)
cars_collection = mongo.db.cars

# Simulate an AI-based function to extract data from an image
def process_image_for_data(image_file):
    # AI image processing logic (for now, we'll return random data)
    return {
        "speed": random.randint(100, 220),  # Random speed in km/h
        "fuel_consumption": round(random.uniform(5.0, 15.0), 2),  # Random fuel consumption in L/100km
        "emissions": round(random.uniform(50.0, 200.0), 2),  # Random emissions in g CO2/km
        "distance": random.randint(5000, 20000),  # Random distance in km
        "next_maintenance": random.randint(1000, 5000)  # Random maintenance distance in km
    }

# Route to add or update a car (with image upload)
@main.route('/', methods=['GET'])
def index():
    return jsonify({"message": "hello"})
@main.route('/api/cars', methods=['POST'])
def add_or_update_car():
    if 'image' not in request.files:
        return jsonify({"error": "No image file part"}), 400

    image = request.files['image']
    if image.filename == '':
        return jsonify({"error": "No selected image"}), 400

    if image:
        # Save the image temporarily
        filename = secure_filename(image.filename)
        image_path = os.path.join("temp", filename)
        
        # Ensure the temp directory exists
        if not os.path.exists("temp"):
            os.makedirs("temp")
        
        image.save(image_path)

        # Process the image with AI to extract data
        extracted_data = process_image_for_data(image_path)

        # Get the rest of the form data
        first_name = request.form.get('firstName')
        last_name = request.form.get('lastName')
        phone = request.form.get('phone')
        email = request.form.get('email')
        car_model = request.form.get('carModel')
        manufacture_year = request.form.get('manufactureYear')
        license_plate_number = request.form.get('licensePlateNumber')
        device_id = request.form.get('deviceId')  # Get the device ID from the form data
        
        if not device_id:
            return jsonify({"error": "Device ID is required"}), 400

        # Check if a car already exists with the given device ID
        existing_car = cars_collection.find_one({"deviceId": device_id})

        # If a car exists with the device ID, update it
        if existing_car:
            # Update the existing car's data
            update_data = {
                "carModel": car_model,
                "firstName": first_name,
                "lastName": last_name,
                "phone": phone,
                "email": email,
                "manufactureYear": manufacture_year,
                "licensePlateNumber": license_plate_number,
                "speed": extracted_data["speed"],
                "fuel_consumption": extracted_data["fuel_consumption"],
                "emissions": extracted_data["emissions"],
                "distance": extracted_data["distance"],
                "next_maintenance": extracted_data["next_maintenance"],
                "deviceId": device_id
            }
            
            cars_collection.update_one({"deviceId": device_id}, {"$set": update_data})

            return jsonify({"message": "Car updated", "data": update_data}), 200
        else:
            # Insert a new car if none exists with the given device ID
            data = {
                "carModel": car_model,
                "firstName": first_name,
                "lastName": last_name,
                "phone": phone,
                "email": email,
                "manufactureYear": manufacture_year,
                "licensePlateNumber": license_plate_number,
                "speed": extracted_data["speed"],
                "fuel_consumption": extracted_data["fuel_consumption"],
                "emissions": extracted_data["emissions"],
                "distance": extracted_data["distance"],
                "next_maintenance": extracted_data["next_maintenance"],
                "deviceId": device_id
            }

            car_id = cars_collection.insert_one(data).inserted_id
            return jsonify({"message": "Car added", "car_id": str(car_id), "data": extracted_data}), 201

    return jsonify({"error": "Invalid image"}), 400


# Route to get a car by its device ID
@main.route('/api/cars', methods=['GET'])
def get_car():
    device_id = request.args.get('deviceId')  # Get deviceId from query parameters
    
    if not device_id:
        return jsonify({"error": "Device ID is required"}), 400
    
    # Query for the car associated with the given device ID
    car = cars_collection.find_one({"deviceId": device_id})
    
    if car:
        # Clean up the MongoDB object ID field for the response
        car['_id'] = str(car['_id'])
        return jsonify(car), 200
    
    return jsonify({"error": "Car not found for the provided device ID"}), 404


# Route to delete a car by its device ID
@main.route('/api/cars', methods=['DELETE'])
def delete_car():
    device_id = request.args.get('deviceId')  # Get deviceId from query parameters
    
    if not device_id:
        return jsonify({"error": "Device ID is required"}), 400
    
    # Find and delete the car associated with the given device ID
    result = cars_collection.delete_one({"deviceId": device_id})
    
    if result.deleted_count == 1:
        return jsonify({"message": "Car deleted successfully"}), 200
    
    return jsonify({"error": "Car not found for the provided device ID"}), 404