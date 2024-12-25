import React, { useState } from 'react';
import {Platform, View, Text, TextInput, TouchableOpacity,ScrollView, StyleSheet,KeyboardAvoidingView, FlatList } from 'react-native';
import { SQLiteProvider, useSQLiteContext } from 'expo-sqlite';
import {checkTypeKilavuzByMinMax,checkTypeKilavuzByGeo,getKlvzNames} from '../src/utils/klvz';
import {calculateAgeInMonths} from '../src/utils/calculateAgeInMonths';
import DateTimePicker from '@react-native-community/datetimepicker';
const TABLES = [
  'IgM_data',
  'IgA_data',
  'IgG_data',
  'IgG1_data',
  'IgG2_data',
  'IgG3_data',
  'IgG4_data',
];


 function  GuestPage() {


   const db = useSQLiteContext();
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [ageInMonths, setAgeInMonths] = useState(0);
  const [igm, setIgm] = useState(''); // IgA value
  const [iga, setIga] = useState(''); // IgA value
  const [igg, setIgg] = useState(''); // IgA value
  const [igg1, setIgg1] = useState(''); // IgA value
  const [igg2, setIgg2] = useState(''); // IgA value
  const [igg3, setIgg3] = useState(''); // IgA value
  const [igg4, setIgg4] = useState(''); // IgA value


    const handelBD =(event,selectedDate)=>{ 
      if(selectedDate){
         setDateOfBirth(selectedDate)
         const ageInMon = calculateAgeInMonths(selectedDate);
          console.log(ageInMon)
          setAgeInMonths(ageInMon);
        }
    }
    const handlecheck=async()=>{
      const types = [];
      allResults = [];

      if(igm) types.push(TABLES[0]);
      if(iga) types.push(TABLES[1]);
      if(igg) types.push(TABLES[2]);
      if(igg1) types.push(TABLES[3]);
      if(igg2) types.push(TABLES[4]);
      if(igg3) types.push(TABLES[5]);

      if(types.length == 0){
        console.log('Tabel is null')
        return;
      }
      console.log("Hjhjhj")
       try
       { 
        for (const type of types){
          const klvzNames =  await getKlvzNames(db,type);
          console.log(klvzNames)
          const results = await checkTypeKilavuzByGeo(type,ageInMonths,iga,klvzNames,db);}
          allResults.push(...result);
        }catch(err){`Error processing type ${type}:`, error}
    allResults.forEach((evaluation)=>{
      console.log(`Founded = ${evaluation.found} The age_group: ${evaluation.age_group} ${type} value of ${value} is it in the range = ${evaluation.result} the reference range for ${evaluation.KilavuzName} 
           min = ${evaluation.DataBaseMinRange} max = ${evaluation.DataBaseMaxRange} the patientValue = ${value}.`);
    })

  }

    return(
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : null}
        >
          <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 20 }}>
            <DateTimePicker
              value={dateOfBirth}
              mode="date"
              display="default"
              onChange={handelBD}
            />
    
            <TextInput
              style={styles.input}
              placeholder="Enter IgA Value"
              keyboardType="numeric"
              value={iga}
              onChangeText={setIga}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter IgM Value"
              keyboardType="numeric"
              value={igm}
              onChangeText={setIgm}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter IgG Value"
              keyboardType="numeric"
              value={igg}
              onChangeText={setIgg}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter Igg1 Value"
              keyboardType="numeric"
              value={igg1}
              onChangeText={setIgg1}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter Igg2 Value"
              keyboardType="numeric"
              value={igg2}
              onChangeText={setIgg2}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter Igg3 Value"
              keyboardType="numeric"
              value={igg3}
              onChangeText={setIgg3}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter Igg4 Value"
              keyboardType="numeric"
              value={igg4}
              onChangeText={setIgg4}
            />
    
            <TouchableOpacity style={styles.button} onPress={handlecheck}>
              <Text style={styles.buttonText}>Check</Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      );
    

  

  
};
export default function AgeScreen({navigation}) {
  const handleData= ()=>{
    navigation.replace('ToDo'); // Kullanıcı Login ekranına yönlendirilir
  }
  return (
    <View style={styles.container}>
      <SQLiteProvider
        databaseName="immunoglobulins"
        assetSource={{ assetId: require('../assets/db/immunoglobulins.db') }}
      >
        <GuestPage />
      </SQLiteProvider>
      <TouchableOpacity style={styles.logoutButton} onPress={handleData}>
              <Text style={styles.logoutButtonText}>GoData</Text>
            </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  inputSmall: {
    flex: 1,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    marginHorizontal: 5,
  },
  button: {
    height: 50,
    backgroundColor: '#4caf50',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  resultItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  resultText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultDetails: {
    fontSize: 14,
    color: 'gray',
  },
});
