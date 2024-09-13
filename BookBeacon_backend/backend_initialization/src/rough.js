const books = [
    {
        "id": 1,
        "bundle_id": 19,
        "book_name": "Decatur HI-Way Airfield",
        "book_id": 844710162,
        "is_Premium": false,
        "bundle_Name": "ariddles24"
    },
    {
        "id": 2,
        "bundle_id": 8,
        "book_name": "Hasvik Airport",
        "book_id": 438226157,
        "is_Premium": false,
        "bundle_Name": "ngilderoyy"
    },
    {
        "id": 3,
        "bundle_id": 18,
        "book_name": "Hammerfest Airport",
        "book_id": 406808092,
        "is_Premium": true,
        "bundle_Name": "kbrandi0"
    },
    {
        "id": 4,
        "bundle_id": 13,
        "book_name": "Xewkija Heliport",
        "book_id": 248344238,
        "is_Premium": true,
        "bundle_Name": "bgariff3"
    },
    {
        "id": 5,
        "bundle_id": 1,
        "book_name": "Amderma Airport",
        "book_id": 43778955,
        "is_Premium": true,
        "bundle_Name": "ramorta"
    },
    {
        "id": 6,
        "bundle_id": 18,
        "book_name": "Virginia Tech Montgomery Executive Airport",
        "book_id": 743918925,
        "is_Premium": true,
        "bundle_Name": "kbrandi0"
    },
    {
        "id": 7,
        "bundle_id": 5,
        "book_name": "Badu Island Airport",
        "book_id": 996338447,
        "is_Premium": true,
        "bundle_Name": "lironl"
    },
    {
        "id": 8,
        "bundle_id": 16,
        "book_name": "Zhukovsky International Airport",
        "book_id": 637484593,
        "is_Premium": true,
        "bundle_Name": "cmeir1"
    },
    {
        "id": 9,
        "bundle_id": 19,
        "book_name": "Rajahmundry Airport",
        "book_id": 534527516,
        "is_Premium": true,
        "bundle_Name": "ariddles24"
    },
    {
        "id": 10,
        "bundle_id": 13,
        "book_name": "Billy Bishop Toronto City Centre Airport",
        "book_id": 842753290,
        "is_Premium": false,
        "bundle_Name": "bgariff3"
    },
    {
        "id": 11,
        "bundle_id": 3,
        "book_name": "Agartala Airport",
        "book_id": 22883907,
        "is_Premium": false,
        "bundle_Name": "msuthren6"
    },
    {
        "id": 12,
        "bundle_id": 1,
        "book_name": "Yeniseysk Airport",
        "book_id": 984080306,
        "is_Premium": true,
        "bundle_Name": "ramorta"
    },
    {
        "id": 13,
        "bundle_id": 18,
        "book_name": "Columbus Lowndes County Airport",
        "book_id": 311838226,
        "is_Premium": false,
        "bundle_Name": "kbrandi0"
    },
    {
        "id": 14,
        "bundle_id": 11,
        "book_name": "Pattaya Airpark",
        "book_id": 334687370,
        "is_Premium": false,
        "bundle_Name": "smccooked"
    },
    {
        "id": 15,
        "bundle_id": 13,
        "book_name": "Ie Jima Airport",
        "book_id": 151388832,
        "is_Premium": false,
        "bundle_Name": "bgariff3"
    },
    {
        "id": 16,
        "bundle_id": 13,
        "book_name": "Aitape Airport",
        "book_id": 973060427,
        "is_Premium": true,
        "bundle_Name": "bgariff3"
    },
    {
        "id": 17,
        "bundle_id": 20,
        "book_name": "Talkeetna Airport",
        "book_id": 774742502,
        "is_Premium": false,
        "bundle_Name": "rvickerstaffb"
    },
    {
        "id": 18,
        "bundle_id": 11,
        "book_name": "Quetzalcóatl International Airport",
        "book_id": 396780716,
        "is_Premium": false,
        "bundle_Name": "smccooked"
    },
    {
        "id": 19,
        "bundle_id": 18,
        "book_name": "Ağrı Airport",
        "book_id": 72782946,
        "is_Premium": false,
        "bundle_Name": "kbrandi0"
    },
    {
        "id": 20,
        "bundle_id": 4,
        "book_name": "Mörön Airport",
        "book_id": 808662698,
        "is_Premium": false,
        "bundle_Name": "jtonner2"
    },
    {
        "id": 21,
        "bundle_id": 5,
        "book_name": "Kebar Airport",
        "book_id": 644152828,
        "is_Premium": true,
        "bundle_Name": "lironl"
    },
    {
        "id": 22,
        "bundle_id": 13,
        "book_name": "Mifflin County Airport",
        "book_id": 905975648,
        "is_Premium": false,
        "bundle_Name": "bgariff3"
    },
    {
        "id": 23,
        "bundle_id": 20,
        "book_name": "Diomício Freitas Airport",
        "book_id": 827294785,
        "is_Premium": true,
        "bundle_Name": "rvickerstaffb"
    },
    {
        "id": 24,
        "bundle_id": 1,
        "book_name": "Samana El Portillo Airport",
        "book_id": 609631262,
        "is_Premium": false,
        "bundle_Name": "ramorta"
    },
    {
        "id": 25,
        "bundle_id": 16,
        "book_name": "Enid Woodring Regional Airport",
        "book_id": 274702723,
        "is_Premium": false,
        "bundle_Name": "cmeir1"
    },
]

function modifyData(arr) {
    let ansobj = {};
    for (let item of arr) {
        if (ansobj[item.bundle_id] == undefined) {
            ansobj[item.bundle_id] = [];
        }
        let newObj = {};
        newObj.book_name = item.book_name;
        newObj.book_id = item.book_id;
        newObj.is_Premium = item.is_Premium;
        newObj.bundle_Name = item.bundle_Name;
        ansobj[item.bundle_id].push(newObj);
    }
    return ansobj
}

// console.log(modifyData(books));


function modifyToAnswer(obj) {
    let ans = [];
    // console.log(obj);
    for (let key of Object.keys(obj)) {
        console.log(key)
        let newObj = {};
        newObj.bundle_id = key;
        newObj.bundle_Name = obj[key][0].bundle_Name
        newObj.booksInBundle = obj[key];
        ans.push(newObj);
    }
    return ans;
}
// console.log(modifyToAnswer(modifyData(books)));


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

console.log(modifyAndTransform(books));
