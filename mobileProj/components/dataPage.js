
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import * as SQLite from 'expo-sqlite';

export default function App() {
  const [rows, setRows] = useState([]); // State to hold all rows
  const [firstRow, setFirstRow] = useState(null); // State to hold the first row

  useEffect(() => {
    const initializeDatabase = async () => {
      try {
        // Open SQLite database
        const db = await SQLite.openDatabaseAsync('example.db');

        // Create the table using `execAsync`
        await db.execAsync(`
          PRAGMA journal_mode = WAL;
          CREATE TABLE IF NOT EXISTS test (
            id INTEGER PRIMARY KEY NOT NULL,
            value TEXT NOT NULL,
            intValue INTEGER
          );
        `);

        // Sample JSON data
        const jsonData = [
          { value: 'Item1', intValue: 1151511 },
          { value: 'Item2', intValue: 222 },
          { value: 'Item3', intValue: 333 },
        ];

        // Insert JSON data into the table using `map`
        await Promise.all(
          jsonData.map(async (item) => {
            await db.runAsync(
              'INSERT INTO test (value, intValue) VALUES (?, ?)',
              item.value,
              item.intValue
            );
          })
        );

        // Fetch the first row using `getFirstAsync`
        const firstRow = await db.getFirstAsync('SELECT * FROM test');
        setFirstRow(firstRow);

        // Fetch all rows using `getAllAsync`
        const allRows = await db.getAllAsync('SELECT * FROM test');
        setRows(allRows);
      } catch (error) {
        console.error('Error initializing database:', error);
      }
    };

    initializeDatabase();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SQLite Example</Text>

      {firstRow && (
        <View style={styles.firstRowContainer}>
          <Text style={styles.firstRowTitle}>First Row:</Text>
          <Text>ID: {firstRow.id}</Text>
          <Text>Value: {firstRow.value}</Text>
          <Text>IntValue: {firstRow.intValue}</Text>
        </View>
      )}

      <Text style={styles.listTitle}>All Rows:</Text>
      <FlatList
        data={rows}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text>ID: {item.id}</Text>
            <Text>Value: {item.value}</Text>
            <Text>IntValue: {item.intValue}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  firstRowContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#e8e8e8',
    borderRadius: 8,
  },
  firstRowTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  listTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  row: {
    padding: 15,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
});



