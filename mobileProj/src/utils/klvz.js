import {fetchKlvzData} from '../services/dbLiteService';
import {getUserEvaluation,getEvaluation,getGeoTest,getMinMaxTest,getConfTest} from './dataEvaluation';
import {fetchResultsByUserId} from '../services/firestoreService';


export async function checkUlatimate(type, patientAgeMonths, value, kilavuzNames, db) {
  const results = [];
  try {
    const startTime = Date.now(); // Record start time
    const rows = await fetchKlvzData(type, patientAgeMonths, kilavuzNames, db); // Fetch rows
    const endTime = Date.now(); // Record end time
    console.log(`\n\nQueryExecution Time for ${type} : ${endTime - startTime}ms`);
    
    if (rows.length > 0) {
      rows.forEach((row) => {
        const found = true;
        const minMax = getMinMaxTest(row, value);
        const geo = getGeoTest(row, value);
        const conf = getConfTest(row, value);

        const rowData = {
          kilavuzName: row.kilavuz_name,
          type: type,
          value: value,
          age_group: row.age_group,
        };
        const evaluation = getEvaluation(rowData, minMax, geo, conf, found);
        results.push(evaluation);
      });
    } else {
      // If no rows found
      const rowData = {
        kilavuzName: null,
        type: type,
        value: value,
        age_group: null,
      };
      const evaluation = getEvaluation(rowData, null, null, null, false);
      results.push(evaluation);
    }
  } catch (error) {
    console.error('Error in checkUlatimate function:', error);
    throw error; // Ensure the error is propagated
  }

  return results; // Return the results array
}
export async function checkUlatimateWithUser(type, patientAgeMonths, value, kilavuzNames, USerId, db) {
  const results = [];
  try {
    const rows = await fetchKlvzData(type, patientAgeMonths, kilavuzNames, db); // Fetch data
    const usersTest = await fetchResultsByUserId(USerId, type); // Fetch user tests
    const isfirstTest = usersTest[0]?.value ? true : false;
    const isSecoundTest = usersTest[1]?.value ? true : false;
    console.log(`isfirstTest=${isfirstTest}`)
    if (rows.length > 0) {
      rows.forEach((row) => {
        const found = true;
        const minMax = getMinMaxTest(row, value);
        const geo = getGeoTest(row, value);
        const conf = getConfTest(row, value);

        const rowData = {
          kilavuzName: row.kilavuz_name,
          type: type,
          value: value,
          age_group: row.age_group,
        };
        const evaluation = getUserEvaluation(rowData, minMax, geo, conf, found, usersTest, isfirstTest, isSecoundTest);
        results.push(evaluation);
      });
    } else {
      // If no rows are found
      const rowData = {
        kilavuzName: null,
        type: type,
        value: value,
        age_group: null,
      };
      try {
        const evaluation = getUserEvaluation(rowData, null, null, null, false, usersTest, isfirstTest, isSecoundTest);
        results.push(evaluation);
      } catch (error) {
        console.error('Error in getUserEvaluation:', error);
      }
    }
  } catch (error) {
    console.error('Error in checkUlatimateWithUser function:', error);
    throw error;
  }

  return results; // Return the results array
}

