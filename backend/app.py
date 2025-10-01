from flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2
import os

app = Flask(__name__)
CORS(app)

# Database connection
def connect_db():
    conn = psycopg2.connect(
        host="db",
        database="mydb",
        user="user",
        password="samiullah6799"
    )
    return conn

@app.route('/submit', methods=['POST'])
def submit():
    data = request.json
    name = data['name']
    email = data['email']
    city = data['city']
    country = data['country']

    # Insert data into the PostgreSQL database
    conn = connect_db()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO users (name, email, city, country) VALUES (%s, %s, %s, %s) RETURNING id",
        (name, email, city, country)
    )
    inserted_id = cursor.fetchone()[0]  # Get the ID of the inserted record
    conn.commit()
    cursor.close()
    conn.close()

    # Return success message with inserted data
    return jsonify({
        "message": "User added successfully!",
        "user": {
            "id": inserted_id,
            "name": name,
            "email": email,
            "city": city,
            "country": country
        }
    }), 201

@app.route('/users', methods=['GET'])
def get_users():
    """Return all users as JSON array."""
    conn = connect_db()
    cursor = conn.cursor()
    cursor.execute("SELECT id, name, email, city, country FROM users ORDER BY id DESC")
    rows = cursor.fetchall()
    cursor.close()
    conn.close()

    users = [
        {
            "id": r[0],
            "name": r[1],
            "email": r[2],
            "city": r[3],
            "country": r[4],
        }
        for r in rows
    ]
    return jsonify(users)

if __name__ == '__main__':
    debug_mode = os.environ.get('FLASK_DEBUG', '0') == '1'
    app.run(host='0.0.0.0', port=5000, debug=debug_mode)
