from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app) # Allows React (port 3000) to talk to Flask (port 5000)

# http://localhost:5000/validate
@app.route('/validate', methods=['POST'])
def validate_email():
    
    # React sent: { "email": "user@example.com" }
    data = request.json 
    
    if not data or 'email' not in data:
        return jsonify({"valid": False, "error": "No email provided"}), 400

    user_email = data['email'] 
    
    # validation logic hereeee    
    blocked_domains = ["gmail.com", "yahoo.com", "hotmail.com", "icloud.com"]
    
    # splits "jane@gmail.com" into ["jane", "gmail.com"]
    try:
        domain = user_email.split('@')[1].lower()
    except IndexError:
         return jsonify({"valid": False, "error": "Invalid email format"}), 400

    # if the domain is in our blocked list, fail.
    if domain in blocked_domains:
        # SENDING BACK: This dictionary becomes the 'data' React 'data.valid' check
        return jsonify({
            "valid": False, 
            "message": "Please use a work email."
        })
    
    # if we get here, it's a valid work email
    return jsonify({
        "valid": True, 
        "message": "Email accepted!"
    })
    
if __name__ == '__main__':
    app.run(debug=True, port=5000)