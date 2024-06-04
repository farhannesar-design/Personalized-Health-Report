# This is one way to make the connection to the database - Using the fhirbase API
# References: https://fastapi.tiangolo.com/tutorial/security/first-steps/
# https://fastapi.tiangolo.com/
from fastapi import FastAPI, HTTPException,status,Response, Path, Query
import fhirbase
import psycopg2
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from pydantic import BaseModel
from fastapi.security import OAuth2PasswordBearer,OAuth2PasswordRequestForm
from passlib.context import CryptContext
from fastapi import Request, Depends
from fastapi.responses import JSONResponse
import secrets
from datetime import datetime, timedelta
import jwt
from jose import JWTError
from typing import Optional


app = FastAPI()

secret_key = secrets.token_urlsafe(32)
# Login Credentials for local database
# connection = psycopg2.connect(
#     dbname='fhirbase', user='postgres',
#     host='localhost', port='5432', password='naruto')

# Login Credentials for hosted database Render
connection = psycopg2.connect(
    dbname='fhirbase', user='ihiteam',
    host='dpg-co92pf4f7o1s7391kai0-a.oregon-postgres.render.com', port='5432', password='0h87JvqdpzmntItJlhz0yvNvT6DSfhlp')


# Access fhirbase api
fb = fhirbase.FHIRBase(connection)

# OAuth2PasswordBearer for token-based authentication
oauth2_scheme= OAuth2PasswordBearer(tokenUrl="token")

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Generate a random secret key for JWT token
SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Allow other localhosts (other than what we use in the backend) to work
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Models for the endpoints
class User(BaseModel):
    username: str
    password: str
    firstname: Optional[str] = None
    lastname: Optional[str] = None


# User model
class User2(BaseModel):
    username: str
    password: str
    


# Endpoint to show hello world message - Used to verify that the backend server is running
@app.get("/")
async def root():
    return {"message": "Hello World"}



# Endpoint to create a new user
@app.post("/create_user")
def create_user(user: User):

    # Check if the username already exists in the database
    with connection.cursor() as cursor:
        cursor.execute(
            "SELECT * FROM users WHERE username = %s",
            (user.username, )
            
        )
       
        existing_user = cursor.fetchone()
        if existing_user:
            raise HTTPException(status_code=422, detail="User already exists")
    print("user.password=", user.username)    
    print("user.password=", user.password)
    print(user.username)
        
    # Hash the password before storing it in the database
    hashed_password = pwd_context.hash(user.password)

    # Insert the new user into the database
    with connection.cursor() as cursor:
        cursor.execute(
            "INSERT INTO users (username, password, firstname, lastname) VALUES (%s, %s, %s, %s)",
            (user.username, hashed_password, user.firstname, user.lastname)
        )

     # Fetch the ID of the newly inserted user
        cursor.execute("SELECT lastval()")
        user_id = cursor.fetchone()[0]

        #   Update the user_id in other tables
        cursor.execute(
            "SELECT id FROM medicationrequest WHERE user_id IS NULL FOR UPDATE SKIP LOCKED"
        )

        row = cursor.fetchone()
        if row:
            cursor.execute(
                "UPDATE medicationrequest SET user_id = %s WHERE id = %s",
                (user_id, row[0])
            )

        cursor.execute(
            "SELECT id FROM appointment WHERE user_id IS NULL FOR UPDATE SKIP LOCKED"
        )
        row = cursor.fetchone()
        if row:
            cursor.execute(
                "UPDATE appointment SET user_id = %s WHERE id = %s",
                (user_id, row[0])
            )
        cursor.execute(
            "SELECT id FROM patient WHERE user_id IS NULL FOR UPDATE SKIP LOCKED"
        )
        row = cursor.fetchone()
        if row:
            cursor.execute(
                "UPDATE patient SET user_id = %s WHERE id = %s",
                (user_id, row[0])
            )
        



    connection.commit()
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
            data={"sub": hashed_password[0]},
            expires_delta=access_token_expires
        )
    return {"access_token": access_token, "token_type": "bearer", "firstname": user.firstname, "id": user_id}

# Endpoint to read from the users table and get user details
@app.get("/get_user/{username}")
def get_user(username: str = Path(...)):

    with connection.cursor() as cursor:
        cursor.execute(
            "SELECT * FROM users WHERE username = %s",
            (username, )
        )
        user = cursor.fetchone()
    
    # If the user is found, return it
    if user:
        return {"firstname": user[3], "password": user[2]}  # Adjust the response as needed
    
    raise HTTPException(status_code=404, detail="User not found")

# Endpoint to read from patient table
@app.get("/get_patient_data")
def get_patient_data(user_id: str = Query(...)):
    try:
        with connection.cursor() as cursor:
            cursor.execute(
                "SELECT * FROM patient WHERE user_id = %s",
                (user_id,)
            )
            patientrequest_data = cursor.fetchone()
            return patientrequest_data
    # Log error
    except Exception as e:
        error_detail = str(e) if str(e) else "Unknown error"
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {error_detail}")

# Endpoint to read from medication request table
@app.get("/get_medicationrequest_data")
def get_medicationrequest_data(user_id: str = Query(...)):
    try:
        with connection.cursor() as cursor:
            cursor.execute(
                "SELECT * FROM medicationrequest WHERE user_id = %s",
                (user_id,)
            )
            medicationrequest_data = cursor.fetchone()
            return medicationrequest_data
    except Exception as e:
        error_detail = str(e) if str(e) else "Unknown error"
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {error_detail}")
    
# Endpoint to read from appointment table
@app.get("/get_appointment_data")
def get_appointmentrequest_data(user_id: str = Query(...)):
    try:
        with connection.cursor() as cursor:
            cursor.execute(
                "SELECT * FROM appointment WHERE user_id = %s",
                (user_id,)
            )
            appointmentrequest_data = cursor.fetchone()
            return appointmentrequest_data
    except Exception as e:
        error_detail = str(e) if str(e) else "Unknown error"
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {error_detail}")

#### ISAACS TABLES
# Endpoint to read from cardiovascular score table
@app.get("/get_cardiovascular_score_data")
def get_cardiovascular_score_data(user_id: str = Query(...)):
    try:
        with connection.cursor() as cursor:
            cursor.execute(
                "SELECT * FROM cardiovascular_score WHERE id = %s",
                (user_id,)
            )
           
            field_names = [field[0] for field in cursor.description]
            cardiovascular_data = list(cursor.fetchone())
    
            if cardiovascular_data:
                # Get the description (field names) from the cursor
                test = dict(zip(field_names, cardiovascular_data))
                # print(test)
                return JSONResponse(content=test)
            else:
                return {"message": "There was an error!"}
            
        
    except Exception as e:
        error_detail = str(e) if str(e) else "Unknown error"
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {error_detail}")



# Endpoint to read from digestive score table
@app.get("/get_digestive_score_data")
def get_digestive_score_data(user_id: str = Query(...)):
    try:
        with connection.cursor() as cursor:
            cursor.execute(
                "SELECT * FROM digestive_score WHERE id = %s",
                (user_id,)
            )
            field_names = [field[0] for field in cursor.description]
            digestive_data = cursor.fetchone()
            # return  digestive_data
        
            if digestive_data:
                # Get the description (field names) from the cursor
                test = dict(zip(field_names, digestive_data))
                # print(test)
                return JSONResponse(content=test)
            else:
                return {"message": "There was an error!"}
            
    except Exception as e:
        error_detail = str(e) if str(e) else "Unknown error"
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {error_detail}")

 # Endpoint to read from endocrine score table
@app.get("/get_endocrine_score_data")
def get_endocrine_score_data(user_id: str = Query(...)):
    try:
        with connection.cursor() as cursor:
            cursor.execute(
                "SELECT * FROM endocrine_score WHERE id = %s",
                (user_id,)
            )
            field_names = [field[0] for field in cursor.description]
            endocrine_data = cursor.fetchone()
            # return  digestive_data
        
            if endocrine_data:
                # Get the description (field names) from the cursor
                test = dict(zip(field_names, endocrine_data))
                # print(test)
                return JSONResponse(content=test)
            else:
                return {"message": "There was an error!"}
            # return  endocrine_data
    except Exception as e:
        error_detail = str(e) if str(e) else "Unknown error"
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {error_detail}")   

 # Endpoint to read from musculoskeletal score table
@app.get("/get_musculoskeletal_score_data")
def get_musculoskeletal_score_data(user_id: str = Query(...)):
    try:
        with connection.cursor() as cursor:
            cursor.execute(
                "SELECT * FROM musculoskeletal_score WHERE id = %s",
                (user_id,)
            )
            field_names = [field[0] for field in cursor.description]
            musculoskeletal_data = cursor.fetchone()
            # return  musculoskeletal_data
            if musculoskeletal_data:
                # Get the description (field names) from the cursor
                test = dict(zip(field_names, musculoskeletal_data))
                # print(test)
                return JSONResponse(content=test)
            else:
                return {"message": "There was an error!"}
    except Exception as e:
        error_detail = str(e) if str(e) else "Unknown error"
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {error_detail}")   

 # Endpoint to read from neurological score table
@app.get("/get_neurological_score_data")
def get_neurological_score_data(user_id: str = Query(...)):
    try:
        with connection.cursor() as cursor:
            cursor.execute(
                "SELECT * FROM neurological_score WHERE id = %s",
                (user_id,)
            )
            field_names = [field[0] for field in cursor.description]
            neurological_data = cursor.fetchone()
            # return  neurological_data
            if neurological_data:
                # Get the description (field names) from the cursor
                test = dict(zip(field_names, neurological_data))
                # print(test)
                return JSONResponse(content=test)
            else:
                return {"message": "There was an error!"}
    except Exception as e:
        error_detail = str(e) if str(e) else "Unknown error"
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {error_detail}")   

 # Endpoint to read from reproductive score table
@app.get("/get_reproductive_score_data")
def get_reproductive_score_data(user_id: str = Query(...)):
    try:
        with connection.cursor() as cursor:
            cursor.execute(
                "SELECT * FROM reproductive_score WHERE id = %s",
                (user_id,)
            )
            field_names = [field[0] for field in cursor.description]
            reproductive_data = cursor.fetchone()
            # return  reproductive_data
        
            if reproductive_data:
                # Get the description (field names) from the cursor
                test = dict(zip(field_names,reproductive_data))
                # print(test)
                return JSONResponse(content=test)
            else:
                return {"message": "There was an error!"}
    except Exception as e:
        error_detail = str(e) if str(e) else "Unknown error"
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {error_detail}")   

 # Endpoint to read from respiratory score table
@app.get("/get_respiratory_score_data")
def get_respiratory_score_data(user_id: str = Query(...)):
    try:
        with connection.cursor() as cursor:
            cursor.execute(
                "SELECT * FROM respiratory_score WHERE id = %s",
                (user_id,)
            )
            field_names = [field[0] for field in cursor.description]
            respiratory_data = cursor.fetchone()
            # return  respiratory_data
            if respiratory_data:
                # Get the description (field names) from the cursor
                test = dict(zip(field_names,respiratory_data))
                # print(test)
                return JSONResponse(content=test)
            else:
                return {"message": "There was an error!"}
    except Exception as e:
        error_detail = str(e) if str(e) else "Unknown error"
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {error_detail}")   

 # Endpoint to read from urinary score table
@app.get("/get_urinary_score_data")
def get_urinary_score_data(user_id: str = Query(...)):
    try:
        with connection.cursor() as cursor:
            cursor.execute(
                "SELECT * FROM urinary_score WHERE id = %s",
                (user_id,)
            )
            field_names = [field[0] for field in cursor.description]
            urinary_data = cursor.fetchone()
            # return  urinary_data
            if urinary_data:
                # Get the description (field names) from the cursor
                test = dict(zip(field_names,urinary_data))
                # print(test)
                return JSONResponse(content=test)
            else:
                return {"message": "There was an error!"}
    except Exception as e:
        error_detail = str(e) if str(e) else "Unknown error"
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {error_detail}")   

 # Endpoint to read from immune_system score table
@app.get("/get_immune_system_score_data")
def get_immune_system_data(user_id: str = Query(...)):
    try:
        with connection.cursor() as cursor:
            cursor.execute(
                "SELECT * FROM immune_system_score WHERE id = %s",
                (user_id,)
            )
            field_names = [field[0] for field in cursor.description]
            immune_system_data = cursor.fetchone()
            # return  immune_system_data
            if immune_system_data:
                # Get the description (field names) from the cursor
                test = dict(zip(field_names, immune_system_data))
                # print(test)
                return JSONResponse(content=test)
            else:
                return {"message": "There was an error!"}
    except Exception as e:
        error_detail = str(e) if str(e) else "Unknown error"
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {error_detail}")   



#### ISAACS TABLES
# Function to generate access token
def create_access_token(data: dict, expires_delta: timedelta):
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


# Endpoint to check if user exist in database
@app.post("/login")
def login(user: User):
    try:
        # Query the database for the user's hashed password and firstname
        with connection.cursor() as cursor:
            cursor.execute(
                "SELECT id, password, firstname FROM users WHERE username = %s",
                (user.username,)
            )
            user_data = cursor.fetchone()

        # If username not found or password doesn't match, raise HTTPException
        if not user_data or not pwd_context.verify(user.password, user_data[1]):
            raise HTTPException(status_code=401, detail="Incorrect username or password")

        # Generate access token
        access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token(
            data={"sub": user_data[0]},
            expires_delta=access_token_expires
        )

        # Return access token and firstname
        return {
            "access_token": access_token,
            "token_type": "bearer",
            "firstname": user_data[2],
            "id": user_data[0]
        }
    except Exception as e:
        # Log the error and return HTTPException
        error_detail = str(e) if str(e) else "Unknown error"
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {error_detail}")
    
# Endpoint to get protected data
@app.get("/protected_data")
def protected_data(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid authentication credentials",
                headers={"WWW-Authenticate": "Bearer"},
            )
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Return successfull
    return {"message": f"Hello, this was a success! {username}! You have access to protected data."}
    
# Function to generate access token
def generate_access_token(username: str):
    # Define payload and secret key
    payload = {"sub": username}
    secret_key = SECRET_KEY

    # Generate token
    token = jwt.encode(payload, SECRET_KEY, algorithm="HS256")

    return token

# if __name__ == "__main__":
#    uvicorn.run("app:app", host="127.0.0.1", port=5000, reload=True)