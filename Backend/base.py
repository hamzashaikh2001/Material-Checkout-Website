from flask import Flask, redirect, url_for, request, jsonify
from pymongo import MongoClient
from cryptography.fernet import Fernet
from configparser import ConfigParser
from hashlib import sha256
from flask_cors import CORS, cross_origin
from Users import Users

app = Flask(__name__)
CORS(app, supports_credentials=True)
config = ConfigParser()
c = ""

#Static route example
@app.route('/home/')
def index():
   return 'Hello world'

'''
Route: signup

Creates new user and registers them within the `Users` database

Returns:
400 - Server received malformed username or password formatting
500 - Internal server failed to register within the `Users` database
200 - Succesful user registration in the database
'''
@app.route('/user/signup/', methods=["POST"])
@cross_origin(supports_credentials=True)
def signup():
   print(f"Routing works", flush=True)
   payload = request.args.to_dict()
   
   username = payload['username']                                       #Plaintext username
   password = sha256(payload['password'].encode('UTF-8')).hexdigest()   #Hashed password
   
   user = Users(username, password)                                     #User object
   
   #TODO: 300 code for existing user, do user validation later
   
   try:
      t_id = c.Checkout.Users.insert_one(user.to_database()).inserted_id
   except:
      return "failed to register user", 500
   else:
      return "successfully registered", 200
   

'''
Route: login

Searches for first match of provided email (unique identifier) in the database, then
verifies password hashes match with database entry.

Returns:
404 - User email in credentials do not match any existing entry
401 - User password in credentials does not match an existing entry
200 - Successful user login
'''
@app.route('/user/login', methods=["GET"])
def login():
   payload = request.args.to_dict()

   username = payload['username']                                       #Plaintext username
   password = sha256(payload['password'].encode('UTF-8')).hexdigest()   #Hashed password

   collection = c.Checkout.Users
   matched = collection.find_one({'user': username})
   
   if matched == None:
      return 'user not found', 404
   elif (matched['password'] == password):
      return 'success', 200
   else:
      return 'user credentials do not match', 401


if __name__ == '__main__':
   #Parse config file and decrypt password using stored key
   config.read("db_config.ini")
   key = Fernet(config.get("Credentials", "Key").encode('UTF-8'))
   password = key.decrypt(config.get("Credentials", "Password").encode('UTF-8')).decode('UTF-8')

   #Establish connection to cloud DB
   c = MongoClient(f"mongodb+srv://dbuser:{password}@backend.yqoos.mongodb.net/Checkout?retryWrites=true&w=majority")

   #Establish Flask instance
   app.run(debug=True)