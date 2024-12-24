import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { calculateAgeInMonths } from '../src/utils/calculateAgeInMonths'; // Import the utility function

export default function AgeScreen() {
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [ageInMonths, setAgeInMonths] = useState(null);

  const handleCalculateAge = () => {
    try {
      const calculatedAge = calculateAgeInMonths(dateOfBirth);
      console.log(`dateOfBirth ${dateOfBirth}`);

      setAgeInMonths(calculatedAge);
            console.log(`Patient's Age in Months: ${calculatedAge}`); // Log to the console
            // const calculatedAgeA = calculateAgeInMonths('2003-09-03');

            // console.log(`Patient's Age in Months: ${calculatedAgeA}`); // Log to the console

    } catch (error) {
      console.error('Error calculating age:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter Date of Birth (YYYY-MM-DD):</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., 2022-01-21"
        value={dateOfBirth}
        onChangeText={setDateOfBirth}
      />
      <Button title="Calculate Age in Months" onPress={handleCalculateAge} />
      {ageInMonths !== null && (
        <Text style={styles.result}>
          Age in Months: {ageInMonths}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    width: '80%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
  },
  result: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});
