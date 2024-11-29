from flask import jsonify, request
from app import app, db
from models import Employee
from flask_jwt_extended import create_access_token
from werkzeug.security import generate_password_hash, check_password_hash

@app.route('/api/auth/login', methods=['POST'])
def login():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400

    email = request.json.get('email', None)
    password = request.json.get('password', None)

    if not email or not password:
        return jsonify({"msg": "Missing email or password"}), 400

    employee = Employee.query.filter_by(email=email).first()
    if not employee or not check_password_hash(employee.password_hash, password):
        return jsonify({"msg": "Bad email or password"}), 401

    # Convertir explicitement l'ID en string
    employee_id = str(employee.id)
    access_token = create_access_token(identity=employee_id)
    
    return jsonify({
        "access_token": access_token,
        "user": {
            "id": employee.id,
            "email": employee.email,
            "first_name": employee.first_name,
            "last_name": employee.last_name,
            "role": employee.role
        }
    })

@app.route('/api/auth/register', methods=['POST'])
def register():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400

    data = request.get_json()
    required_fields = ['email', 'password', 'first_name', 'last_name', 'role']
    
    for field in required_fields:
        if field not in data:
            return jsonify({"msg": f"Missing {field}"}), 400

    if Employee.query.filter_by(email=data['email']).first():
        return jsonify({"msg": "Email already registered"}), 400

    new_employee = Employee(
        email=data['email'],
        password_hash=generate_password_hash(data['password']),
        first_name=data['first_name'],
        last_name=data['last_name'],
        role=data['role'],
        phone=data.get('phone', ''),
        status='active'
    )

    db.session.add(new_employee)
    db.session.commit()

    return jsonify({
        "msg": "User created successfully",
        "user": {
            "id": new_employee.id,
            "email": new_employee.email,
            "first_name": new_employee.first_name,
            "last_name": new_employee.last_name,
            "role": new_employee.role
        }
    }), 201
