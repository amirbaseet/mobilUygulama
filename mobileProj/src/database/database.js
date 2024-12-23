import sqlite from 'react-native-sqlite-storage';

const db = sqlite.openDatabase({name:'Immunoglobulin.db', location:'default'});

export default db;