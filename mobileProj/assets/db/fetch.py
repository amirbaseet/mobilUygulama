import sqlite3

# Connect to the SQLite database
conn = sqlite3.connect('immunoglobulins.db')  # Ensure 'IgA.db' is in the same directory
cursor = conn.cursor()

# Fetch all data from the table
cursor.execute("SELECT * FROM IgA_data")
rows = cursor.fetchall()

# Display the fetched data
for row in rows:
    print(row)

# Close the database connection
conn.close()
