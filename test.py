import google.generativeai as genai
import base64
import json

# Configure the API key for Google Generative AI
genai.configure(api_key="AIzaSyCHtPKOSUnw8MlZEFRNkjtCQPqaQKArMCE")
model = genai.GenerativeModel(model_name="gemini-1.5-pro")

# Use the correct file path format
image_path = r"C:\Users\HP\Desktop\SmartFleetManager\image.jpg"

# Open the image file in binary mode and encode it
with open(image_path, "rb") as image_file:
    image_data = image_file.read()

# Encode the image to base64
encoded_image = base64.b64encode(image_data).decode('utf-8')

# Prepare the prompt and send the request
# Prompt bien défini
prompt = """Analyze the provided car dashboard image and extract the following data:  
- **Speed** (km/h)  
- **FuelConsumption** (L/100km)  
- **Emissions** (g/km)  
- **Distance** (km)  
- **NextMaintenance** (remaining km)  
- **FuelLevel** (percentage %)  
- **EngineTemperature** (°C)  
- **BatteryVoltage** (V)  
- **OilPressure** (bars)  

### **Instructions importantes :**  
- Return a **valid JSON object** that can be directly parsed using `json.loads()`.  
- The response must **ONLY** contain the JSON object, with **no additional text, no markdown, and no code block indicators (`json`)**.  
- If a value **cannot be determined**, set it to `"Not provided"` (as a **string**, not `null`).  

### **Example output (valid JSON):**  
{
    "Speed": 80,
    "FuelConsumption": "Not provided",
    "Emissions": "Not provided",
    "Distance": 300250,
    "NextMaintenance": "Not provided",
    "FuelLevel": "Not provided",
    "EngineTemperature": "Not provided",
    "BatteryVoltage": "Not provided",
    "OilPressure": "Not provided"
}  
"""  


response = model.generate_content([{'mime_type': 'image/jpeg', 'data': encoded_image}, prompt])

# Print the response
clean_json = response.text.strip("```json").strip("```").strip()
data = json.loads(clean_json)

# Afficher le résultat propre
print(data["Speed"])