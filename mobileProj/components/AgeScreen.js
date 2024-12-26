import React, { useState } from 'react';
import {Platform, View, Text, TextInput, TouchableOpacity,ScrollView, StyleSheet,KeyboardAvoidingView, FlatList } from 'react-native';
import { SQLiteProvider, useSQLiteContext } from 'expo-sqlite';
import {checkTypeKilavuzByMinMax,checkTypeKilavuzByGeo,getKlvzNames} from '../src/utils/klvz';
import calculateAgeInMonths from '../src/utils/calculateAgeInMonths';
import DateTimePicker from '@react-native-community/datetimepicker';
const TABLES = [
  {table:'IgM_data',type:'IgM'},
  {table:'IgA_data'  ,type:'IgA'},
  {table:'IgG_data'  ,type:'IgG'},
  {table:'IgG1_data' ,type:'IgG1'},
  {table:'IgG2_data' ,type:'IgG2'},
  {table:'IgG3_data' ,type:'IgG3'},
  {table:'IgG4_data' ,type:'IgG4'},
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
  const [results, setResults] = useState([]); // Store evaluation results


    const handelBD =(event,selectedDate)=>{ 
      if(selectedDate){
         setDateOfBirth(selectedDate)
         const ageInMon = calculateAgeInMonths(selectedDate);
          console.log(ageInMon)
          const agein=setAgeInMonths(ageInMon);
          console.log(`\nMONTHOS AGE ${ageInMon}`)
        }
    }
    const handlecheck=async()=>{
      const types = [];
      const allResults = [];

      if(igm) types.push(TABLES[0]);
      if(iga) types.push(TABLES[1]);
      if(igg) types.push(TABLES[2]);
      if(igg1) types.push(TABLES[3]);
      if(igg2) types.push(TABLES[4]);
      if(igg3) types.push(TABLES[5]);
      if(igg4) types.push(TABLES[6]);

      if(types.length == 0){
        console.log('Tabel is null')
        setResults([]);

        return;
      }
       try
       { 
        for (const type of types){
          const klvzNames =  await getKlvzNames(db,type.table);
          // console.log(klvzNames)
          let value;
          if (type.type === TABLES[0].type)  value = igm;
          if (type.type === TABLES[1].type)  value = iga;
          if (type.type === TABLES[2].type)  value = igg;
          if (type.type === TABLES[3].type)  value = igg1;
          if (type.type === TABLES[4].type)  value = igg2;
          if (type.type === TABLES[5].type)  value = igg3;
          if (type.type === TABLES[6].type)  value = igg4;
            

          // const results = await checkTypeKilavuzByGeo(type.table,ageInMonths,value,klvzNames,db);
          const results = await checkTypeKilavuzByMinMax(type.table,ageInMonths,value,klvzNames,db);
          allResults.push(...results);
          const resultsBygeo =await checkTypeKilavuzByGeo(type.table,ageInMonths,value,klvzNames,db);
          allResults.push(...resultsBygeo);

          // Update state with results
          setResults(allResults);
          console.log(`results.length = ${results.length}`)
          results.forEach((evaluation)=>{
            console.log(`Founded = ${evaluation.found} The age_group: ${evaluation.age_group} ${type} value of ${value} is it in the range = ${evaluation.result} the reference range for ${evaluation.KilavuzName} 
                 min = ${evaluation.DataBaseMinRange} max = ${evaluation.DataBaseMaxRange} the patientValue = ${value}.`);
          })
      
          // console.log(`const results = await checkTypeKilavuzByGeo(type.table = ${type.table},ageInMonths= ${ageInMonths},value = ${value},klvzNames= ${klvzNames},db =${db});`)
          // console.log(results.length)
          // results.forEach((evaluation)=>{
          //   console.log(evaluation)
          //   console.log(`Founded = ${evaluation.found} The age_group: ${evaluation.age_group} ${type} value of ${value} is it in the range = ${evaluation.result} the reference range for ${evaluation.KilavuzName} 
          //        min = ${evaluation.DataBaseMinRange} max = ${evaluation.DataBaseMaxRange} the patientValue = ${value}.`);
          // });
        }


        }catch(err){`Error processing type ${type}:`, error}
    
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

<FlatList
  data={results}
  keyExtractor={(item, index) => index.toString()}
  renderItem={({ item }) => (
    <View style={styles.resultItem}>
      <Text style={styles.resultText}>testType: {item.testType}</Text>
      <Text style={styles.resultText}>KilavuzName: {item.KilavuzName}</Text>
      <Text style={[styles.resultText, { color: item.result ? 'green' : 'red' }]}>
        Result: {item.result ? 'In Range' : 'Out of Range'}
      </Text>
      <Text style={styles.resultText}>type: {item.type}</Text>
      <Text style={styles.resultDetails}>Age Group: {item.age_group}</Text>
      <Text style={styles.resultDetails}>Value: {item.value}</Text>
      <Text style={styles.resultDetails}>
        Reference Range: {item.DataBaseMinRange} - {item.DataBaseMaxRange}
      </Text>
      <Text style={[styles.resultDetails, { color: item.isLower ? 'red' : 'green' }]}>
        isLower: {item.isLower ? 'true' : 'false'}
      </Text>
      <Text style={[styles.resultDetails, { color: item.isHigher ? 'red' : 'green' }]}>
        isHigher: {item.isHigher ? 'true' : 'false'}
      </Text>
    </View>
  )}
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
