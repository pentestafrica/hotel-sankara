from flask import jsonify, request
from app import app, db
from models import Room, Employee, Reservation, Schedule, Task
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime

# Room routes
@app.route('/api/rooms', methods=['GET'])
@jwt_required()
def get_rooms():
    rooms = Room.query.all()
    return jsonify([{
        'id': room.id,
        'room_number': room.room_number,
        'status': room.status,
        'room_type': room.room_type,
        'price_per_night': room.price_per_night,
        'floor': room.floor,
        'features': room.features
    } for room in rooms])

@app.route('/api/rooms/<int:room_id>', methods=['GET'])
@jwt_required()
def get_room(room_id):
    room = Room.query.get_or_404(room_id)
    return jsonify({
        'id': room.id,
        'room_number': room.room_number,
        'status': room.status,
        'room_type': room.room_type,
        'price_per_night': room.price_per_night,
        'floor': room.floor,
        'features': room.features
    })

# Employee routes
@app.route('/api/employees', methods=['GET'])
@jwt_required()
def get_employees():
    employees = Employee.query.all()
    return jsonify([{
        'id': emp.id,
        'first_name': emp.first_name,
        'last_name': emp.last_name,
        'email': emp.email,
        'role': emp.role,
        'status': emp.status
    } for emp in employees])

# Reservation routes
@app.route('/api/reservations', methods=['POST'])
@jwt_required()
def create_reservation():
    data = request.get_json()
    
    new_reservation = Reservation(
        room_id=data['room_id'],
        guest_name=data['guest_name'],
        guest_email=data['guest_email'],
        guest_phone=data['guest_phone'],
        check_in=datetime.fromisoformat(data['check_in']),
        check_out=datetime.fromisoformat(data['check_out']),
        special_requests=data.get('special_requests', '')
    )
    
    db.session.add(new_reservation)
    db.session.commit()
    
    return jsonify({'message': 'Reservation created successfully', 'id': new_reservation.id}), 201

# Schedule routes
@app.route('/api/schedules', methods=['GET'])
@jwt_required()
def get_schedules():
    schedules = Schedule.query.all()
    return jsonify([{
        'id': schedule.id,
        'employee_id': schedule.employee_id,
        'date': schedule.date.isoformat(),
        'shift_start': schedule.shift_start.isoformat(),
        'shift_end': schedule.shift_end.isoformat(),
        'status': schedule.status
    } for schedule in schedules])

# Task routes
@app.route('/api/tasks', methods=['GET'])
@jwt_required()
def get_tasks():
    tasks = Task.query.all()
    return jsonify([{
        'id': task.id,
        'employee_id': task.employee_id,
        'task_type': task.task_type,
        'description': task.description,
        'room_number': task.room_number,
        'priority': task.priority,
        'status': task.status,
        'due_date': task.due_date.isoformat() if task.due_date else None
    } for task in tasks])

@app.route('/api/tasks', methods=['POST'])
@jwt_required()
def create_task():
    data = request.get_json()
    
    new_task = Task(
        employee_id=data['employee_id'],
        task_type=data['task_type'],
        description=data['description'],
        room_number=data.get('room_number'),
        priority=data.get('priority', 'normal'),
        due_date=datetime.fromisoformat(data['due_date']) if 'due_date' in data else None
    )
    
    db.session.add(new_task)
    db.session.commit()
    
    return jsonify({'message': 'Task created successfully', 'id': new_task.id}), 201

# Error handlers
@app.errorhandler(404)
def not_found_error(error):
    return jsonify({'error': 'Not found'}), 404

@app.errorhandler(500)
def internal_error(error):
    db.session.rollback()
    return jsonify({'error': 'Internal server error'}), 500
