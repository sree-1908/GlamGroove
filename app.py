from flask import Flask, request, jsonify, render_template
import joblib
import pandas as pd
import numpy as np
from sklearn.preprocessing import LabelEncoder

app = Flask(__name__)

# Load trained model
model = joblib.load('skin_routine_model.pkl')
print("🧠 Model expects features:", model.feature_names_in_)

# Label encoders
encoders = {
    'skin_type': LabelEncoder().fit(['Dry', 'Oily', 'Combination', 'Sensitive', 'Normal']),
    'sensitivity': LabelEncoder().fit(['Low', 'Medium', 'High']),
    'outdoor_time': LabelEncoder().fit(['Mostly Indoors', '1–2 hours', '3–5 hours', '5+ hours']),
    'makeup_use': LabelEncoder().fit(['Yes', 'No', 'Sometimes']),
}

# Label to product name
product_labels = {
    0: "Gentle Facial Cleanser",
    1: "Micellar Facial Cleanser",
    2: "Refreshing Toner",
    3: "Hydrating Moisturizer",
    4: "Glow Serum (Vitamin C Brightening Serum)",
    5: "Deep Clean Balm"
}

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')

@app.route('/faqs')
def faqs():
    return render_template('faqs.html')

@app.route('/blog')
def blog():
    return render_template('blog.html')

@app.route('/shop')
def shop():
    return render_template('shop.html')

@app.route('/quiz')
def quiz():
    return render_template('quiz.html')

@app.route('/all-products1')
def all_products():
    return render_template('all-products1.html')

@app.route('/ele')
def ele():
    return render_template('ele.html')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        print("📥 Incoming Data:", data)

        # Load model and encoders
        model = joblib.load('skin_routine_model.pkl')
        encoders = joblib.load('input_encoders.pkl')
        output_encoders = joblib.load('output_encoders.pkl')
        mlb = joblib.load('concerns_mlb.pkl')

        # Encode categorical fields
        input_row = {
            'skin_type': encoders['skin_type'].transform([data['skinType']])[0],
            'sensitivity': encoders['sensitivity'].transform([data['sensitivity']])[0],
            'outdoor_time': encoders['outdoor_time'].transform([data['outdoors']])[0],
            'makeup_use': encoders['makeup_use'].transform([data['makeup']])[0],
        }

        concern_vector = pd.DataFrame(mlb.transform([data.get('concerns', [])]), columns=mlb.classes_)
        df = pd.DataFrame([input_row])
        input_features = pd.concat([df, concern_vector], axis=1)

        # Predict
        prediction = model.predict(input_features)[0]

        # Decode predictions
        cleanser = output_encoders['cleanser'].inverse_transform([prediction[0]])[0]
        toner = output_encoders['toner'].inverse_transform([prediction[1]])[0]
        moisturizer = output_encoders['moisturizer'].inverse_transform([prediction[2]])[0]

        return jsonify({
            'cleanser': cleanser,
            'toner': toner,
            'moisturizer': moisturizer
        })

    except Exception as e:
        print("❌ Error in /predict:", e)
        return jsonify({'error': str(e)}), 500


# Server start
if __name__ == '__main__':
    app.run(debug=True)
