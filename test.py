import google.generativeai as genai
import base64

# Configure the API key for Google Generative AI
genai.configure(api_key="AIzaSyA_X9DOnCNSk_DA1Y9YOiki_dA9gLNm7KQ")
model = genai.GenerativeModel(model_name="gemini-1.5-pro")

# Use the correct file path format
image_path = r"C:\Users\HP\Desktop\SmartFleetManager\image.jpg"

# Open the image file in binary mode and encode it
with open(image_path, "rb") as image_file:
    image_data = image_file.read()

# Encode the image to base64
encoded_image = base64.b64encode(image_data).decode('utf-8')

# Prepare the prompt and send the request
prompt = "Analyze the car dashboard image and return the following data in JSON format:Speed FuelConsumption Emissions Distance NextMaintenance FuelLevel EngineTemperature BatteryVoltage OilPressure Return the data as JSON like this:"
response = model.generate_content([{'mime_type': 'image/jpeg', 'data': encoded_image}, prompt])

# Print the response
print(response.text)
