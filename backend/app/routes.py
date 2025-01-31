from flask import Blueprint, jsonify, request

main = Blueprint('main', __name__)

@main.route('/', methods=['GET'])
def get_data():
    
    return jsonify({"message": "Hello from Flask man!"})

@main.route('/api/data', methods=['POST'])
def post_data():
    data = request.json
    return jsonify({"received": data}), 201
