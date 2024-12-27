import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView ,Platform,SafeAreaView} from 'react-native';
import RNPickerSelect from "react-native-picker-select";
import * as SQLite from 'expo-sqlite';

const TABLES = [
  { table: 'IgM_data', type: 'IgM' },
  { table: 'IgA_data', type: 'IgA' },
  { table: 'IgG_data', type: 'IgG' },
  { table: 'IgG1_data', type: 'IgG1' },
  { table: 'IgG2_data', type: 'IgG2' },
  { table: 'IgG3_data', type: 'IgG3' },
  { table: 'IgG4_data', type: 'IgG4' },
];
const table = ['IgM','IgA','IgG','IgG1','IgG2','IgG3','IgG4']
export function getTableName(input){
  const tabelName = TABLES.find((item) => item.type === input);
  return tabelName;
}
async function insertDataInto(type, db, data) {
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

export default function EnterDataScreen({navigation}) {
  const handleData= ()=>{
    navigation.replace('ToDo'); // Kullanıcı Login ekranına yönlendirilir
  }
  const [formData, setFormData] = useState({
    age_group: '',
    kilavuz_name: '',
    min_age_months: '',
    max_age_months: '',
    min_geo: '',
    max_geo: '',
    min_mean_sd: '',
    max_mean_sd: '',
    min: '',
    max: '',
    min_confidence: '',
    max_confidence: '',
  });

  const [selectedTable, setSelectedTable] = useState(table[0]); // Default to the first table

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };
  
  const handleSubmit = async () => {
    try {
      const db = await SQLite.openDatabaseAsync('immunoglobulins');
      await insertDataInto(getTableName(selectedTable).table, db, {
        ...formData,
        min_age_months: parseFloat(formData.min_age_months) || null,
        max_age_months: parseFloat(formData.max_age_months) || null,
        number: parseFloat(formData.number) || 0,
        min_geo: parseFloat(formData.min_geo) || null,
        max_geo: parseFloat(formData.max_geo) || null,
        min_mean_sd: parseFloat(formData.min_mean_sd) || null,
        max_mean_sd: parseFloat(formData.max_mean_sd) || null,
        min: parseFloat(formData.min) || null,
        max: parseFloat(formData.max) || null,
        min_confidence: parseFloat(formData.min_confidence) || null,
        max_confidence: parseFloat(formData.max_confidence) || null,
        type:selectedTable,
      });
      alert('Data inserted successfully!');
    } catch (error) {
      console.error('Error inserting data:', error);
    }
  };
 // Grouping form fields into pairs for two inputs per row
 const groupedFields = Object.keys(formData).reduce((acc, key, index) => {
  if (index % 2 === 0) acc.push([key]); // Start a new row
  else acc[acc.length - 1].push(key); // Add to the current row
  return acc;
}, []);
return (
  <SafeAreaView style={styles.container}>
  <ScrollView contentContainerStyle={styles.container}>
    <Text style={styles.title}>Enter Data</Text>
 {/* RNPickerSelect */}
 <View style={styles.pickerContainer}>
        <Text style={styles.label}>Select Table</Text>
        <RNPickerSelect
          onValueChange={(value) => {
            setSelectedTable(value)
            console.log(`selectedTable = ${getTableName(selectedTable).table}`)
          }}
          items={table.map((item) => ({ label: item, value: item }))}
          value={selectedTable}
          style={pickerSelectStyles}
        />
      </View>
    {/* Form Fields - Two Inputs Per Row */}
    {groupedFields.map((fields, rowIndex) => (
      <View key={rowIndex} style={styles.row}>
        {fields.map((field) => (
          <TextInput
            key={field}
            style={styles.input}
            placeholder={field.replace(/_/g, " ")}
            value={formData[field]}
            onChangeText={(value) => handleInputChange(field, value)}
            keyboardType={
              ["min_age_months", "max_age_months", "number", "min", "max"].includes(field)
                ? "numeric"
                : "default"
            }
          />
        ))}
      </View>
    ))}

    {/* Submit Button */}
    <TouchableOpacity style={styles.button} onPress={handleSubmit}>
      <Text style={styles.buttonText}>Submit</Text>
        
    </TouchableOpacity>
    <TouchableOpacity style={styles.logoutButton} onPress={handleData}>
                    <Text style={styles.logoutButtonText}>GoData</Text>
                  </TouchableOpacity>
  </ScrollView>
  </SafeAreaView>
);}


const styles = StyleSheet.create({
  container: {
    flex:1,
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  pickerContainer: {
    marginBottom: 20,
    paddingVertical: 20, // Ensures sufficient touchable area
    backgroundColor: "#fff",
    borderRadius: 5,
    borderColor: "#ccc",
    borderWidth: 1,
    color:'black',
  },
  pickerWrapper: {
    marginBottom: 20,
    paddingVertical: 12, // Makes touchable area larger
    backgroundColor: "#fff",
    borderRadius: 5,
    borderColor: "#ccc",
    borderWidth: 1,
    zIndex: 1, // Ensures picker is on top of other components
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: "#333",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: "#fff",
    borderRadius: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    marginHorizontal: 5,
  },
  button: {
    height: 45,
    backgroundColor: "#4caf50",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
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

// Styles specific to RNPickerSelect
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    color: "black",
    backgroundColor: "#fff",
    marginBottom: 10,
    minHeight: 40, // Ensure touchable height
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    color: "black",
    backgroundColor: "#fff",
    marginBottom: 10,
    minHeight: 40, // Ensure touchable height
  },
});