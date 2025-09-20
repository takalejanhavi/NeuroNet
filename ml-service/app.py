import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from flask import Flask, request, jsonify
import numpy as np
import os
from flask_cors import CORS

# Flask app
app = Flask(__name__)
CORS(app)

# Create mock training data if CSV doesn't exist
def create_mock_data():
    np.random.seed(42)
    n_samples = 1000
    data = {f'q{i}': np.random.randint(0, 4, n_samples) for i in range(1, 10)}
    df = pd.DataFrame(data)
    return df

# Load and prepare data
try:
    df = pd.read_csv("phq9_survey.csv")
except FileNotFoundError:
    print("PHQ-9 CSV not found, creating mock data...")
    df = create_mock_data()

# Calculate PHQ-9 total score
df["phq9_score"] = df[[f"q{i}" for i in range(1, 10)]].sum(axis=1)

# Define severity mapping
def map_severity(score):
    if score <= 4:
        return "Minimal"
    elif score <= 9:
        return "Mild"
    elif score <= 14:
        return "Moderate"
    elif score <= 19:
        return "Moderately Severe"
    else:
        return "Severe"

df["severity"] = df["phq9_score"].apply(map_severity)

# Prepare features and target
X = df[[f"q{i}" for i in range(1, 10)]]
y = df["severity"]

# Split data
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

# Debug: Check for NaNs
print("NaNs in training features:", X_train.isna().sum().sum())
print("NaNs in test features:", X_test.isna().sum().sum())

# Create and train model pipeline with imputer
clf = Pipeline([
    ('imputer', SimpleImputer(strategy='mean')),  # handle NaNs automatically
    ('scaler', StandardScaler()),
    ('model', RandomForestClassifier(n_estimators=200, random_state=42))
])

print("Training PHQ-9 model...")
clf.fit(X_train, y_train)

# Calculate accuracy
accuracy = clf.score(X_test, y_test)
print(f"Model accuracy: {accuracy:.3f}")

# Flask endpoints
@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({
        "status": "healthy",
        "model": "PHQ-9 Random Forest",
        "accuracy": f"{accuracy:.3f}"
    })

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        responses = [data.get(f"q{i}", 0) for i in range(1, 10)]
        for i, r in enumerate(responses):
            if not isinstance(r, (int, float)) or r < 0 or r > 3:
                return jsonify({"error": f"Invalid response for question {i+1}. Must be 0-3."}), 400

        prediction = clf.predict([responses])[0]
        probabilities = clf.predict_proba([responses])[0]
        confidence = max(probabilities)
        raw_score = sum(responses)

        return jsonify({
            "severity": prediction,
            "confidence": float(confidence),
            "raw_score": raw_score,
            "max_score": 27,
            "responses": dict(zip([f"q{i}" for i in range(1, 10)], responses))
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/model-info', methods=['GET'])
def model_info():
    return jsonify({
        "model_type": "Random Forest Classifier",
        "features": [f"q{i}" for i in range(1, 10)],
        "classes": ["Minimal", "Mild", "Moderate", "Moderately Severe", "Severe"],
        "accuracy": float(accuracy),
        "training_samples": len(X_train),
        "test_samples": len(X_test)
    })

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5001))
    app.run(host="0.0.0.0", port=port, debug=True)
