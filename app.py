import pickle
from flask import Flask, request, jsonify, render_template

app = Flask(__name__, static_folder="Styles", static_url_path="/static")

# ✅ تحميل النموذج والـ Vectorizer
with open("vectorizer.pkl", "rb") as v_file:
    vectorizer = pickle.load(v_file)

with open("spam_model.pkl", "rb") as model_file:
    model = pickle.load(model_file)

# ✅ عرض صفحة HTML
@app.route('/')
def home():
    return render_template("index.html")

# ✅ API لاستقبال البيانات وتنفيذ التنبؤ
@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    message = data.get("message", "")

    # 🔹 تحويل النص إلى تمثيل عددي باستخدام الـ Vectorizer
    message_vectorized = vectorizer.transform([message])

    # 🔹 استخدام النموذج لعمل التنبؤ
    prediction = model.predict(message_vectorized)[0]

    # 🔹 إرجاع النتيجة إلى الواجهة
    return jsonify({"prediction": "Spam" if prediction == 1 else "Ham"})

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)
