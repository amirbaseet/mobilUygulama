import { adultsByMonths } from "../utils/calculateAgeInMonths";

export async function fetchKlvzData(type, patientAgeMonths, kilavuzNames, db) {
    const patientAgeMonthsModified = adultsByMonths(patientAgeMonths);
    const placeholders = kilavuzNames.map(() => '?').join(', '); // e.g., '?, ?, ?' for 3 names
    try {
      const statement = await db.prepareAsync(`
        SELECT age_group, kilavuz_name, min_age_months, max_age_months, min_geo, max_geo, min, max, min_confidence, max_confidence
        FROM ${type}
        WHERE min_age_months <= ? AND max_age_months >= ? AND kilavuz_name IN (${placeholders})
      `);
      const result = await statement.executeAsync([
        patientAgeMonthsModified,
        patientAgeMonthsModified,
        ...kilavuzNames // Spread the array to pass multiple `kilavuz_name` values
      ]);
      return await result.getAllAsync();
    } catch (error) {
      console.error('Error in fetchKlvzData:', error);
      throw error; // Ensure the error is propagated
    }
  }
  export  async function getKlvzNames(db,selectedTable) {
    const kilavuz_name = {}; // Initialize an empty object
  try{
    await db.withTransactionAsync(async () => {
      // Query to get unique 'kilavuz_name' values
      const statement = await db.prepareAsync(`SELECT DISTINCT kilavuz_name FROM ${selectedTable}`);
      const result = await statement.executeAsync();
      const rows = await result.getAllAsync();
  
      // Extract the unique names into an array
      const uniqueKilavuzNames = rows.map((row) => row.kilavuz_name);
      kilavuz_name.uniqueKilavuzNames = uniqueKilavuzNames;
  
    });
  }catch(error){
    console.error('Error getting klvuz names:', error);
  }
  return kilavuz_name.uniqueKilavuzNames; // Return the array directly
  }
  
  export async function insertDataInto(type, db, data) {
    await db.withTransactionAsync(async () => {
      const query = `INSERT INTO ${type} 
      (age_group, min_age_months, max_age_months, number, min_geo, max_geo,
       min_mean_sd, max_mean_sd, min, max, min_confidence, max_confidence,
        kilavuz_name, type)
      VALUES (?, ?, ?, ?, ?, ?,
             ?, ?, ?, ?, ?, ?,
             ?, ?)`;
      await db.runAsync(query,
        data.age_group, data.min_age_months, data.max_age_months, data.number,
        data.min_geo, data.max_geo, data.min_mean_sd, data.max_mean_sd, data.min,
        data.max, data.min_confidence, data.max_confidence, data.kilavuz_name, data.type);
    });
  }
  