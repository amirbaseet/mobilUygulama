import db from './database';

export const insertData = (tableName, data) => {
  db.transaction((tx) => {
    data.forEach((row) => {
      tx.executeSql(
        `INSERT INTO ${tableName} 
          (age_group, min_age_months, max_age_months, number, geometric_mean_sd, mean_sd, min, max, min_confidence, max_confidence, kilavuz_name, type)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          row.age_group,
          row.min_age_months,
          row.max_age_months,
          row.number,
          row.geometric_mean_sd,
          row.mean_sd,
          row.min,
          row.max,
          row.min_confidence,
          row.max_confidence,
          row.kilavuz_name,
          row.type,
        ],
        () => console.log(`Row inserted into ${tableName}`),
        (error) => console.error(`Error inserting into ${tableName}`, error)
      );
    });
  });
};
