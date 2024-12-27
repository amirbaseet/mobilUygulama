function adultsByMonths(patientAgeMonths){
  //if the patient is adult returning the months to 192 due to make it easier to make the sql query  
  // becaues all of the adults the min age is 192 and the max age was null in the tables so i assigned it to 0
  
  if(patientAgeMonths>=192)
      {
        //  Patient is an adult, returning 192 months.
          return 200;
      }
  else
  //Patient is not an adult, returning actual age in months.
  return patientAgeMonths;
}

export async function checkUlatimate(type, patientAgeMonths, value, kilavuzNames, db) {
  const results = []; // Array to store the results
  const testType = ['Geometrik mean', 'minmax'];
  const patientAgeMonthsModified = adultsByMonths(patientAgeMonths);
  const placeholders = kilavuzNames.map(() => '?').join(', '); // e.g., '?, ?, ?' for 3 names

  try {
    // Wrap the transaction in a try-catch
    await db.withTransactionAsync(async () => {
      try {
        const statement = await db.prepareAsync(`
          SELECT age_group, kilavuz_name, min_age_months, max_age_months, min_geo, max_geo, min, max
          FROM ${type}
          WHERE min_age_months <= ? AND max_age_months >= ? AND kilavuz_name IN (${placeholders})
          
        `);
        // LIMIT 10
        const result = await statement.executeAsync([
          patientAgeMonthsModified,
          patientAgeMonthsModified,
          ...kilavuzNames // Spread the array to pass multiple `kilavuz_name` values
        ]);
     const startTime = Date.now(); // Record start time
const rows = await result.getAllAsync();
const endTime = Date.now(); // Record end time

console.log(`\n\nQueryExecution Time: ${endTime - startTime}ms`);
console.log("***************************");
        // const rows = await result.getAllAsync();
        if (rows.length > 0) {
          rows.forEach((row) => {
            const isLowerMinMax = value < row.min;
            const isHigherMinMax = value > row.max;
            const inRangeMinMax = (!isLowerMinMax && !isHigherMinMax);

            const isLowerGeo = value < (row.max_geo - row.min_geo);
            const isHigherGeo = value > (row.min_geo + row.max_geo);
            const inRangeGeo = (!isLowerGeo && !isHigherGeo);

            const evaluation = {
              kilavuzName: row.kilavuz_name,
              type: type,
              testType: testType,
              value: value,
              age_group: row.age_group,
              // Geo values
              DataBaseMinGeoRange: row.min_geo,
              DataBaseMaxGeoRange: row.max_geo,
              isLowerGeo: isLowerGeo,
              isHigherGeo: isHigherGeo,
              resultGeo: inRangeGeo,
              // minmax values
              isLowerMinMax: isLowerMinMax,
              isHigherMinMax: isHigherMinMax,
              DataBaseMinRange: row.min,
              DataBaseMaxRange: row.max,
              resultMinMax: inRangeMinMax,
              found: true,
            };
            results.push(evaluation);
          });
        } else {
          // If no rows found, push a default result
          results.push({
            kilavuzName: null,
            type: type,
            testType: testType,
            value: value,
            age_group: null,
            // Geo values
            DataBaseMinGeoRange: null,
            DataBaseMaxGeoRange: null,
            isLowerGeo: null,
            isHigherGeo: null,
            resultGeo: null,
            // minmax values
            isLowerMinMax: null,
            isHigherMinMax: null,
            DataBaseMinRange: null,
            DataBaseMaxRange: null,
            resultMinMax: null,
            found: false,
          });
        }
      } catch (transactionError) {
        // Handle errors during the transaction
        console.error('Error during transaction:', transactionError);
        throw transactionError; // Rethrow to ensure transaction rollback
      }
       // Log the results array
    // console.log('Results:', results);
    });
  } catch (error) {
    // Handle errors outside the transaction
    console.error('Error in checkUlatimate function:', error);
    throw error; // Optionally rethrow or handle the error as needed
  }

  return results; // Return the results array
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
