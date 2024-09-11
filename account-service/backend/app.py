from flask import Flask, request, jsonify, session
from flask_cors import CORS
from login import authenticate_user

app = Flask(__name__)
app.config['SECRET_KEY'] = '3f9a4c5b6d7e8f9a0b1c2d3e4f5g6h7i8j9k0l1m2n3o4p5q6r7s8t9u0v1w2x3y4z5a6b7c8d9e0f1g2h3i4j5k6l7m8n9o0p1q2r3s4t5u6v7w8x9y0z1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e2f3g4h5i6j7k8l9m0n1o2p3q4r5s6t7u8v9w0x1y2z3a4b5c6d7e8f9g0h1i2j3k4l5m6n7o8p9q0r1s2t3u4v5w6x7y8z9'
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

