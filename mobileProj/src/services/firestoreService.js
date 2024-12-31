import {  firestore } from '../../firebase';
import {TABLES} from '../utils/Table';

export const fetchResultsByUserId = async (userId,type) => {
  if (!userId) {
    console.error("User ID is required to fetch data");
    return;
  }

  try {
    const querySnapshot = await firestore
      .collection("results") // Specify your Firestore collection name
      .where("userId", "==", userId)
      .where(type, '!=', null) // Filter results by userId
      .orderBy('createdAt', 'desc')
      .limit(2)
      .get();

    if (querySnapshot.empty) {
      console.log("No results found for this user ID.");
      return [];
    }

    const results = querySnapshot.docs.map((doc) => ({
      id: doc.id, // Include document ID if needed
      ...doc.data(), // Spread the document data
    }));

    // console.log("Fetched results:", results);
    const typeMapping = {
      [TABLES[0].table]: "IgM_data",
      [TABLES[1].table]: "IgA_data",
      [TABLES[2].table]: "IgG_data",
      [TABLES[3].table]: "IgG1_data",
      [TABLES[4].table]: "IgG2_data",
      [TABLES[5].table]: "IgG3_data",
      [TABLES[6].table]: "IgG4_data",
    };
    
    const selectedKey = typeMapping[type];
    
    if (!selectedKey) {
      console.error("Invalid type provided.");
      return [];
    }
    const resultPairs = [
      {
        value: results[0]?.[selectedKey] || null, // Safely access selectedKey in results[0]
        date: results[0]?.createdAt || null, // Safely access createdAt in results[0]
      },
      {
        value: results[1]?.[selectedKey] || null, // Safely access selectedKey in results[1]
        date: results[1]?.createdAt || null, // Safely access createdAt in results[1]
      },
    ];    console.log(`resultPairs ${resultPairs}`);
    return resultPairs;
  } catch (error) {
    console.error("Error fetching results:", error);
  }
};
export async function handleSaveToFirestore (userId,iga,igm,igg,igg1,igg2,igg3,igg4){
    if (!userId) {
      console.error("User ID is required to save data");
      return;
    }
    try {
      const now = new Date();
  // Format the date and time as 'yy-mm-dd hh:mm:ss'
  const formattedDate = `${now.getFullYear().toString().slice(-2)}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
  console.log("Formatted Date:", formattedDate);
      // Assuming you have a Firestore collection named "results"
      await firestore.collection("results").add({
        userId: userId, // Associate with a user ID
        createdAt: formattedDate, 
        IgA_data: isNaN(parseInt(iga)) ? null : parseInt(iga),
        IgM_data: isNaN(parseInt(igm)) ? null : parseInt(igm),
        IgG_data: isNaN(parseInt(igg)) ? null : parseInt(igg),
        IgG1_data: isNaN(parseInt(igg1)) ? null : parseInt(igg1),
        IgG2_data: isNaN(parseInt(igg2)) ? null : parseInt(igg2),
        IgG3_data: isNaN(parseInt(igg3)) ? null : parseInt(igg3),
        IgG4_data: isNaN(parseInt(igg4)) ? null : parseInt(igg4),
      });
      console.log("Data successfully saved to Firestore!");
    } catch (error) {
      console.error("Error saving data to Firestore:", error);
    }
  };
  