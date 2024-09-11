from flask import Flask, request, jsonify, session
from flask_cors import CORS
from login import authenticate_user
import os

app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('FLASK_SECRET_KEY', 'default-secret-key')
CORS(app)

# Login Route
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    success, message = authenticate_user(email, password)

    if success:
        session['user'] = email
        return jsonify({'success': True, 'message': 'Login successful'})
    else:
        return jsonify({'success': False, 'message': message})

# Logout Route
@app.route('/logout', methods=['POST'])
def logout():
    session.pop('user', None)
    return jsonify({'success': True, 'message': 'Logged out successfully'})

# Check Session Route
@app.route('/check_session', methods=['GET'])
def check_session():
    if 'user' in session:
        return jsonify({'success': True, 'message': 'User is logged in'})
    else:
        return jsonify({'success': False, 'message': 'No active session'})

# Health check or home route
@app.route('/', methods=['GET'])
def home():
    return jsonify({'message': 'Server is running!'})

if __name__ == '__main__':
    app.run(debug=True, host='localhost', port=5001)

