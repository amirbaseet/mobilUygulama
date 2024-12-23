const jsonFiles = {
  IgG1: require('../../assets/json/IgG1.json'),
  // IgG2: require('../../assets/json/IgG2.json'),
  // IgG3: require('../../assets/json/IgG3.json'),
  // IgG4: require('../../assets/json/IgG4.json'),
  // IgM: require('../../assets/json/IgM.json'),
  // IgA: require('../../assets/json/IgA.json'),
  // IgG: require('../../assets/json/IgG.json'),
};

/**
 * Load a JSON file based on its key.
 * @param {string} fileKey - The key representing the JSON file to load (e.g., 'IgG1').
 * @returns {Array} The parsed JSON content of the file.
 */
export const loadJSONFile = (fileKey) => {
  try {
    if (jsonFiles[fileKey]) {
      return jsonFiles[fileKey];
    } else {
      throw new Error(`File key "${fileKey}" not found.`);
    }
  } catch (error) {
    console.error(`Error loading JSON file for key "${fileKey}":`, error);
    return [];
  }
};