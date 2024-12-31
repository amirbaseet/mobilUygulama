import React, { useState, useEffect } from 'react';
import { SQLiteProvider, useSQLiteContext } from 'expo-sqlite';
import { View, Text, FlatList, StyleSheet,TouchableOpacity } from 'react-native';

import { Picker } from '@react-native-picker/picker';
import * as FileSystem from 'expo-file-system';


const clearDatabaseCache = async () => {
    const dbFilePath = `${FileSystem.documentDirectory}SQLite/immunoglobulins.db`;
    try {
      await FileSystem.deleteAsync(dbFilePath, { idempotent: true });
      console.log("Database cache cleared.");
  } catch (error) {
      console.error("Error clearing cache:", error);
  }
};




const TABLES = [
  'IgM_data',
  'IgA_data',
  'IgG_data',
  'IgG1_data',
  'IgG2_data',
  'IgG3_data',
  'IgG4_data',
];


export function Main() {
  const db = useSQLiteContext();
  const [selectedTable, setSelectedTable] = useState(TABLES[0]); // Default to the first table
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  // clearDatabaseCache();
  // Fetch data for the selected table
  useEffect(() => {
    // clearDatabaseCache();

    const fetchData = async () => {
      
      setLoading(true);
      try {
        await db.withTransactionAsync(async () => {
          const statement = await db.prepareAsync(`SELECT * FROM ${selectedTable} `);
          const result = await statement.executeAsync();
          const rows = await result.getAllAsync();
          setData(rows);
        });

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
      <View style={[styles.pickerContainer,{height:150}]}>
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
              <Text>age Group: {item.age_group}</Text>
              {item.min_geo || item.max_geo ? (
              <Text key="geo">geo: {item.min_geo + '-' + item.max_geo}</Text>
             ) : null}

              {item.min || item.max?(<Text>min max: {item.min +'-'+item.max }</Text>)
              :null}
             {item.min_confidence||item.max_confidence?( <Text>confidence: {item.min_confidence +'-'+item.max_confidence }</Text>
            ):null}
              <Text>kilavuz name: {item.kilavuz_name }</Text>
             
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

export default function DataPage({navigation}) {
  const handleData= ()=>{
    navigation.replace('ToDo'); // Kullanıcı Login ekranına yönlendirilir
  }
  return (
    <View style={styles.container}>
      <SQLiteProvider
        databaseName="immunoglobulins"
        assetSource={{ assetId: require('../assets/db/immunoglobulins.db') }}
      >
        <Main />
      </SQLiteProvider>
      <TouchableOpacity style={styles.logoutButton} onPress={handleData}>
              <Text style={styles.logoutButtonText}>GoHome</Text>
            </TouchableOpacity>
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
    height:300
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
  logoutButton: {
    height: 50,
    backgroundColor: '#d9534f',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 20,
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

});
