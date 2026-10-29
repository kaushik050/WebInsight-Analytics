import os
from flask import Flask, jsonify
from flask_cors import CORS
from routes.analytics import analytics_bp

app = Flask(__name__)
# Enable CORS for React frontend
CORS(app, resources={r"/api/*": {"origins": "*"}})

# Register Analytics API Blueprint
app.register_blueprint(analytics_bp)

@app.route("/api/health", methods=["GET"])
def health_check():
    return jsonify({
        "status": "healthy",
        "service": "WebInsight Analytics & Visualization Engine",
        "version": "2.0.0",
        "domains": [
            "Entertainment", "Education", "News", 
            "Sports", "E-Commerce", "Technology", "Social Media"
        ],
        "tech_stack": ["Python 3", "Flask", "Pandas", "NumPy", "PostgreSQL / SQLite"]
    })

if __name__ == "__main__":
    port = int(os.getenv("PORT", 5000))
    print(f"Starting WebInsight Multi-Domain Analytics Server on port {port}...")
    app.run(host="0.0.0.0", port=port, debug=True)
