function adultsByMonths(patientAgeMonths){
    //if the patient is adult returning the months to 192 due to make it easier to make the sql query  
    // becaues all of the adults the min age is 192 and the max age was null in the tables so i assigned it to 0
    
    if(patientAgeMonths>=192)
        {
          //  Patient is an adult, returning 192 months.
            return 192;
        }
    else
    //Patient is not an adult, returning actual age in months.
    return patientAgeMonths;
}
export  async function checkTypeKilavuzByMinMax(type,patientAgeMonths, value, kilavuzNames, db) {
    const results = []; // Array to store the results
    try {
        
      // Query the database for the appropriate age range, reference range, and specific kilavuz
      const patientAgeMonthsModified = adultsByMonths(patientAgeMonths); 
      const placeholders = kilavuzNames.map(() => '?').join(', '); // e.g., '?, ?, ?' for 3 names

      await db.withTransactionAsync(async () => {
        const statement = await db.prepareAsync(`
          SELECT age_group, kilavuz_name, min_age_months, max_age_months, min, max
          FROM ${type}
          WHERE min_age_months <= ? AND max_age_months >= ? AND kilavuz_name IN (${placeholders})
        `);
        const result = await statement.executeAsync([
            patientAgeMonthsModified, 
            patientAgeMonthsModified, 
          ...kilavuzNames // Spread the array to pass multiple `kilavuz_name` values
        ]);
        const rows = await result.getAllAsync();
  
        if (rows.length > 0) {
          rows.forEach((row) => {
            // Check if the IgA value is within the range
            if (value >= row.min && value <= row.max) {
              const evaluation  ={
                KilavuzName: row.kilavuz_name,
                type:type,
                value:value, 
                age_group:row.age_group,
                DataBaseMinRange:row.min,
                DataBaseMaxRange:row.max,
                result: true,//in the range
                found: true,
              }
              results.push(evaluation);
            } else {
              console.log(`The IgA value of ${value} is outside the reference range for ${row.kilavuz_name}.`);
              const evaluation  ={
                KilavuzName: row.kilavuz_name,
                type:type,
                value:value, 
                age_group:row.age_group,
                DataBaseMinRange:row.min,
                DataBaseMaxRange:row.max,
                result: false,//out the range
                found: true,
              }
              results.push(evaluation);
            }
          });
        } else {
          // Handle case where no rows match
          results.push({
            KilavuzName: row.kilavuz_name,
            type:type,
            value:value, 
            age_group:row.age_group,
            DataBaseMinRange: 0,
            DataBaseMaxRange: 0,
            Result: false,
            found: false,
          });
         
        }
        results.forEach((evaluation)=>{
            console.log(`Founded = ${evaluation.found} The age_group: ${evaluation.age_group} ${type} value of ${value} is it in the range = ${evaluation.result} the reference range for ${evaluation.KilavuzName} 
                 min = ${evaluation.DataBaseMinRange} max = ${evaluation.DataBaseMaxRange} the patientValue = ${value}.`);
          })
      });
    } catch (error) {
      console.error(`Error checking ${type} value:`, error);
    }
  }
export  async function checkTypeKilavuzByGeo(type,patientAgeMonths, value, kilavuzNames, db) {
    const results = []; // Array to store the results
    try {
        
      // Query the database for the appropriate age range, reference range, and specific kilavuz
      const patientAgeMonthsModified = adultsByMonths(patientAgeMonths); 
      const placeholders = kilavuzNames.map(() => '?').join(', '); // e.g., '?, ?, ?' for 3 names

      await db.withTransactionAsync(async () => {
        const statement = await db.prepareAsync(`
           SELECT age_group, kilavuz_name, min_age_months, max_age_months, min_geo, max_geo
          FROM ${type}
          WHERE min_age_months <= ? AND max_age_months >= ? AND kilavuz_name IN (${placeholders})
        `);
        const result = await statement.executeAsync([
            patientAgeMonthsModified, 
            patientAgeMonthsModified, 
          ...kilavuzNames // Spread the array to pass multiple `kilavuz_name` values
        ]);
        const rows = await result.getAllAsync();
  
        if (rows.length > 0) {
          rows.forEach((row) => {
            console.log(`ageGroup is ${row.age_group}`)
            
            // Check if the IgA value is within the range
            if (value <= (row.min_geo +row.max_geo ) && value >= (row.min_geo -row.max_geo )) {
              const evaluation  ={
                KilavuzName: row.kilavuz_name,
                type:type,
                value:value, 
                age_group:row.age_group,
                DataBaseMinRange:row.min_geo,
                DataBaseMaxRange:row.max_geo,
                result: true,//in the range
                found: true,
              }
              results.push(evaluation);
            } else {
              console.log(`The IgA value of ${value} is outside the reference range for ${row.kilavuz_name}.`);
              const evaluation  ={
                KilavuzName: row.kilavuz_name,
                type:type,
                value:value, 
                age_group:row.age_group,
                DataBaseMinRange:row.min_geo,
                DataBaseMaxRange:row.max_geo,
                result: false,//out the range
                found: true,
              }
              results.push(evaluation);
            }
          });
        } else {
          // Handle case where no rows match
          results.push({
            KilavuzName: kilavuz,
            type:type,
            value:value, 
           age_group:'null not found',
            DataBaseMinRange: 0,
            DataBaseMaxRange: 0,
            Result: false,
            found: false,
          });
         
        }
        results.forEach((evaluation)=>{
            console.log(`Founded = ${evaluation.found} The age_group: ${evaluation.age_group} ${type} value of ${value} is it in the range = ${evaluation.result} the reference range for ${evaluation.KilavuzName} 
                 min = ${evaluation.DataBaseMinRange} max = ${evaluation.DataBaseMaxRange} the patientValue = ${value}.`);
          })
      });
    } catch (error) {
      console.error(`Error checking ${type} value:`, error);
    }
  }
//   export  async function checkByKilavuzByGeo(type,patientAgeMonths, value, kilavuzNames, db) {
//     try {
//       // Query the database for the appropriate age range, reference range, and specific kilavuz
//       await db.withTransactionAsync(async () => {
//         const statement = await db.prepareAsync(`
//           SELECT kilavuz_name, min_age_months, max_age_months, min_geo, max_geo
//           FROM ${type}
//           WHERE min_age_months <= ? AND max_age_months >= ? AND kilavuz_name IN (?, ?)
//         `);
//         const result = await statement.executeAsync([
//           patientAgeMonths, 
//           patientAgeMonths, 
//           ...kilavuzNames // Spread the array to pass multiple `kilavuz_name` values
//         ]);
//         const rows = await result.getAllAsync();
  
//         if (rows.length > 0) {
          
//           rows.forEach((row) => {
//             console.log(`Checking for Kilavuz: ${row.kilavuz_name}`);
//             console.log(`Database Range: Min Age = ${row.min_age_months}, Max Age = ${row.max_age_months}`);
//             console.log(`Reference Range: Min = ${row.min_geo}, Max = ${row.max_geo}`);
//             console.log(`Reference Range: BY GEO `);
            
//             // Check if the IgA value is within the range
//             if (value <= (row.min_geo +row.max_geo ) && value >= (row.min_geo -row.max_geo )) {
//               console.log(`The ${type} value of ${value} is within the reference range for ${row.kilavuz_name}.`);
  
//             } else {
//               console.log(`The ${type} value of ${value} is outside the reference range for ${row.kilavuz_name}.`);
  
//             }
//           });
//         } else {
//           console.log('No matching reference range found for the given age and kilavuz.');
//         }
//       });
//     } catch (error) {
//       console.error('Error checking ${type} value:', error);
//     }
//   }
//   export  async function checkByKilavuzByMinMax(type,patientAgeMonths, value, kilavuzNames, db) {
//     try {
//       // Query the database for the appropriate age range, reference range, and specific kilavuz
//       await db.withTransactionAsync(async () => {
//         const statement = await db.prepareAsync(`
//           SELECT kilavuz_name, min_age_months, max_age_months, min, max
//           FROM ${type}
//           WHERE min_age_months <= ? AND max_age_months >= ? AND kilavuz_name IN (?, ?)
//         `);
//         const result = await statement.executeAsync([
//           patientAgeMonths, 
//           patientAgeMonths, 
//           ...kilavuzNames // Spread the array to pass multiple `kilavuz_name` values
//         ]);
//         const rows = await result.getAllAsync();
  
//         if (rows.length > 0) {
//           rows.forEach((row) => {
//             console.log(`Checking for Kilavuz: ${row.kilavuz_name}`);
//             console.log(`Database Range: Min Age = ${row.min_age_months}, Max Age = ${row.max_age_months}`);
//             console.log(`Reference Range: Min = ${row.min}, Max = ${row.max}`);
  
//             // Check if the IgA value is within the range
//             if (value >= row.min && value <= row.max) {
//               console.log(`The ${type} value of ${value} is within the reference range for ${row.kilavuz_name}.`);
//             } else {
//               console.log(`The ${type} value of ${value} is outside the reference range for ${row.kilavuz_name}.`);
//             }
//           });
//         } else {
//           console.log('No matching reference range found for the given age and kilavuz.');
//         }
//       });
//     } catch (error) {
//       console.error('Error checking ${type} value:', error);
//     }
//   }

  
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
  