import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { auth, firestore } from '../firebase';
import calculateAgeInMonths from '../src/utils/calculateAgeInMonths';
export default function ToDoScreen({ navigation }) {

  const [user, setUser] = useState(null);
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [ageInMonths, setAgeInMonths] = useState(null);

  
  
  useEffect(() => {
    const currentUser = auth.currentUser;
    setUser(currentUser);

    if (currentUser) {
      // Fetch user data from Firestore
      firestore.collection('users').where('userId', '==', currentUser.uid).get()
        .then(snapshot => {
          if (!snapshot.empty) {
            const userData = snapshot.docs[0].data();
            setDateOfBirth(userData.dateOfBirth);
              console.log(`setDateOfBirth(${userData.dateOfBirth})`)
            // Calculate age in months
            const age = calculateAgeInMonths(`20${userData.dateOfBirth}`); // Convert to valid full date format
            setAgeInMonths(age);
          }
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        });
      }
  }, []);

    
  const handleData= ()=>{
    navigation.replace('Data'); // Kullanıcı Login ekranına yönlendirilir
  }



  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigation.replace('Login'); // Kullanıcı Login ekranına yönlendirilir
    } catch (error) {
      alert('Failed to logout: ' + error.message);
    }
  };

  return (
    <View style={styles.container}>
      
       <Text style={styles.welcomeText}>Welcome, {user?.email}</Text>
       {/* {dateOfBirth && <Text style={styles.infoText}>Date of Birth: {dateOfBirth}</Text>} */}
        {/* {ageInMonths !== null && <Text style={styles.infoText}>Age in Months: {ageInMonths}</Text>} */}


      <View style={{flex:1,justifyContent:'center'}}>

      <View style={{flexWrap:'nowrap',flexDirection:'row' ,justifyContent:'space-between'}}>
        <TouchableOpacity style={styles.Button} onPress={()=>{  navigation.replace('Age');}}>
        <Text style={styles.logoutButtonText}>check Guest </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.Button} onPress={()=>{  navigation.replace('AddResultScreen');}}>
        <Text style={styles.logoutButtonText}>check User</Text>
      </TouchableOpacity>
        </View>


        <View style={{flexWrap:'nowrap',flexDirection:'row' ,justifyContent:'space-between'}}>
        <TouchableOpacity style={styles.Button} onPress={handleData}>
        <Text style={styles.logoutButtonText}>Kilavuz</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.Button} onPress={()=>{  navigation.replace('EnterDataScreen');}}>
        <Text style={styles.logoutButtonText}>Enter Kilavuz</Text>
      </TouchableOpacity>
        </View>
  
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>


      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  welcomeText: {
    marginTop:30,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    marginRight: 10,
  },
  button: {
    height: 50,
    backgroundColor: '#4caf50',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  todoItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  todoText: {
    fontSize: 16,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkButton: {
    marginHorizontal: 10,
  },
  checkText: {
    fontSize: 18,
  },
  deleteButton: {
    marginHorizontal: 10,
  },
  deleteText: {
    fontSize: 18,
    color: 'red',
  },
  logoutButton: {
    height: 50,
    backgroundColor: '#d9534f',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 20,
  },
  Button: {
    height: 50,
    width: 160,
    backgroundColor: 'green',
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