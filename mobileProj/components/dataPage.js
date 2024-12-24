
// import React, { useState, useEffect } from 'react';
// import { View, Text, FlatList, StyleSheet } from 'react-native';
// import * as SQLite from 'expo-sqlite';

// export default function DataScreen() {
//   const [rows, setRows] = useState([]); // State to hold all rows
//   const [firstRow, setFirstRow] = useState(null); // State to hold the first row

//   useEffect(() => {
//     const initializeDatabase = async () => {
//       try {
//         // Open SQLite database
//         const db = await SQLite.openDatabaseAsync('example.db');

//         // Create the table using `execAsync`
//         await db.execAsync(`
//           PRAGMA journal_mode = WAL;
//           CREATE TABLE IF NOT EXISTS test (
//             id INTEGER PRIMARY KEY NOT NULL,
//             value TEXT NOT NULL,
//             intValue INTEGER
//           );
//         `);

//         // Sample JSON data
//         const jsonData = [
//           { value: 'Item1', intValue: 1151511 },
//           { value: 'Item2', intValue: 222 },
//           { value: 'Item3', intValue: 333 },
//         ];

//         // Insert JSON data into the table using `map`
//         await Promise.all(
//           jsonData.map(async (item) => {
//             await db.runAsync(
//               'INSERT INTO test (value, intValue) VALUES (?, ?)',
//               item.value,
//               item.intValue
//             );
//           })
//         );

//         // Fetch the first row using `getFirstAsync`
//         const firstRow = await db.getFirstAsync('SELECT * FROM test');
//         setFirstRow(firstRow);

//         // Fetch all rows using `getAllAsync`
//         const allRows = await db.getAllAsync('SELECT * FROM test');
//         setRows(allRows);
//       } catch (error) {
//         console.error('Error initializing database:', error);
//       }
//     };

//     initializeDatabase();
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>SQLite Example</Text>

//       {firstRow && (
//         <View style={styles.firstRowContainer}>
//           <Text style={styles.firstRowTitle}>First Row:</Text>
//           <Text>ID: {firstRow.id}</Text>
//           <Text>Value: {firstRow.value}</Text>
//           <Text>IntValue: {firstRow.intValue}</Text>
//         </View>
//       )}

//       <Text style={styles.listTitle}>All Rows:</Text>
//       <FlatList
//         data={rows}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={({ item }) => (
//           <View style={styles.row}>
//             <Text>ID: {item.id}</Text>
//             <Text>Value: {item.value}</Text>
//             <Text>IntValue: {item.intValue}</Text>
//           </View>
//         )}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#f8f8f8',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   firstRowContainer: {
//     marginBottom: 20,
//     padding: 10,
//     backgroundColor: '#e8e8e8',
//     borderRadius: 8,
//   },
//   firstRowTitle: {
//     fontWeight: 'bold',
//     marginBottom: 5,
//   },
//   listTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginTop: 20,
//     marginBottom: 10,
//   },
//   row: {
//     padding: 15,
//     backgroundColor: '#fff',
//     marginBottom: 10,
//     borderRadius: 8,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 2,
//   },
// });

// import React, { useState, useEffect } from 'react';
// import { SQLiteProvider, useSQLiteContext } from 'expo-sqlite';
// import { View, Text, FlatList, StyleSheet } from 'react-native';

// export function Main() {
//   const db = useSQLiteContext();
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Query the database
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         await db.withTransactionAsync(async () => {
//           const statement = await db.prepareAsync('SELECT * FROM IgG1_data');
//           const result = await statement.executeAsync();
//           const rows = await result.getAllAsync();
//           setData(rows); // Save query results in state
//         });
//       } catch (error) {
//         console.error('Error fetching data from SQLite:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [db]);

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <Text>Loading data...</Text>
//       </View>
//     );
//   }

//   if (data.length === 0) {
//     return (
//       <View style={styles.container}>
//         <Text>No data found.</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={data}
//         keyExtractor={(item, index) => index.toString()}
//         renderItem={({ item }) => (
//           <View style={styles.card}>
//             <Text style={styles.cardTitle}>Type: {item.type}</Text>
//             <Text>Age Group: {item.age_group}</Text>
//             <Text>Max: {item.max}</Text>
//             <Text>Min: {item.min}</Text>
//             <Text>Max Confidence: {item.max_confidence}</Text>
//             <Text>Min Confidence: {item.min_confidence}</Text>
//             <Text>Number: {item.number}</Text>
//             <Text>Kılavuz Name: {item.kilavuz_name}</Text>
//           </View>
//         )}
//       />
//     </View>
//   );
// }

// export default function DataPage() {
//   return (
//     <View style={styles.container}>
//       <SQLiteProvider
//         databaseName="immunoglobulins"
//         assetSource={{ assetId: require('../assets/db/immunoglobulins.db') }}
//       >
//         <Main />
//       </SQLiteProvider>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f5f5f5',
//     padding: 20,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   card: {
//     backgroundColor: '#fff',
//     padding: 15,
//     marginVertical: 8,
//     borderRadius: 8,
//     elevation: 2,
//   },
//   cardTitle: {
//     fontWeight: 'bold',
//     fontSize: 16,
//     marginBottom: 5,
//   },
// });

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
async function checkIgA(patientAgeMonths, igaValue, db) {
  try {
    // Query the database for the appropriate age range and reference range
    await db.withTransactionAsync(async () => {
      const statement = await db.prepareAsync(`
        SELECT min_age_months, max_age_months, min, max
        FROM IgA_data
        WHERE min_age_months <= ? AND max_age_months >= ?
      `);
      const result = await statement.executeAsync([patientAgeMonths, patientAgeMonths]);
      const row = await result.getFirstAsync();

      if (row) {
        console.log(`Database Range Found: Min Age = ${row.min_age_months}, Max Age = ${row.max_age_months}`);
        console.log(`Reference Range: Min = ${row.min}, Max = ${row.max}`);

        // Check if the IgA value is within the range
        if (igaValue >= row.min && igaValue <= row.max) {
          console.log(`The IgA value of ${igaValue} is within the reference range.`);
        } else {
          console.log(`The IgA value of ${igaValue} is outside the reference range.`);
        }
      } else {
        console.log('No reference range found for the given age.');
      }
    });
  } catch (error) {
    console.error('Error checking IgA value:', error);
  }
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
        await db.withTransactionAsync(async () => {
          const statement = await db.prepareAsync(`SELECT * FROM ${selectedTable}`);
          const result = await statement.executeAsync();
          const row = await result.getFirstAsync();
          if (row && row.min_age_months !== undefined) {
            const modifiedAge = row.min_age_months + 5;
            console.log(`Original Age: ${row.min_age_months}, Modified Age: ${modifiedAge}`);
          } else {
            console.log('No age field found or no data available in the table.');
          }
        });
        const resultObject = {}; // Initialize an empty object
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
        const kilavuz_name = {}; // Initialize an empty object

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
      // Example usage
const patientAgeMonths = 25; // Patient's age in months
const igaValue = 7.66; // IgA value to check
checkIgA(patientAgeMonths, igaValue, db); // Replace `db` with your SQLite database instance

      

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
