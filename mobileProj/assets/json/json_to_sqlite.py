import sqlite3
import json

# List of JSON files and corresponding table names
tables = [
    {"file": "IgM.json", "name": "IgM_data"},
    {"file": "IgA.json", "name": "IgA_data"},
    {"file": "IgG.json", "name": "IgG_data"},
    {"file": "IgG1.json", "name": "IgG1_data"},
    {"file": "IgG2.json", "name": "IgG2_data"},
    {"file": "IgG3.json", "name": "IgG3_data"},
    {"file": "IgG4.json", "name": "IgG4_data"},
]

# Create or connect to a single SQLite database
conn = sqlite3.connect('immunoglobulins.db')  # Single database for all tables
cursor = conn.cursor()

for table in tables:
    # Load JSON data
    with open(table["file"], 'r') as file:
        data = json.load(file)
    
    # Drop the table if it exists (optional, ensures fresh creation)
    cursor.execute(f'DROP TABLE IF EXISTS {table["name"]}')

    # Create table (dynamically using table name)
    cursor.execute(f'''
    CREATE TABLE {table["name"]} (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        age_group TEXT,
        min_age_months REAL,
        max_age_months REAL,
        number INTEGER,
        min_geo REAL,
        max_geo REAL,
        min_mean_sd REAL,
        max_mean_sd REAL,
        min REAL,
        max REAL,
        min_confidence REAL,
        max_confidence REAL,
        kilavuz_name TEXT,
        type TEXT
    )
    ''')

    # Insert data into the table
    for item in data:
        # Skip if kilavuz_name == "cilv"
        if item.get('kilavuz_name') == "cilv":
            continue
        cursor.execute(f'''
        INSERT INTO {table["name"]} (
            age_group, min_age_months, max_age_months, number,
            min_geo, max_geo, min_mean_sd, max_mean_sd, min, max,
            min_confidence, max_confidence, kilavuz_name, type
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            item.get('age_group', ''),  # Default for text fields
            item.get('min_age_months') or 0.0,  # Default for numeric fields
            item.get('max_age_months') or 0.0,
            item.get('number') or 0,
            # Convert numeric values from mg/dL to g/L, default to 0.0 if None
            (item.get('min_geo') or 0.0) ,
            (item.get('max_geo') or 0.0) ,
            (item.get('min_mean_sd') or 0.0),
            (item.get('max_mean_sd') or 0.0),
            (item.get('min') or 0.0) ,
            (item.get('max') or 0.0) ,
            (item.get('min_confidence') or 0.0) ,
            (item.get('max_confidence') or 0.0) ,
            item.get('kilavuz_name', ''),
            item.get('type', '')
        ))

# Commit changes and close the connection
conn.commit()
conn.close()

print('SQLite database "immunoglobulins.db" created successfully with auto-increment id columns!')
