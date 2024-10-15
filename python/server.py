# app.py
import TreasureGenerator
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/generate', methods=['POST'])
def generate_value():
    data = request.json
    value = data.get('value')
    if isinstance(value, int):
        result = TreasureGenerator.call_generators(value)
        return jsonify({'result': result}), 200
    else:
        return jsonify({'error': 'Invalid input'}), 400

if __name__ == '__main__':
    app.run(debug=True)