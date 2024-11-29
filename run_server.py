from waitress import serve
import sys
sys.path.append('./backend')
from app import app

if __name__ == '__main__':
    print("Starting server on http://localhost:8080")
    serve(app, host='0.0.0.0', port=8080)
