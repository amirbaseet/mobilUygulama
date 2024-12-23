import db from './database';

export const initalizeTables =()=>{
    const tableNames = ['IgG1', 'IgG2', 'IgG3', 'IgG4', 'IgM', 'IgA', 'IgG'];

    tableNames.forEach((table)=>{
        db.transaction((tx) => {
            tx.executeSql(
                `CREATE TABLE IF NOT EXISTS ${table} (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    age_group TEXT,
                    min_age_months INTEGER,
                    max_age_months INTEGER,
                    number INTEGER,
                    geometric_mean_sd TEXT,
                    mean_sd TEXT,
                    min REAL,
                    max REAL,
                    min_confidence REAL,
                    max_confidence REAL,
                    kilavuz_name TEXT,
                    type TEXT
                  );`,[],
                  () => console.log(`${table} table created successfully`),
                  (error) => console.error(`Error creating ${table} table`, error)
            );
        });
    });
};