import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { firestore, auth } from '../firebase';

export default function UserResultsScreen() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const user = auth.currentUser;
        const resultsSnapshot = await firestore
          .collection('results')
          .where('userId', '==', user.uid)
          .get();

        const resultsList = resultsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setResults(resultsList);
      } catch (error) {
        alert('Failed to fetch results: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4caf50" />
        <Text style={styles.loadingText}>Loading your results...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Test Results</Text>
      {results.length > 0 ? (
        <FlatList
          data={results}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.resultItem}>
              <Text style={styles.resultType}>{item.testType}</Text>
              <Text style={styles.resultValue}>{item.testValue}</Text>
              <Text style={styles.resultDate}>
                {new Date(item.date.seconds * 1000).toLocaleDateString()}
              </Text>
            </View>
          )}
        />
      ) : (
        <Text style={styles.noResultsText}>No results found.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4caf50',
    marginBottom: 20,
  },
  resultItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  resultType: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  resultValue: {
    fontSize: 16,
    color: '#4caf50',
    marginTop: 5,
  },
  resultDate: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
  noResultsText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
});
