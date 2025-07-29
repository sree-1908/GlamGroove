import pandas as pd
from sklearn.preprocessing import LabelEncoder, MultiLabelBinarizer
from sklearn.ensemble import RandomForestClassifier
from sklearn.multioutput import MultiOutputClassifier
import joblib

# Load dataset
df = pd.read_csv('skin_quiz_data.csv')

# Preprocess categorical inputs
encoders = {}
for col in ['skin_type', 'sensitivity', 'outdoor_time', 'makeup_use']:
    enc = LabelEncoder()
    df[col] = enc.fit_transform(df[col])
    encoders[col] = enc

# Convert concerns (comma-separated) to multi-hot encoding
mlb = MultiLabelBinarizer()
df['concerns'] = df['concerns'].fillna('')
df['concerns'] = df['concerns'].apply(lambda x: [c.strip() for c in x.split(',') if c.strip()])
concern_encoded = pd.DataFrame(mlb.fit_transform(df['concerns']), columns=mlb.classes_)

# Combine all features
X = pd.concat([df[['skin_type', 'sensitivity', 'outdoor_time', 'makeup_use']], concern_encoded], axis=1)

# Prepare multi-label outputs
y = df[['cleanser', 'toner', 'moisturizer']]
label_outputs = {}
for col in y.columns:
    enc = LabelEncoder()
    y[col] = enc.fit_transform(y[col])
    label_outputs[col] = enc

# Train multi-output classifier
model = MultiOutputClassifier(RandomForestClassifier(n_estimators=100, random_state=42))
model.fit(X, y)

# Save model and encoders
joblib.dump(model, 'skin_routine_model.pkl')
joblib.dump(encoders, 'input_encoders.pkl')
joblib.dump(label_outputs, 'output_encoders.pkl')
joblib.dump(mlb, 'concerns_mlb.pkl')

print("✅ Model and encoders saved.")
