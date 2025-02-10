# 🚗 Fleet Management System

A mobile application to track vehicle locations and performance in real time, with predictive maintenance management.

## 📌 Features
- 📍 **Real-time vehicle geolocation**
- ⛽ **Fuel consumption and driving behavior tracking**
- ⚠️ **Speeding alerts**
- 🛠 **Maintenance management and sensor data tracking**
- 🤖 **Failure prediction using machine learning**
- 🔔 **Preventive maintenance notifications**

## 🛠 Tech Stack

| Technology | Description |
|------------|-------------|
| 🚀 [**React Native**](https://reactnative.dev/) | A powerful framework for building cross-platform mobile applications (Android & iOS) using JavaScript and React. |
| 🌐 [**React.js**](https://react.dev/) | A fast and flexible frontend library for creating interactive web applications with reusable UI components. |
| 🖥️ [**Flask**](https://flask.palletsprojects.com/) | A lightweight and scalable Python web framework designed for building RESTful APIs with minimal overhead. |
| 🗄️ [**MongoDB**](https://www.mongodb.com/) | A high-performance, NoSQL database optimized for flexible and scalable data storage, ideal for real-time tracking applications. |
| 🤖 [**Gemini AI**](https://ai.google.dev/) | An advanced AI model by Google used for predictive analytics, smart recommendations, and failure detection. |




## 🚀 Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/mohamedmaghzaoui/SmartFleetManager
cd FleetManager
```

### 2️⃣ Backend Setup
#### Install dependencies
```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

#### Start MongoDB (if not running)
```bash
mongod --dbpath /path/to/your/mongodb/data
```

#### Start the Flask server
```bash
export FLASK_APP=app.py  # On Windows: set FLASK_APP=app.py
flask run --host=0.0.0.0 --port=5000
```

### 3️⃣ Frontend Setup
#### Install dependencies
```bash
cd ../frontend
npm install
```

#### Run the React Native app
```bash
npm start
```

## 📡 API Endpoints

### ➕ Add/Update a Car
```http
POST /api/cars
```
**Request:**
- `image` (file) – Car dashboard image
- `firstName`, `lastName`, `phone`, `email`, `carModel`, `manufactureYear`, `licensePlateNumber`, `deviceId` (string)

### 🔍 Get a Car by Device ID
```http
GET /api/cars?deviceId=DEVICE_ID
```

### ❌ Delete a Car by Device ID
```http
DELETE /api/cars?deviceId=DEVICE_ID
```

## 👨‍💻 About Me

Hi, I'm **Mohamed Maghzaoui**, a passionate software engineer with a wide range of expertise spanning from **web development** to **IoT**, **cloud**, and **networking technologies**. I am always excited to explore new opportunities, especially in the field of AI, and contribute to innovative projects like **AIGen**.

My goal is to continue growing my development skills and build impactful applications, and I’m looking forward to pushing the boundaries of data generation with AI. 🔥

🔗 [Portfolio](https://mohamedmaghzaoui.online/)  
🔗 [Linkedin](https://www.linkedin.com/in/mohamed-maghzaoui-577044256/)  


## 📬 Contact

If you have any questions or feedback, feel free to reach out to me:

- Email: [mohamedmaghzaoui53@gmail.com](mailto:mohamedmaghzaoui53@gmail.com)
- GitHub: [mohamedmaghzaoui](https://github.com/mohamedmaghzaoui)
