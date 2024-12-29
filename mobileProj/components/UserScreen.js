import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList ,SafeAreaView} from 'react-native';
import { auth, firestore } from '../firebase';

export default function UserScreen({ navigation }) {
  const [user, setUser] = useState(null);
  const [testResults, setTestResults] = useState([]);

  useEffect(() => {
    const currentUser = auth.currentUser;
    setUser(currentUser);

    if (currentUser) {
      fetchTestResults(currentUser.uid);
    }
  }, []);

  const fetchTestResults = async (userId) => {
    try {
      const resultsRef = firestore.collection('results');
      // const snapshot = await resultsRef.where('userId', '==', userId).get();
      const snapshot = await firestore
      .collection("results") // Specify your Firestore collection name
      .where("userId", "==", userId)
      .orderBy('createdAt', 'desc')
      .get();

      const results = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        results.push({
          id: doc.id,
          createdAt: data.createdAt,
          testValues: {
            IgA_data: data.IgA_data,
            IgG1_data: data.IgG1_data,
            IgG2_data: data.IgG2_data,
            IgG3_data: data.IgG3_data,
            IgG4_data: data.IgG4_data,
            IgG_data: data.IgG_data,
            IgM_data: data.IgM_data,
          },
        });
      });

      setTestResults(results);
    } catch (error) {
      console.error('Error fetching test results:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigation.replace('Login');
    } catch (error) {
      alert('Failed to logout: ' + error.message);
    }
  };

  const renderTestItem = ({ item }) => (
    <View style={styles.testItem}>
      <Text style={styles.testDate}>Date: {item.createdAt}</Text>
      {Object.entries(item.testValues).map(([key, value]) => (
        value !== null && (
          <Text key={key} style={styles.testValue}>
            {key}: {value}
          </Text>
        )
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome, {user?.email}</Text>

      <Text style={styles.sectionHeader}>Your Test Results</Text>
      <FlatList
        data={testResults}
        renderItem={renderTestItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text>No test results found.</Text>}
      />

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  testItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  testDate: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  testValue: {
    fontSize: 14,
    color: '#333',
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
