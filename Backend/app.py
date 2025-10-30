from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
from datetime import datetime

# Create Flask app
app = Flask(__name__)
CORS(app)

# 🔹 Initialize database
def init_db():
    conn = sqlite3.connect('dashboard.db')
    c = conn.cursor()
    # Member Entry Table
    c.execute('''CREATE TABLE IF NOT EXISTS members (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL,
                    email TEXT,
                    role TEXT,
                    date_added TEXT
                )''')
    
    # Assign Task Table
    c.execute('''CREATE TABLE IF NOT EXISTS tasks (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    member_name TEXT,
                    task_name TEXT,
                    status TEXT DEFAULT 'Pending',
                    date_assigned TEXT
                )''')
    
    # Final Task Table
    c.execute('''CREATE TABLE IF NOT EXISTS final_tasks (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    member_name TEXT,
                    task_name TEXT,
                    status TEXT,
                    date_completed TEXT
                )''')
    
    conn.commit()
    conn.close()

init_db()

# 🔹 Root route
@app.route("/")
def home():
    return "✅ Flask Backend is Running Successfully!"

# 🔹 Add member
@app.route("/add_member", methods=["POST"])
def add_member():
    data = request.get_json()
    name = data.get("name")
    email = data.get("email")
    role = data.get("role")
    date_added = datetime.now().strftime("%Y-%m-%d")
    
    conn = sqlite3.connect('dashboard.db')
    c = conn.cursor()
    c.execute("INSERT INTO members (name, email, role, date_added) VALUES (?, ?, ?, ?)", 
              (name, email, role, date_added))
    conn.commit()
    conn.close()
    
    return jsonify({"message": "✅ Member added successfully!"})

# 🔹 Get all members
@app.route("/members", methods=["GET"])
def get_members():
    conn = sqlite3.connect('dashboard.db')
    c = conn.cursor()
    c.execute("SELECT * FROM members")
    members = c.fetchall()
    conn.close()
    
    members_list = [{"id": m[0], "name": m[1], "email": m[2], "role": m[3], "date_added": m[4]} for m in members]
    return jsonify(members_list)

# 🔹 Assign a new task
@app.route("/assign_task", methods=["POST"])
def assign_task():
    data = request.get_json()
    member_name = data.get("member_name")
    task_name = data.get("task_name")
    date_assigned = datetime.now().strftime("%Y-%m-%d")
    
    conn = sqlite3.connect('dashboard.db')
    c = conn.cursor()
    c.execute("INSERT INTO tasks (member_name, task_name, date_assigned) VALUES (?, ?, ?)",
              (member_name, task_name, date_assigned))
    conn.commit()
    conn.close()
    
    return jsonify({"message": "✅ Task assigned successfully!"})

# 🔹 Get all tasks
@app.route("/tasks", methods=["GET"])
def get_tasks():
    conn = sqlite3.connect('dashboard.db')
    c = conn.cursor()
    c.execute("SELECT * FROM tasks")
    tasks = c.fetchall()
    conn.close()
    
    tasks_list = [{"id": t[0], "member_name": t[1], "task_name": t[2], "status": t[3], "date_assigned": t[4]} for t in tasks]
    return jsonify(tasks_list)

# 🔹 Update task status (Complete / Pending)
@app.route("/update_task_status/<int:task_id>", methods=["PUT"])
def update_task_status(task_id):
    data = request.get_json()
    new_status = data.get("status")
    
    conn = sqlite3.connect('dashboard.db')
    c = conn.cursor()
    c.execute("UPDATE tasks SET status = ? WHERE id = ?", (new_status, task_id))
    conn.commit()
    conn.close()
    
    return jsonify({"message": f"✅ Task status updated to {new_status}!"})

# 🔹 Add Final Task (completed)
@app.route("/final_task", methods=["POST"])
def add_final_task():
    data = request.get_json()
    member_name = data.get("member_name")
    task_name = data.get("task_name")
    status = data.get("status", "Completed")
    date_completed = datetime.now().strftime("%Y-%m-%d")
    
    conn = sqlite3.connect('dashboard.db')
    c = conn.cursor()
    c.execute("INSERT INTO final_tasks (member_name, task_name, status, date_completed) VALUES (?, ?, ?, ?)",
              (member_name, task_name, status, date_completed))
    conn.commit()
    conn.close()
    
    return jsonify({"message": "✅ Final task added successfully!"})

# 🔹 Get dashboard summary
@app.route("/dashboard", methods=["GET"])
def dashboard():
    conn = sqlite3.connect('dashboard.db')
    c = conn.cursor()
    
    c.execute("SELECT COUNT(*) FROM members")
    member_count = c.fetchone()[0]
    
    c.execute("SELECT COUNT(*) FROM tasks WHERE status='Pending'")
    pending_count = c.fetchone()[0]
    
    c.execute("SELECT COUNT(*) FROM tasks WHERE status='Completed'")
    completed_count = c.fetchone()[0]
    
    conn.close()
    
    dashboard_data = {
        "total_members": member_count,
        "pending_tasks": pending_count,
        "completed_tasks": completed_count
    }
    
    return jsonify(dashboard_data)

# 🔹 Run server
if __name__ == "__main__":
    app.run(debug=True)
