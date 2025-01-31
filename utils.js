import fs from 'fs/promises';

const filePath = './data.json';

export const readJSONFile = async () => {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        const jsonData = JSON.parse(data);
        // console.log('JSON Data:', jsonData);
        return jsonData
    } catch (err) {
        console.error('Error:', err);
    }
}

export const writeToFile = async (data) => {
    try {
      await fs.writeFile(filePath, data); // Write data to the file
      console.log('Data written successfully');
    } catch (error) {
      console.error('Error writing to file:', error);
      throw error; // Rethrow the error for further handling
    }
  }






