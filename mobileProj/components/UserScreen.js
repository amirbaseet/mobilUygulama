import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { auth, firestore } from '../firebase';

export default function UserScreen({Navigation}){
   
      const [user, setUser] = useState(null);
    useEffect(() => {
        const currentUser = auth.currentUser;
        setUser(currentUser);
      }, []);
      const handleLogout = async () => {
        try {
          await auth.signOut();
          navigation.replace('Login'); // Kullanıcı Login ekranına yönlendirilir
        } catch (error) {
          alert('Failed to logout: ' + error.message);
        }
      };

      return(
        <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome, {user?.email}</Text>
      <Text style={styles.Role}>Welcome, {user?.Role}</Text>


        </View>
      )
}