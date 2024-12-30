import {adultsByMonths} from "./calculateAgeInMonths";
import { auth, firestore } from '../../firebase';
import {TABLES} from './Table';

function evaluateValueRanges (value, row)  {
  if (!row) {
    console.error("Row data is required");
    return null;
  }
  console.log(`row eva${row}`);
  // Min-Max Checks
            const isLowerMinMax = value < row.min;
            const isHigherMinMax = value > row.max;
            const inRangeMinMax = (!isLowerMinMax && !isHigherMinMax);
            const checkedByminmax= (row.min+row.max)//check if there values was null or not if null dont show the m to the user
            //confidence
            const isLowerConf = value < row.min_confidence;
            const isHigherConf = value > row.max_confidence;
            const inRangeConf = (!isLowerConf && !isHigherConf);
            const checkedByConf= ( row.min_confidence+row.max_confidence)
            //geo
            const isLowerGeo = value < Math.abs(row.max_geo - row.min_geo);//taking the absoulote value
            const isHigherGeo = value > (row.min_geo + row.max_geo);
            const inRangeGeo = (!isLowerGeo && !isHigherGeo);
            const checkedByGeo= ( row.max_geo+row.min_geo)

  return {
    minMax: {
      isLower: isLowerMinMax,
      isHigher: isHigherMinMax,
      inRange: inRangeMinMax,
      checkedBy: checkedByminmax,
    },
    confidence: {
      isLower: isLowerConf,
      isHigher: isHigherConf,
      inRange: inRangeConf,
      checkedBy: checkedByConf,
    },
    geo: {
      isLower: isLowerGeo,
      isHigher: isHigherGeo,
      inRange: inRangeGeo,
      checkedBy: checkedByGeo,
    },
  };
};




export async function checkUlatimate(type, patientAgeMonths, value, kilavuzNames, db) {
  const results = []; // Array to store the results
  const testType = ['Geometrik mean', 'minmax','confidence'];
  const patientAgeMonthsModified = adultsByMonths(patientAgeMonths);
  const placeholders = kilavuzNames.map(() => '?').join(', '); // e.g., '?, ?, ?' for 3 names
  try {
    // Wrap the transaction in a try-catch
    await db.withTransactionAsync(async () => {
      try {
        const statement = await db.prepareAsync(`
          SELECT age_group, kilavuz_name, min_age_months, max_age_months, min_geo, max_geo, min, max,min_confidence,max_confidence
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
            //checking by 
            //minmax
            // console.log(` min_geo = ${row.min_geo}, max_geo= ${row.max_geo}, min= ${row.min}, max= ${row.max},min_confidence= ${row.min_confidence},max_confidence= ${row.max_confidence}`)
            const isLowerMinMax = value < row.min;
            const isHigherMinMax = value > row.max;
            const inRangeMinMax = (!isLowerMinMax && !isHigherMinMax);
            const checkedByminmax= (row.min+row.max)>0//check if there values was null or not if null dont show the m to the user
            //confidence
            const isLowerConf = value < row.min_confidence;
            const isHigherConf = value > row.max_confidence;
            const inRangeConf = (!isLowerConf && !isHigherConf);
            const checkedByConf= ( row.min_confidence+row.max_confidence)>0
            //geo
            const isLowerGeo = value < Math.abs(row.max_geo - row.min_geo);//taking the absoulote value
            const isHigherGeo = value > (row.min_geo + row.max_geo);
            const inRangeGeo = (!isLowerGeo && !isHigherGeo);
            const checkedByGeo= ( row.max_geo+row.min_geo)>0
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
              checkedByGeo:checkedByGeo,
              // minmax values
              isLowerMinMax: isLowerMinMax,
              isHigherMinMax: isHigherMinMax,
              DataBaseMinRange: row.min,
              DataBaseMaxRange: row.max,
              resultMinMax: inRangeMinMax,
              checkedByminmax:checkedByminmax,
              // Confidence values
              isLowerConf: isLowerConf,
              isHigherConf: isHigherConf,
              DataBaseMinRangeconf: row.min_confidence,
              DataBaseMaxRangeconf: row.max_confidence,
              resultConf: inRangeConf,
              checkedByConf:checkedByConf,
              //
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
            checkedByGeo:false,
            // minmax values
            isLowerMinMax: null,
            isHigherMinMax: null,
            DataBaseMinRange: null,
            DataBaseMaxRange: null,
            resultMinMax: null,
            checkedByminmax:false,
             // Confidence values
             isLowerConf: null,
             isHigherConf: null,
             DataBaseMinRange: null,
             DataBaseMaxRange: null,
             resultConf: null,
             checkedByConf:false,

             //
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

export async function checkUlatimateWithUser(type, patientAgeMonths, value, kilavuzNames,USerId, db) {
  const results = []; // Array to store the results
  const testType = ['Geometrik mean', 'minmax','confidence'];
  const patientAgeMonthsModified = adultsByMonths(patientAgeMonths);
  const placeholders = kilavuzNames.map(() => '?').join(', '); // e.g., '?, ?, ?' for 3 names
  try {
    // Wrap the transaction in a try-catch
    await db.withTransactionAsync(async () => {
      try {
        const statement = await db.prepareAsync(`
          SELECT age_group, kilavuz_name, min_age_months, max_age_months, min_geo, max_geo, min, max,min_confidence,max_confidence
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
const usersTest = await fetchResultsByUserId('agVknHVKaQVfxTFHUiFkkH3EOfj1',type);
        const isfirstTest = usersTest[0]?.value?true:false;
        const isSecoundTest = usersTest[1]?.value?true:false;


console.log(`\n\nQueryExecution Time: ${endTime - startTime}ms`);
console.log("***************************");
        // const rows = await result.getAllAsync();
        if (rows.length > 0) {
          rows.forEach((row) => {
            //checking by 
            //minmax
            console.log(` min_geo = ${row.min_geo}, max_geo= ${row.max_geo}, min= ${row.min}, max= ${row.max},min_confidence= ${row.min_confidence},max_confidence= ${row.max_confidence}`)
            const isLowerMinMax = value < row.min;
            const isHigherMinMax = value > row.max;
            const inRangeMinMax = (!isLowerMinMax && !isHigherMinMax);
            const checkedByminmax= (row.min+row.max)//check if there values was null or not if null dont show the m to the user
            //confidence
            const isLowerConf = value < row.min_confidence;
            const isHigherConf = value > row.max_confidence;
            const inRangeConf = (!isLowerConf && !isHigherConf);
            const checkedByConf= ( row.min_confidence+row.max_confidence)
            //geo
            const isLowerGeo = value < Math.abs(row.max_geo - row.min_geo);//taking the absoulote value
            const isHigherGeo = value > (row.min_geo + row.max_geo);
            const inRangeGeo = (!isLowerGeo && !isHigherGeo);
            const checkedByGeo= ( row.max_geo+row.min_geo)
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
              checkedByGeo:checkedByGeo,
              // minmax values
              isLowerMinMax: isLowerMinMax,
              isHigherMinMax: isHigherMinMax,
              DataBaseMinRange: row.min,
              DataBaseMaxRange: row.max,
              resultMinMax: inRangeMinMax,
              checkedByminmax:checkedByminmax,
              // Confidence values
              isLowerConf: isLowerConf,
              isHigherConf: isHigherConf,
              DataBaseMinRangeconf: row.min_confidence,
              DataBaseMaxRangeconf: row.max_confidence,
              resultConf: inRangeConf,
              checkedByConf:checkedByConf,
              //users tests
              firstTestDate:usersTest[0]?.date,
              firstTestValue:usersTest[0]?.value,
              secoundTestDate:usersTest[1]?.date,
              secoundTestValue:usersTest[1]?.value,
              isfirstTest:isfirstTest,
              isSecoundTest:isSecoundTest,
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
            checkedByGeo:false,
            // minmax values
            isLowerMinMax: null,
            isHigherMinMax: null,
            DataBaseMinRange: null,
            DataBaseMaxRange: null,
            resultMinMax: null,
            checkedByminmax:false,
             // Confidence values
             isLowerConf: null,
             isHigherConf: null,
             DataBaseMinRange: null,
             DataBaseMaxRange: null,
             resultConf: null,
             checkedByConf:false,

             //
             firstTestDate:null,
              firstTestValue:null,
              secoundTestDate:null,
              secoundTestValue:null,
              isfirstTest:false,
              isSecoundTest:false,
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
    console.error('Error in checkUlatimateWithUser function:', error);
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
 const fetchResultsByUserId = async (userId,type) => {
  if (!userId) {
    console.error("User ID is required to fetch data");
    return;
  }

  try {
    const querySnapshot = await firestore
      .collection("results") // Specify your Firestore collection name
      .where("userId", "==", userId)
      .where(type, '!=', null) // Filter results by userId
      .orderBy('createdAt', 'desc')
      .limit(2)
      .get();

    if (querySnapshot.empty) {
      console.log("No results found for this user ID.");
      return [];
    }

    const results = querySnapshot.docs.map((doc) => ({
      id: doc.id, // Include document ID if needed
      ...doc.data(), // Spread the document data
    }));

    // console.log("Fetched results:", results);
    const typeMapping = {
      [TABLES[0].table]: "IgM_data",
      [TABLES[1].table]: "IgA_data",
      [TABLES[2].table]: "IgG_data",
      [TABLES[3].table]: "IgG1_data",
      [TABLES[4].table]: "IgG2_data",
      [TABLES[5].table]: "IgG3_data",
      [TABLES[6].table]: "IgG4_data",
    };
    
    const selectedKey = typeMapping[type];
    
    if (!selectedKey) {
      console.error("Invalid type provided.");
      return [];
    }
 const resultPairs =   [
      {
      value:results[0][selectedKey] || null,
      date:results[0].createdAt || null,
    },
      {
      value:results[1][selectedKey] || null,
      date:results[1].createdAt || null,
    }];
    console.log(`resultPairs ${resultPairs}`);
    return resultPairs;
  } catch (error) {
    console.error("Error fetching results:", error);
  }
};

export async function handleSaveToFirestore (userId,iga,igm,igg,igg1,igg2,igg3,igg4){
  if (!userId) {
    console.error("User ID is required to save data");
    return;
  }
  try {
    const now = new Date();
// Format the date and time as 'yy-mm-dd hh:mm:ss'
const formattedDate = `${now.getFullYear().toString().slice(-2)}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
console.log("Formatted Date:", formattedDate);
    // Assuming you have a Firestore collection named "results"
    await firestore.collection("results").add({
      userId: userId, // Associate with a user ID
      createdAt: formattedDate, 
      IgA_data: isNaN(parseInt(iga)) ? null : parseInt(iga),
      IgM_data: isNaN(parseInt(igm)) ? null : parseInt(igm),
      IgG_data: isNaN(parseInt(igg)) ? null : parseInt(igg),
      IgG1_data: isNaN(parseInt(igg1)) ? null : parseInt(igg1),
      IgG2_data: isNaN(parseInt(igg2)) ? null : parseInt(igg2),
      IgG3_data: isNaN(parseInt(igg3)) ? null : parseInt(igg3),
      IgG4_data: isNaN(parseInt(igg4)) ? null : parseInt(igg4),
    });
    console.log("Data successfully saved to Firestore!");
  } catch (error) {
    console.error("Error saving data to Firestore:", error);
  }
};
