# This is one way to make the connection to the database - Using the fhirbase API

import fhirbase
import psycopg2

# Credentials for Personal Database
# connection = psycopg2.connect(
#     dbname='postgres', user='postgres',
#     host='localhost', port='5432', password='naruto')

# Login Credentials for hosted database Render
connection = psycopg2.connect(
    dbname='fhirbase', user='ihiteam',
    host='dpg-co92pf4f7o1s7391kai0-a.oregon-postgres.render.com', port='5432', password='0h87JvqdpzmntItJlhz0yvNvT6DSfhlp')

fb = fhirbase.FHIRBase(connection)

# Example: Create a resource
resource = fb.create({
    'resourceType': 'Patient',
    'name': [{'text': 'John'}],
})


print(resource)

