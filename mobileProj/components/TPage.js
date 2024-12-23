// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   FlatList,
//   Alert,
// } from 'react-native';
// import { auth } from '../firebase';
// import * as SQLite from 'expo-sqlite';

// // Open the SQLite database
// let db;

// async function openDatabase() {
//   db = SQLite.openDatabase('example.db');
// }

// export default function DataScreen({ navigation }) {
//   const [todo, setTodo] = useState('');
//   const [todos, setTodos] = useState([]);
//   const [totalTasks, setTotalTasks] = useState(0);
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const currentUser = auth.currentUser;
//     setUser(currentUser);

//     const setupDatabase = async () => {
//       await openDatabase();

//       db.transaction((tx) => {
//         tx.executeSql(
//           `CREATE TABLE IF NOT EXISTS todos (
//             id INTEGER PRIMARY KEY AUTOINCREMENT, 
//             title TEXT NOT NULL,
//             done INTEGER DEFAULT 0
//           );`,
//           [],
//           () => {
//             console.log('Table created successfully');
//             fetchTodos();
//           },
//           (_, error) => {
//             console.log('Error creating table: ', error);
//           }
//         );
//       });
//     };

//     setupDatabase();
//   }, []);

//   const fetchTodos = () => {
//     db.transaction((tx) => {
//       tx.executeSql(
//         'SELECT * FROM todos;',
//         [],
//         (_, { rows }) => {
//           setTodos(rows._array);
//           setTotalTasks(rows._array.length);
//         },
//         (_, error) => {
//           console.log('Error fetching todos: ', error);
//         }
//       );
//     });
//   };

//   const addTodo = () => {
//     if (todo.trim() === '') {
//       Alert.alert('Error', 'Please enter a task');
//       return;
//     }

//     db.transaction((tx) => {
//       tx.executeSql(
//         'INSERT INTO todos (title, done) VALUES (?, 0);',
//         [todo],
//         () => {
//           setTodo('');
//           fetchTodos();
//         },
//         (_, error) => {
//           console.log('Error adding todo: ', error);
//         }
//       );
//     });
//   };

//   const deleteTodo = (id) => {
//     db.transaction((tx) => {
//       tx.executeSql(
//         'DELETE FROM todos WHERE id = ?;',
//         [id],
//         () => {
//           fetchTodos();
//         },
//         (_, error) => {
//           console.log('Error deleting todo: ', error);
//         }
//       );
//     });
//   };

//   const toggleTodoStatus = (id, currentStatus) => {
//     const newStatus = currentStatus === 0 ? 1 : 0;

//     db.transaction((tx) => {
//       tx.executeSql(
//         'UPDATE todos SET done = ? WHERE id = ?;',
//         [newStatus, id],
//         () => {
//           fetchTodos();
//         },
//         (_, error) => {
//           console.log('Error toggling todo status: ', error);
//         }
//       );
//     });
//   };

//   const handleLogout = async () => {
//     try {
//       await auth.signOut();
//       navigation.replace('Login');
//     } catch (error) {
//       Alert.alert('Error', `Failed to logout: ${error.message}`);
//     }
//   };

//   const navigateToToDoScreen = () => {
//     navigation.replace('ToDo');
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.welcomeText}>Welcome, {user?.email}</Text>

//       <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
//         <Text style={styles.logoutButtonText}>Logout</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.logoutButton} onPress={navigateToToDoScreen}>
//         <Text style={styles.logoutButtonText}>Go To To-Do</Text>
//       </TouchableOpacity>

//       <Text style={styles.title}>SQLite To-Do List</Text>

//       <View style={styles.inputContainer}>
//         <TextInput
//           style={styles.input}
//           placeholder="Add New Task"
//           value={todo}
//           onChangeText={setTodo}
//         />
//         <TouchableOpacity style={styles.addButton} onPress={addTodo}>
//           <Text style={styles.addButtonText}>Add</Text>
//         </TouchableOpacity>
//       </View>

//       <FlatList
//         data={todos}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={({ item }) => (
//           <View style={styles.todoItem}>
//             <Text
//               style={[
//                 styles.todoText,
//                 item.done === 1 && styles.todoTextDone,
//               ]}
//             >
//               {item.title}
//             </Text>
//             <TouchableOpacity
//               style={[
//                 styles.statusButton,
//                 item.done === 1 ? styles.statusDone : styles.statusNotDone,
//               ]}
//               onPress={() => toggleTodoStatus(item.id, item.done)}
//             >
//               <Text style={styles.statusButtonText}>
//                 {item.done === 1 ? 'Mark as Undone' : 'Mark as Done'}
//               </Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={styles.deleteButton}
//               onPress={() => deleteTodo(item.id)}
//             >
//               <Text style={styles.deleteButtonText}>Delete</Text>
//             </TouchableOpacity>
//           </View>
//         )}
//       />

//       <View style={styles.footer}>
//         <Text style={styles.footerText}>Total Tasks: {totalTasks}</Text>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   // Your styles remain the same as provided
// });
