//make json file from mock_data.csv
const csv = require('csvtojson');
const fs = require('fs');

// Path to your CSV file
const csvFilePath = './data/mock_data.csv';

// Output JSON file path
const jsonFilePath = './data/raw_data.json';

csv()
    .fromFile(csvFilePath)
    .then((jsonObjArray) => {
        const normalizedArray = jsonObjArray.map((obj) => {
            return {
                id: parseInt(obj['id']),
                bundle_id: parseInt(obj['Bundle id']),
                book_name: obj['Book name'],
                book_id: parseInt(obj['Book id']),
                is_Premium: obj['is Premium'] == "TRUE",
                bundle_name: obj['Bundle Name'],
            };
        });

        fs.writeFileSync(jsonFilePath, JSON.stringify(normalizedArray, null, 2), 'utf-8');
        console.log("CSV successfully converted to normalized JSON!");
    })
    .catch((error) => {
        console.error("Error during CSV to JSON conversion:", error);
    });

