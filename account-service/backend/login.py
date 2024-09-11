# login.py
from werkzeug.security import generate_password_hash, check_password_hash

# Example: User data stored in memory for demo purposes
# In a real application, this should be stored securely in a database
users_db = {
    'user1@example.com': {
        'password': generate_password_hash('password123')  # Correct password
    }
}

def authenticate_user(email, password):
    # Check if user exists in the database
    if email not in users_db:
        return False, "Invalid Email"

    user_data = users_db[email]
    hashed_password = user_data['password']

    # Verify the password
    if not check_password_hash(hashed_password, password):
        return False, "Invalid Password"

    return True, "Login successful"

def check_user_session(session):
    # Check if the user session exists
    if 'user' in session:
        return True
    else:
        return False
