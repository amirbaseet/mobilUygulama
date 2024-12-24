import React, { useState, useEffect } from 'react';
import { SQLiteProvider, useSQLiteContext } from 'expo-sqlite';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const TABLES = [
  'IgM_data',
  'IgA_data',
  'IgG_data',
  'IgG1_data',
  'IgG2_data',
  'IgG3_data',
  'IgG4_data',
];

async function checkIgAByKilavuz(patientAgeMonths, igaValue, kilavuzNames, db) {
  try {
    // Query the database for the appropriate age range, reference range, and specific kilavuz
    await db.withTransactionAsync(async () => {
      const statement = await db.prepareAsync(`
        SELECT kilavuz_name, min_age_months, max_age_months, min, max
        FROM IgA_data
        WHERE min_age_months <= ? AND max_age_months >= ? AND kilavuz_name IN (?, ?)
      `);
      const result = await statement.executeAsync([
        patientAgeMonths, 
        patientAgeMonths, 
        ...kilavuzNames // Spread the array to pass multiple `kilavuz_name` values
      ]);
      const rows = await result.getAllAsync();

      if (rows.length > 0) {
        rows.forEach((row) => {
          console.log(`Checking for Kilavuz: ${row.kilavuz_name}`);
          console.log(`Database Range: Min Age = ${row.min_age_months}, Max Age = ${row.max_age_months}`);
          console.log(`Reference Range: Min = ${row.min}, Max = ${row.max}`);

          // Check if the IgA value is within the range
          if (igaValue >= row.min && igaValue <= row.max) {
            console.log(`The IgA value of ${igaValue} is within the reference range for ${row.kilavuz_name}.`);
          } else {
            console.log(`The IgA value of ${igaValue} is outside the reference range for ${row.kilavuz_name}.`);
          }
        });
      } else {
        console.log('No matching reference range found for the given age and kilavuz.');
      }
    });
  } catch (error) {
    console.error('Error checking IgA value:', error);
  }
}

async function checkByKilavuzByMinMax(type,patientAgeMonths, value, kilavuzNames, db) {
  try {
    // Query the database for the appropriate age range, reference range, and specific kilavuz
    await db.withTransactionAsync(async () => {
      const statement = await db.prepareAsync(`
        SELECT kilavuz_name, min_age_months, max_age_months, min, max
        FROM ${type}
        WHERE min_age_months <= ? AND max_age_months >= ? AND kilavuz_name IN (?, ?)
      `);
      const result = await statement.executeAsync([
        patientAgeMonths, 
        patientAgeMonths, 
        ...kilavuzNames // Spread the array to pass multiple `kilavuz_name` values
      ]);
      const rows = await result.getAllAsync();

      if (rows.length > 0) {
        rows.forEach((row) => {
          console.log(`Checking for Kilavuz: ${row.kilavuz_name}`);
          console.log(`Database Range: Min Age = ${row.min_age_months}, Max Age = ${row.max_age_months}`);
          console.log(`Reference Range: Min = ${row.min}, Max = ${row.max}`);

          // Check if the IgA value is within the range
          if (value >= row.min && value <= row.max) {
            console.log(`The ${type} value of ${value} is within the reference range for ${row.kilavuz_name}.`);
          } else {
            console.log(`The ${type} value of ${value} is outside the reference range for ${row.kilavuz_name}.`);
          }
        });
      } else {
        console.log('No matching reference range found for the given age and kilavuz.');
      }
    });
  } catch (error) {
    console.error('Error checking ${type} value:', error);
  }
}
async function getKlvzNames(db,selectedTable) {
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

    console.log('Result Object with Unique Kilavuz Names:', kilavuz_name);
  });
}catch(error){
  console.error('Error getting klvuz names:', error);
}
return kilavuz_name.uniqueKilavuzNames; // Return the array directly
}
export function Main() {
  const db = useSQLiteContext();
  const [selectedTable, setSelectedTable] = useState(TABLES[0]); // Default to the first table
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data for the selected table
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await db.withTransactionAsync(async () => {
          const statement = await db.prepareAsync(`SELECT * FROM ${selectedTable}`);
          const result = await statement.executeAsync();
          const rows = await result.getAllAsync();
          setData(rows);
        });
       
        const resultObject = {};// Initialize an empty object
        await db.withTransactionAsync(async () => {
          // Query to count unique 'kilavuz' values
          const statement = await db.prepareAsync(`SELECT COUNT(DISTINCT kilavuz_name) AS uniqueKilavuzCount FROM ${selectedTable}`);
          const result = await statement.executeAsync();
          const row = await result.getFirstAsync();
      
          if (row) {
            // Store the count in the object
            resultObject.uniqueKilavuzCount = row.uniqueKilavuzCount;
            console.log('Result Object:', resultObject);
          } else {
            console.log('No data found.');
          }
        });
       
// Example usage
const patientAgeMonths = 24; // Patient's age in months
const value = 7.66; // IgA value to check
const type = 'IgA_data';
const kilavuzNames =await getKlvzNames(db,type);// List of kilavuz names to filter by
await checkIgAByKilavuz(patientAgeMonths, value, kilavuzNames, db); // Replace `db` with your SQLite database instance      
console.log("########################################################################");
await checkByKilavuzByMinMax(type,patientAgeMonths,value,kilavuzNames,db);
      } catch (error) {
        console.error('Error fetching data from SQLite:', error);
        setData([]); // Clear data on error
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [db, selectedTable]);

  return (
    <View style={styles.container}>
      {/* Dropdown to select table */}
      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Select Table:</Text>
        <Picker
          selectedValue={selectedTable}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedTable(itemValue)}
        >
          {TABLES.map((table) => (
            <Picker.Item key={table} label={table} value={table} />
          ))}
        </Picker>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <Text>Loading data...</Text>
        </View>
      ) : data.length > 0 ? (
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              {Object.entries(item).map(([key, value]) => (
                <Text key={key}>
                  {key}: {value}
                </Text>
              ))}
            </View>
          )}
        />
      ) : (
        <View style={styles.noDataContainer}>
          <Text>No data found for the selected table.</Text>
        </View>
      )}
    </View>
  );
}

export default function DataPage() {
  return (
    <View style={styles.container}>
      <SQLiteProvider
        databaseName="immunoglobulins"
        assetSource={{ assetId: require('../assets/db/immunoglobulins.db') }}
      >
        <Main />
      </SQLiteProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  pickerContainer: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
    padding: 10,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: 'bold',
    color: '#333',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 2,
  },
});
