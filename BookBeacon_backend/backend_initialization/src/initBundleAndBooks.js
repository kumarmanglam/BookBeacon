const books = require("./data/mock_data.json")
const fs = require("fs");
function modifyAndTransform(arr) {
    const bundleMap = new Map();
    arr.forEach(item => {
        if (!bundleMap.has(item.bundle_id)) {
            bundleMap.set(item.bundle_id, {
                bundle_id: item.bundle_id,
                bundle_Name: item.bundle_Name,
                booksInBundle: []
            });
        }
        bundleMap.get(item.bundle_id).booksInBundle.push({
            book_name: item.book_name,
            book_id: item.book_id,
            is_Premium: item.is_Premium
        });
    });
    return Array.from(bundleMap.values());
}

const jsonFilePath = './book/bundleAndBook.json';

fs.writeFileSync(jsonFilePath, JSON.stringify(modifyAndTransform(books), null, 2), 'utf-8');