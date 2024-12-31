import React, { useState } from 'react';
import {Platform,Keyboard, View,SectionList, Text, TextInput, TouchableOpacity, StyleSheet,KeyboardAvoidingView,SafeAreaView} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import _ from 'lodash'; // Import lodash for grouping
import { SQLiteProvider, useSQLiteContext } from 'expo-sqlite';
import {getTabletable,TABLES} from '../src/utils/Table';
import {checkUlatimate} from '../src/utils/klvz';
import {getKlvzNames} from '../src/services/dbLiteService';
import calculateAgeInMonths,{convertMonthsToYears} from '../src/utils/calculateAgeInMonths';



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
  const [Uresults, UsetResults] = useState([]); // Store evaluation results
  const [UgroupedResults, setUGroupedResults] = useState({});
  const [showPicker, setShowPicker] = useState(false);


    const handelBD =(event,selectedDate)=>{ 
      if(selectedDate){
        setShowPicker(false); // Hide the picker
         setDateOfBirth(selectedDate)
         const ageInMon = calculateAgeInMonths(selectedDate);
          console.log(ageInMon)
          setAgeInMonths(ageInMon);
        }
    }
    const handlecheck=async()=>{
      Keyboard.dismiss();

      const types = [];
      const allUResults = [];
      
      if(igm) types.push(TABLES[0]);
      if(iga) types.push(TABLES[1]);
      if(igg) types.push(TABLES[2]);
      if(igg1) types.push(TABLES[3]);
      if(igg2) types.push(TABLES[4]);
      if(igg3) types.push(TABLES[5]);
      if(igg4) types.push(TABLES[6]);

      if(types.length == 0){
        console.log('Tabel is null')
        UsetResults([]);
        setUGroupedResults({});
        return;
      }
       try
       { 
        for (const type of types){
          const klvzNames =  await getKlvzNames(db,type.table);
          let value;
          if (type.type === TABLES[0].type)  value = igm;
          if (type.type === TABLES[1].type)  value = iga;
          if (type.type === TABLES[2].type)  value = igg;
          if (type.type === TABLES[3].type)  value = igg1;
          if (type.type === TABLES[4].type)  value = igg2;
          if (type.type === TABLES[5].type)  value = igg3;
          if (type.type === TABLES[6].type)  value = igg4;
            
          // value = value * 100;
          const ultimateResults = await checkUlatimate(type.table,ageInMonths,value,klvzNames,db);
          // console.log('Ultimate Results:', ultimateResults);
          allUResults.push(...ultimateResults);
          UsetResults(allUResults);
          const UgroupedResults=_.groupBy(allUResults,'kilavuzName');
          setUGroupedResults(UgroupedResults)
        }
        }catch(err){`Error processing type ${type}:`, error}
    
  }

    return(
        <KeyboardAvoidingView
          style={{ flex: 1 } }
          behavior={Platform.OS === 'ios' ? 'padding' : null}
        >
          
         
          <View style={[{justifyContent:'center',alignItems:'center',flexDirection:'row',padding: 40}]}>
         
            <Text  >Enter the dateOfBirth</Text>
            <View>
  <TouchableOpacity onPress={() => setShowPicker(true)}>
    <Text style={{ color: 'green' }}>Select Date of Birth</Text>
  </TouchableOpacity>
  {showPicker && (
    <DateTimePicker
      value={dateOfBirth}
      mode="date"
      display="default"
      onChange={handelBD}
    />
  )}
</View>
            <Text>/{convertMonthsToYears(ageInMonths)}</Text>

            </View>
          <View style={[styles.inputRow]}>
         
            <TextInput
              style={styles.input}
              placeholder="IgA"
              keyboardType="numeric"
              value={iga}
              onChangeText={setIga}
            />
            <TextInput
              style={styles.input}
              placeholder="IgM"
              keyboardType="numeric"
              value={igm}
              onChangeText={setIgm}
            />
            <TextInput
              style={styles.input}
              placeholder="IgG"
              keyboardType="numeric"
              value={igg}
              onChangeText={setIgg}
            />
            <TextInput
              style={styles.input}
              placeholder="IgG1"
              keyboardType="numeric"
              value={igg1}
              onChangeText={setIgg1}
            />

           
</View>
<View style={[styles.inputRow]} >
            <TextInput
              style={styles.input}
              placeholder="IgG2"
              keyboardType="numeric"
              value={igg2}
              onChangeText={setIgg2}
            />
            <TextInput
              style={styles.input}
              placeholder="IgG3"
              keyboardType="numeric"
              value={igg3}
              onChangeText={setIgg3}
            />
            <TextInput
              style={styles.input}
              placeholder="IgG4"
              keyboardType="numeric"
              value={igg4}
              onChangeText={setIgg4}
            />
              <TouchableOpacity style={[styles.button]} onPress={handlecheck}>
              <Text style={styles.buttonText}>Check</Text>
            </TouchableOpacity>
</View>

<SafeAreaView style={{flex:1}}>
      {Object.keys(UgroupedResults).length === 0 ? (
        <Text style={{ textAlign: 'center', marginTop: 20 }}>No results found</Text>
      ) : (
        <SectionList
          sections={Object.keys(UgroupedResults).map((key) => ({
            title: key, // Group header (KilavuzName)
            data: UgroupedResults[key], // Group items
          }))}
          keyExtractor={(item, index) => item.id || `${item.type}-${index}`}
          renderSectionHeader={({ section }) => (
            <Text style={styles.groupHeader}>{section.title}</Text>
          )}
          renderItem={({ item }) => (
            <View style={styles.resultItem}>
              {/* Main Result Text */}
              <Text style={styles.resultText}>
                {`IG${getTabletable(item.type).char}{${item.value}}   ${item.age_group}`}
              </Text>

              {/* Geo Validation */}
              {item.checkedByGeo ? (
                <Text
                  style={[
                    styles.resultDetails,
                    { color: item.resultGeo ? 'green' : 'red' },
                  ]}
                >
                  {`${item.isLowerGeo ? '↓' : ''}${item.DataBaseMinGeoRange} ${
                    item.resultGeo ? '↔' : '-'
                  } ${item.DataBaseMaxGeoRange} ${item.isHigherGeo ? '↑' : ''} Geometrik`}
                </Text>
              ) : null}

              {/* MinMax Validation */}
              {item.checkedByminmax ? (
                <Text
                  style={[
                    styles.resultDetails,
                    { color: item.resultMinMax ? 'green' : 'red' },
                  ]}
                >
                  {`${item.isLowerMinMax ? '↓' : ''}${item.DataBaseMinRange} ${
                    item.resultMinMax ? '↔' : '-'
                  } ${item.DataBaseMaxRange} ${item.isHigherMinMax ? '↑' : ''} minmax`}
                </Text>
              ) : null}

              {/* Confidence Validation */}
              {item.checkedByConf ? (
                <Text
                  style={[
                    styles.resultDetails,
                    { color: item.resultConf ? 'green' : 'red' },
                  ]}
                >
                  {`${item.isLowerConf ? '↓' : ''}${item.DataBaseMinRangeconf} ${
                    item.resultConf ? '↔' : '-'
                  } ${item.DataBaseMaxRangeconf} ${item.isHigherConf ? '↑' : ''} Conf`}
                </Text>
              ) : null}
            </View>
          )}
          ListEmptyComponent={
            <Text style={{ textAlign: 'center', marginTop: 20 }}>No results found</Text>
          }
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
      </SafeAreaView>
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
      <TouchableOpacity style={styles.button} onPress={handleData}>
              <Text style={styles.logoutButtonText}>back</Text>
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


  inputRow:{
    flexWrap:'wrap',
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems:'center',
  },
  input: {
    height: 50,
    width: 80,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  
  button: {
    height: 45,
    width: 70,
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
  logoutButtonText: {
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
    fontSize: 14,
    fontWeight: 'bold',
  },
  resultDetails: {
    fontSize: 14,
    color:'grey',
    textAlign:'right'
  },
  groupContainer: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#e6e6e6', // Light background for group container
    borderRadius: 8,
  },
  groupHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign:'left',
  },
  resultItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginVertical: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  resultText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  resultDetails: {
    fontSize: 14,
    color: 'grey',
  },
  
});