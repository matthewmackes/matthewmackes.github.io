#!/usr/bin/env python3
"""
Web-based administrative interface for managing post subjects
Provides a simple Flask web UI for adding/editing/deleting post categories
"""

import json
import os
from pathlib import Path
from datetime import datetime
from flask import Flask, render_template, request, jsonify, redirect, url_for
from functools import wraps

app = Flask(__name__)
CONFIG_FILE = "_config/post_subjects.json"
SECRET_KEY = os.environ.get('ADMIN_SECRET', 'change-this-secret-key')

app.secret_key = SECRET_KEY

def load_config():
    """Load post subjects configuration"""
    if not os.path.exists(CONFIG_FILE):
        os.makedirs(os.path.dirname(CONFIG_FILE), exist_ok=True)
        return []
    
    try:
        with open(CONFIG_FILE, 'r') as f:
            return json.load(f)
    except json.JSONDecodeError:
        return []

def save_config(data):
    """Save configuration"""
    os.makedirs(os.path.dirname(CONFIG_FILE), exist_ok=True)
    with open(CONFIG_FILE, 'w') as f:
        json.dump(data, f, indent=2)

def check_auth(f):
    """Decorator to check admin authentication"""
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.args.get('token') or request.form.get('token')
        if token != SECRET_KEY:
            return jsonify({'error': 'Unauthorized'}), 401
        return f(*args, **kwargs)
    return decorated

@app.route('/')
def index():
    """Main dashboard"""
    subjects = load_config()
    return render_template('admin_dashboard.html', subjects=subjects)

@app.route('/api/subjects', methods=['GET'])
def get_subjects():
    """Get all subjects as JSON"""
    return jsonify(load_config())

@app.route('/api/subjects', methods=['POST'])
@check_auth
def add_subject_api():
    """Add new subject"""
    data = request.json
    
    if not all(k in data for k in ['name', 'description', 'keywords']):
        return jsonify({'error': 'Missing required fields'}), 400
    
    subjects = load_config()
    
    if any(s['name'].lower() == data['name'].lower() for s in subjects):
        return jsonify({'error': 'Subject already exists'}), 409
    
    keywords = [k.strip().lower() for k in data['keywords'].split(',') if k.strip()]
    
    new_subject = {
        'name': data['name'],
        'description': data['description'],
        'keywords': keywords
    }
    
    subjects.append(new_subject)
    save_config(subjects)
    
    return jsonify(new_subject), 201

@app.route('/api/subjects/<int:index>', methods=['PUT'])
@check_auth
def update_subject(index):
    """Update existing subject"""
    data = request.json
    subjects = load_config()
    
    if index < 0 or index >= len(subjects):
        return jsonify({'error': 'Invalid index'}), 404
    
    if 'name' in data:
        subjects[index]['name'] = data['name']
    if 'description' in data:
        subjects[index]['description'] = data['description']
    if 'keywords' in data:
        keywords = [k.strip().lower() for k in data['keywords'].split(',') if k.strip()]
        subjects[index]['keywords'] = keywords
    
    save_config(subjects)
    return jsonify(subjects[index])

@app.route('/api/subjects/<int:index>', methods=['DELETE'])
@check_auth
def delete_subject(index):
    """Delete subject"""
    subjects = load_config()
    
    if index < 0 or index >= len(subjects):
        return jsonify({'error': 'Invalid index'}), 404
    
    removed = subjects.pop(index)
    save_config(subjects)
    
    return jsonify({'deleted': removed})

@app.route('/api/export', methods=['GET'])
@check_auth
def export_config():
    """Export configuration as JSON"""
    return jsonify(load_config())

@app.route('/api/import', methods=['POST'])
@check_auth
def import_config():
    """Import configuration from JSON"""
    data = request.json
    
    if not isinstance(data, list):
        return jsonify({'error': 'Invalid format. Expected JSON array'}), 400
    
    save_config(data)
    return jsonify({'status': 'Imported successfully', 'count': len(data)})

@app.route('/health')
def health():
    """Health check endpoint"""
    return jsonify({'status': 'ok', 'timestamp': datetime.now().isoformat()})

if __name__ == '__main__':
    app.run(debug=False, host='0.0.0.0', port=5000)
